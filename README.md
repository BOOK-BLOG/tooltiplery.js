# Tooltipibility

Simply create your tooltip quickly.

## Get Started - Create your First Tooltip

### Before Getting Started

You need to know how to create a web site and use JavaScript. Then you can **download tooltiplery.js and tooltiplery.css** from this repository.

### First Step - Include Scripts and Styles

Add these lines to your HTML file

```html
<link rel="stylesheet" type="text/css" href="tooltiplery.css" />
<script src="tooltiplery.js"></script>
```

### Second Step - Create a Button

```html
<button id="demo">Hover on me to popup the tooltip</button>
```

or create it by JavaScript

```javascript
var demo = document.createElement("button");
demo.setAttribute("id", "demo");
demo.innerHTML = "Hover on me to popup the tooltip";
var body = document.getElementsByTagName("body")[0];
body.appendChild(demo);
```

### Third Step - Initialize tooltiplery.js

```javascript
window.onload = function () { // when the window is loaded,
  tooltiplery.init(); // then initialize tooltiplery.js
};
```

### Fourth Step - Create a `element.tooltip`

```javascript
var myTooltip = tooltiplery.element.tooltip({
  // create a tooltip()
  child: tooltiplery.element.imageCapView({
    // its child is an imageCapView()
    header: tooltiplery.element.img({
      // imageCapView() 's header element - img()
      url:
        "https://www.bing.com/th?id=OHR.BluebellWood_ZH-CN8128422960_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=HpEdgeAn", // where is the image - url
      fit: "cover", // CSS object-fit property - https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
      height: "256px", // the height of the image
    }),
    content: tooltiplery.element.paragraphBlock({
      // imageCapView() 's header element - paragraphBlock()
      children: [
        // put muiltiple paragraph elements in the array
        tooltiplery.element.textHeader[1]({
          // the title element, the same as <h1> element.
          text: "Demo Text",
        }),
        tooltiplery.element.paragraph({
          // the paragraph element, the same as <p> element.
          text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        }),
      ],
    }),
  }),
});
```

### Fifth Step - Create a `controller.tooltipController`

```javascript
tooltiplery.controller.tooltipController({
    type: "hover", // the tooltip wiil popup when you hover on your button.
    tooltip: myTooltip, // this is the tooltip element.
    element: demo, // if you created the button by JavaScript, you can still use this variable.
    // or (if you use HTML to create the button):
    element: document.getElementById("demo"); // use document.getElementById() to get your HTML element by its ID attribute.
})
```

### Sixth Step - Done

Now open your HTML file with your browser, and hover on the button, the tooltip will popup under the button.

## The Documentation

If your code editor supports displaying JSDoc, you wiil see JSDoc in real time, or you can browse the source code.

Also, the code editors supports JSDoc:
- JetBrains WebStorm
- Microsoft Visual Studio Code
- Sublime Text (with extension)
- GitHub Atom (with extension)
