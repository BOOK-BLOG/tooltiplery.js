# `tooltipController` - tooltiplery tooltipController Controller

Control any tooltip by using this controller.

## Usage

```javascript
tooltiplery.controller.tooltipController({
    type: "hover", // A string, the way you call the tooltip out.
    element: document.getElementById("myButton"), // HTML elemant, the tooltip will popup when you hover on or click this element.
    tooltip: tooltiplery.element.tooltip({...}), // tooltiplery tooltip or your own HTML element.
})
```

## Returns

This function returns an string, the tooltip element's id.

### Parameters

#### `type`

The way you call the tooltip out.

#### `element`

The tooltip will popup when you hover on or click this element.

#### `tooltip`

tooltiplery tooltip or your own HTML element.
