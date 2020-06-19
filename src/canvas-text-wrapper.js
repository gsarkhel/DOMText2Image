class CanvasTextWrapper {
  constructor() {
    this.element = document.createElement('div');
    this.cnv = document.createElement('canvas');
    this.ctx = this.cnv.getContext('2d');
    this.scale = window.devicePixelRatio;
    this.cnv.width = window.outerWidth * this.scale;
    this.cnv.height = window.outerHeight * this.scale;
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

    this.extractedProperties = [];
    this.extractNodeProperties(this.element, this.extractedProperties);
    this.modifyExtractedProperties();
    this.prepareCanvas();
  }

  extractNodeProperties(node, arr) {
    const nodes = node.childNodes;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeType === Node.TEXT_NODE) {
        const comp = window.getComputedStyle(node);
        arr.push({
          fontFamily: comp.getPropertyValue('font-family'),
          fontSize: comp.getPropertyValue('font-size'),
          fontWeight: comp.getPropertyValue('font-weight'),
          fontStyle: comp.getPropertyValue('font-style'),
          color: comp.getPropertyValue('color'),
          text: nodes[i].textContent
        });
      } else {
        this.extractNodeProperties(nodes[i], arr);
      }
    }
  }

  modifyExtractedProperties() {
    var newString = '';
    this.extractedProperties.forEach((item, i) => {
      const modSpan = `<span style="align:${item.align}; font-family:${item.fontFamily}; font-size:${item.fontSize}; font-weight:${item.fontWeight}; font-style:${item.fontStyle}; color:${item.color};">`;
      const itemText = item.text.split(' ').join(`</span> ${modSpan}`);
      item.text = `${modSpan}${item.text}</span>`;
      newString = `${newString}${modSpan}${itemText}</span>`;
    });
    this.element.innerHTML = newString;
  }

  prepareCanvas() {
    // document.body.appendChild(this.cnv);
    // this.cnv.style.width = `${window.outerWidth}px`;
    // this.cnv.style.height = `${window.outerHeight}px`;

    this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
    this.ctx.save();
    this.ctx.scale(this.scale, this.scale);

    const spans = this.element.getElementsByTagName('span');
    for (var i = 0; i < spans.length; i++) {
      var comp = window.getComputedStyle(spans[i]);
      const size = parseFloat(comp.fontSize);
      this.ctx.fillStyle = comp.color;
      this.ctx.font = `${comp.fontStyle} ${comp.fontWeight} ${comp.fontSize} ${comp.fontFamily}`;
      this.ctx.textBaseline = 'bottom';
      this.ctx.fillText(spans[i].textContent, spans[i].offsetLeft, spans[i].offsetTop + size);
    }
    this.ctx.restore();
  }
}
