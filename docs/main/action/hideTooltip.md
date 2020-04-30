# `hideTooltip` - tooltiplery hideTooltip Action

Hide a tooltip.

## Usage

```javascript
tooltiplery.action.hideTooltip({
    type: "id",
    id: "tooltiplery1",
    // or: 
    type: "HTMLElement",
    element: myTooltip,
})
```

### Returns

This function returns nothing.

### Parameters

#### `type`

The parameters type, `"id"` or `"HTMLElement"`

##### If the type is `"id"`:

###### `id`

This is the tooltip's id.

##### If the type is `"HTMLElement"`:

###### `HTMLElement`

HTML element, the tooltip.
