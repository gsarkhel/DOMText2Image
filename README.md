# DOM Text to Image
Renders the DOM (HTML) text on canvas and returns as an image. Only SPANs are supported in this version.

## Usage

HTML Sample
```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <style>
    .sample {
      width: 300px;
      font-family: arial;
      font-size: 16px;
      text-align: left;
    }
    </style>
  </head>
  <body>
    <div class="sample">Just for everyone to know, this <span style="color:#ff0000;">application</span> also runs on Android<sub>3</sub> and iOS<sup>2</sup> devices as a native <span style="font-family: verdana;">app and has lots of functionalities</span> into checking the user <b>credentials</b> etc.<br/><span style="color:#0000ff;">Also, it has <span style="font-weight:bold;">offline</span> and <span style="font-style:italic;">online</span> mode.</span> Will provide you details on that when we restart the project. &#206; m∠<span style="font-style:italic;">a</span></div>
    <p><hr/></p>
  </body>
  <script src="../build/DOMText2Image-min.js" charset="utf-8"></script>
  <script src="index.js" charset="utf-8"></script>
</html>
```
Javascript Sample
```javascript
const wrapObj = new DOMText2Image();
const img = new Image();
window.onclick = function () {
  const converted = wrapObj.convertText(document.getElementsByClassName('sample')[0]);
  img.src=converted.img;
  img.width = converted.width;
  img.height = converted.height;
  document.body.appendChild(img);
};
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
