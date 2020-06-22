class DOMText2Image {
  constructor() {
    this.element = document.createElement('div');
    this.cnv = document.createElement('canvas');
    this.ctx = this.cnv.getContext('2d');
    this.scale = window.devicePixelRatio;
  }

  convertText(elem) {
    const style = window.getComputedStyle(elem);
    document.body.appendChild(this.element);
    this.element.innerHTML = elem.innerHTML;
    this.element.style.position = 'fixed';
    this.element.style.left = '0px';
    this.element.style.top = '0px';
    this.element.style.width = style.width;
    this.element.style.fontFamily = style.fontFamily;
    this.element.style.fontSize = style.fontSize;
    this.element.style.textAlign = style.textAlign;
    this.element.style.visibility = 'hidden';
    this.element.setAttribute('DomText2ImageDiv', 'true');

    this.extractedProperties = [];
    this.extractNodeProperties(this.element, this.extractedProperties);
    this.modifyExtractedProperties();
    const obj = this.prepareCanvas();
    // document.body.removeChild(this.element);
    return obj;
  }

  extractNodeProperties(node, arr) {
    const nodes = node.childNodes;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeType === Node.TEXT_NODE) {
        const comp = window.getComputedStyle(node);
        arr.push({
          nodeName: (node.getAttribute('DomText2ImageDiv') === 'true' ? 'SPAN' : node.nodeName),
          fontFamily: comp.getPropertyValue('font-family'),
          fontSize: comp.getPropertyValue('font-size'),
          fontWeight: comp.getPropertyValue('font-weight'),
          fontStyle: comp.getPropertyValue('font-style'),
          color: comp.getPropertyValue('color'),
          text: nodes[i].textContent
        });
      } else if (nodes[i].nodeName === 'BR') {
        arr.push({
          nodeName: nodes[i].nodeName,
          text: '<br/>'
        });
      } else {
        this.extractNodeProperties(nodes[i], arr);
      }
    }
  }

  modifyExtractedProperties() {
    var newString = '';
    this.extractedProperties.forEach((item, i) => {
      if (item.nodeName !== 'BR') {
        const modStartSpan = `<${item.nodeName} style="font-family:${item.fontFamily}; font-size:${item.fontSize}; font-weight:${item.fontWeight}; font-style:${item.fontStyle}; color:${item.color};">`;
        const modEndSpan = `</${item.nodeName}>`;

        const itemText = item.text.split(' ').join(`${modEndSpan} ${modStartSpan}`);
        item.text = `${modStartSpan}${itemText}${modEndSpan}`;
      }
      newString = `${newString}${item.text}`;
    });
    this.element.innerHTML = newString;
  }

  prepareCanvas() {
    // document.body.appendChild(this.cnv);
    // this.cnv.style.width = `${window.outerWidth}px`;
    // this.cnv.style.height = `${window.outerHeight}px`;
    const width = this.element.offsetWidth;
    const height = this.element.offsetHeight;

    this.cnv.width = width * this.scale;
    this.cnv.height = height * this.scale;

    this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
    this.ctx.save();
    this.ctx.scale(this.scale, this.scale);

    const spans = this.element.children;
    for (var i = 0; i < spans.length; i++) {
      if (spans[i].nodeName !== 'BR') {
        var comp = window.getComputedStyle(spans[i]);
        const size = parseFloat(comp.fontSize);
        this.ctx.fillStyle = comp.color;
        this.ctx.font = `${comp.fontStyle} ${comp.fontWeight} ${comp.fontSize} ${comp.fontFamily}`;
        this.ctx.textBaseline = 'bottom';
        this.ctx.fillText(spans[i].textContent, spans[i].offsetLeft, spans[i].offsetTop + spans[i].offsetHeight);
      }
    }
    this.ctx.restore();

    return { img: this.cnv.toDataURL(), width, height };
  }
}
