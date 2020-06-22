"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DOMText2Image = /*#__PURE__*/function () {
  function DOMText2Image() {
    _classCallCheck(this, DOMText2Image);

    this.element = document.createElement('div');
    this.cnv = document.createElement('canvas');
    this.ctx = this.cnv.getContext('2d');
    this.scale = window.devicePixelRatio;
  }

  _createClass(DOMText2Image, [{
    key: "convertText",
    value: function convertText(elem) {
      var style = window.getComputedStyle(elem);
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
      var obj = this.prepareCanvas(); // document.body.removeChild(this.element);

      return obj;
    }
  }, {
    key: "extractNodeProperties",
    value: function extractNodeProperties(node, arr) {
      var nodes = node.childNodes;

      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType === Node.TEXT_NODE) {
          var comp = window.getComputedStyle(node);
          arr.push({
            nodeName: node.getAttribute('DomText2ImageDiv') === 'true' ? 'SPAN' : node.nodeName,
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
  }, {
    key: "modifyExtractedProperties",
    value: function modifyExtractedProperties() {
      var newString = '';
      this.extractedProperties.forEach(function (item, i) {
        if (item.nodeName !== 'BR') {
          var modStartSpan = "<".concat(item.nodeName, " style=\"font-family:").concat(item.fontFamily, "; font-size:").concat(item.fontSize, "; font-weight:").concat(item.fontWeight, "; font-style:").concat(item.fontStyle, "; color:").concat(item.color, ";\">");
          var modEndSpan = "</".concat(item.nodeName, ">");
          var itemText = item.text.split(' ').join("".concat(modEndSpan, " ").concat(modStartSpan));
          item.text = "".concat(modStartSpan).concat(itemText).concat(modEndSpan);
        }

        newString = "".concat(newString).concat(item.text);
      });
      this.element.innerHTML = newString;
    }
  }, {
    key: "prepareCanvas",
    value: function prepareCanvas() {
      // document.body.appendChild(this.cnv);
      // this.cnv.style.width = `${window.outerWidth}px`;
      // this.cnv.style.height = `${window.outerHeight}px`;
      var width = this.element.offsetWidth;
      var height = this.element.offsetHeight;
      this.cnv.width = width * this.scale;
      this.cnv.height = height * this.scale;
      this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
      this.ctx.save();
      this.ctx.scale(this.scale, this.scale);
      var spans = this.element.children;

      for (var i = 0; i < spans.length; i++) {
        if (spans[i].nodeName !== 'BR') {
          var comp = window.getComputedStyle(spans[i]);
          var size = parseFloat(comp.fontSize);
          this.ctx.fillStyle = comp.color;
          this.ctx.font = "".concat(comp.fontStyle, " ").concat(comp.fontWeight, " ").concat(comp.fontSize, " ").concat(comp.fontFamily);
          this.ctx.textBaseline = 'bottom';
          this.ctx.fillText(spans[i].textContent, spans[i].offsetLeft, spans[i].offsetTop + spans[i].offsetHeight);
        }
      }

      this.ctx.restore();
      return {
        img: this.cnv.toDataURL(),
        width: width,
        height: height
      };
    }
  }]);

  return DOMText2Image;
}();