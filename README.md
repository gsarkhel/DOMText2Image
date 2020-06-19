# Canvas Text to image
Renders the DOM text on canvas and returns the "toDataURL()" response.

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
    <div class="sample">Just for everyone to know, this <span style="color:#ff0000;">application</span> also runs on Android and iOS devices as a native <span style="font-family: verdana;">app and has lots of functionalities</span> into checking the user <b>credentials</b> etc. <span style="color:#0000ff;">Also, it has <span style="font-weight:bold;">offline</span> and <span style="font-style:italic;">online</span> mode.</span> Will provide you details on that when we restart the project. &#206; m∠<span style="font-style:italic;">a</span></div>
  </body>
  <script src="../build/canvas-text-wrapper-min.js" charset="utf-8"></script>
  <script src="index.js" charset="utf-8"></script>
</html>
```
Javascript Sample
```javascript
const wrapObj = new CanvasTextWrapper();
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
