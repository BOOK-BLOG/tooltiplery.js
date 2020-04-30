# `imageCapView` - tooltiplery imageCapView Element

You can use it to create a view like this:

![imageCapView-ScreenShot](/_media/imageCapView-001.png)

## Usage

```javascript
tooltiplery.element.imageCapView({
    header: [HTMLElement],
    content: [HTMLElement],
    footer: [HTMLElement]
})
```

## Returns

This function returns an HTML div element, give it to [`tooltiplery.element.tooltip`](/main/element/tooltip)

### Parameters

#### `header`

The image cap element, an HTML element.

#### `content`

The main content of the view, also an HTML element.

#### `footer`

The footer of the view, still an HTML element.
