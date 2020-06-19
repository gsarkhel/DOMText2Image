/* eslint-disable */
const wrapObj = new DOMText2Image();
const img = new Image();
window.onclick = function () {
  var converted = wrapObj.convertText(document.getElementsByClassName('sample')[0]);
  img.src=converted.img;
  img.width = converted.width;
  img.height = converted.height;
  document.body.appendChild(img);
};
