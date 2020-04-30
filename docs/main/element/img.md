# `img` - HTML Image Element

Create a default HTML image element.

## Usage

```javascript
tooltiplery.element.img({
    url: [imageUrl], // A string, the url of the image.
    fit: "cover", // A string, CSS object-fit property.
    width: "75%", // A string, default is "100%", CSS width property.
    height: "128px", // A string, CSS height property
    borderRadius: "16px 16px 0 0", // A string, CSS border-radius property.
})
```

## Returns

This function returns an HTML image element, give it to [`tooltiplery.element.imageCapView`](/main/element/imageCapView)

### Parameters

#### `url`

The URL to the image.

#### `fit`

The same as CSS object-fit property. [https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)

#### `width`

The same as CSS width property. [https://developer.mozilla.org/en-US/docs/Web/CSS/width](https://developer.mozilla.org/en-US/docs/Web/CSS/width)

#### `height`

The same as CSS height property. [https://developer.mozilla.org/en-US/docs/Web/CSS/height](https://developer.mozilla.org/en-US/docs/Web/CSS/height)

#### `borderRadius`

The same as CSS borderRadius property. [https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius)
