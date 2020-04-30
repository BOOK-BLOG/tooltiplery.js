# `tooltip` - tooltiplery Tooltip Element

Tooltip element is main element in tooltiplery. Put all the content in it, but it can only include one element, so you need to use the views to include muitiple element, such as imageCapView, HTMLView...

## Usage

```javascript
tooltiplery.element.tooltip({
    child: imageCapView({...}), // tooltiplery elements or any HTML element.
    position: "fixed", // A string, CSS position property.
    left: "32px", // A string, CSS left property.
    top: "32px", // A string, CSS top property.
})
```

### Returns

This function will return an HTML div element, give it to [`tooltiplery.controller.tooltipController`](/main/controller/tooltipController) or [`tooltiplery.action.showTooltip`](/main/action/showTooltip)

### Parameters

#### `child`

Put the element that you want to include to this.

#### `position`

The same as CSS position property. [https://developer.mozilla.org/en-US/docs/Web/CSS/position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)

#### `left`

The same as CSS left property. [https://developer.mozilla.org/en-US/docs/Web/CSS/left](https://developer.mozilla.org/en-US/docs/Web/CSS/left)

#### `top`

The same as CSS top property. [https://developer.mozilla.org/en-US/docs/Web/CSS/top](https://developer.mozilla.org/en-US/docs/Web/CSS/top)
