# `paragraphBlock` - tooltiplery paragraphBlock Element

Create an HTML div element that contains text.

## Usage

```javascript
tooltiplery.element.paragraphBlock({
    children: [
        [HTMLElement],
        // or: 
        tooltiplery.element.textHeading[1]({
            text: "Heading 1",
        }),
        tooltiplery.element.paragraph({
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        }),
        ...
    ], // Muitiple children in an array.
    padding: "16px", // A string, CSS padding property.
})
```

## Returns

This function returns an HTML div element.

### Parameters

#### `children`

An array that contains many paragraph elements.

#### `padding`

The same as CSS padding property. [https://developer.mozilla.org/en-US/docs/Web/CSS/padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)
