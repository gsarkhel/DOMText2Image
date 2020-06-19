# canvas-text-wrapper
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
const canvasTextWrapper = new CanvasTextWrapper();
var converted = wrapObj.convertText(document.getElementsByClassName('sample')[0]);
```
