# MiniBOB UI

Usage
```
import { LoadMiniBobUI, button, label, link } from 'minibobui';
LoadMiniBobUI(button, label, link);
```

## button

```html
<minibob-button>Standard</minibob-button>

<minibob-button type="Primary">Primary</minibob-button>

<minibob-button type="Warning">Warning</minibob-button>

<minibob-button radius="None">None Radius</minibob-button>
```

Button dino game
```html
<minibob-button type="dino">Dino</minibob-button>
```

## label

```html
<minibob-label>I'm a Label</minibob-label>

<minibob-label disabled="true">I'm a disabled Label</minibob-label>

<minibob-label required="true">I'm a required Label</minibob-label>
```

## link

```html
<minibob-link url="https://github.com">I'm a Link</minibob-link>

<minibob-link url="https://github.com" disabled="true">I'm a disabled Link</minibob-link>
```