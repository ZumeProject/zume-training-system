# Form Design Preferences

## Brand Colors

- **brand**: #008CC7 (Main brand color)
- **brand-light**: #2CACE2
- **brand-lighter**: #8ACDEA
- **brand-fade**: #E5F3F9

## Grayscale Colors

- **white**: #FFFFFF
- **gray-100**: #F8F9FA
- **gray-200**: #E9ECEF
- **gray-300**: #DEE2E6
- **gray-500**: #ADB5BD
- **gray-700**: #495057
- **gray-900**: #212529
- **black**: #000000

## Functional Colors

- **error-main**: #FF3F3F
- **success**: #198754
- **disabled**: #6C757D

## Inputs

- Border radius: Half of the base border radius variable
- Border: 2px solid gray-500
- Focus state maintains same border style
- Autofill styling: gray-100 background, black text
- Margin: 0

## Form Labels and Text

- Labels have line-height of 1 (no additional spacing)
- Subtext uses gray-700 color and smaller font size
- Error text uses error-main color and smaller font size
- Error states have opacity transitions (0 when empty, 1 when visible)

## Form Groups

- Child elements spaced with spacing(-4) variable
- Form errors have 0.5rem vertical margins

## Checkboxes and Radio Buttons

- Custom styling with -webkit-appearance: none
- Size: 1.15em square
- Border: 0.1em solid currentColor
- Border radius: 0.15em for checkboxes, 50% for radio buttons
- Focus state: black outline with offset
- Checked state uses transform scale transitions
- Checkboxes show custom icon from 'Zume-Icons-Square' font family
- Radio buttons show filled circle in brand-light color
- Disabled state uses gray-700 color

## Form Controls

- Line height: 1.1
- Uses grid layout: 1em for control, auto for label
- Gap between control and label: 0.5em
- Labels have 1em font size

## Button Design Preferences

### Standard Buttons

- Border radius: 100px (pill shape)
- Padding: 0.25em 3em
- Text: Uppercase, font-weight 600
- Border: 2px solid (transparent by default)
- Transitions: 150ms linear for all properties
- Text alignment: Center
- CSS Variable system for colors to enable variants

### Button Variants

- Color schemes: brand, light, green, red, dark
- Styles: outline, no-outline
- States: selected, disabled
- Sizes: small, large, tight

### Menu Buttons

- Border radius: Uses --border-radius variable
- Text: Normal case, font-weight 500, left-aligned
- Includes icon with 1.3em size
- Selected state uses brand-fade background
- RTL (right-to-left) support for icon positioning

### Card Buttons

- Flex layout with centered content
- Box shadow: medium shadow variable
- Border radius: Uses --border-radius variable
- Hover state changes background to brand-light with white text

### Icon Buttons

- Circular design with clean borders
- Padding: Uses spacing(-2) variable
- Transition: 100ms linear for border color
- Hover state adds brand-light border

### Other Button Types

- icon-btn-group: Button group with shared border
- close-btn: Circular close button with hover effects
- exit-btn: Button with spacing for icon and text

## Shape Design Preferences

### Border Radius

- Standard rounded corners: Uses --border-radius variable
- Directional variants: rounded-top, rounded-bottom, rounded-start, rounded-end
- Circle: border-radius 100%
- RTL (right-to-left) support for directional corners

### Special Shapes

- Circular endings: circle-end, circle-end-small (responsive)
- Clip paths: clip-rounded-end, clip-rounded-bottom-right, clip-rounded-top-left
- Aspect ratio: aspect-1 (1:1 ratio)

### Borders and Shadows

- Border between elements: 2px solid gray-100
- Border widths: 1px standard, 7px for emphasized circles
- Shadow variants: hard-shadow, shadow
- Border colors: Can be customized with data attributes

### RTL Support

- Direction-aware border radius
- Flip-on-rtl utility for mirroring elements
- Special media queries for responsive border radius

## Size Design Preferences

### Width Classes

- Percentage-based widths: w-10 through w-100 (10%, 15%, 20%, 25%, 30%, 40%, 50%, 60%, 70%, 75%, 80%, 90%, 100%)
- Fixed rem widths: w-1rem through w-16rem
- Max width constraints: mw-20, mw-60, mw-100, mw-50ch, mw-20vw, mw-30vw, mw-20rem
- Min width constraints: min-4rem, min-8rem, min-12rem
- Special: fit-content

### Height Classes

- Spacing-based heights: h-(-5) through h-(5)
- Percentage-based: h-100, h-125
- Fixed rem heights: h-1rem through h-16rem
- Viewport-based: min-vh-90

## Color and Variable System

### Color Variables

- Base colors defined in root-variables.scss with --z- prefix
- Brand colors: brand, brand-light, brand-lighter, brand-fade, brand-dark
- Grayscale: gray-50 through gray-900
- Functional colors: success, warning-main, error-main
- Special effects: brand-gradient, shadow

### Spacing System

- Fluid spacing with fallbacks: --s-5 through --s7
- Uses clamp() for responsive behavior

### Typography

- Fluid type scale: --t-2 through --t8
- Font families: --font-title, --font-family, --font-cursive
- Default fonts: 'Bebas Kai', 'Poppins', 'Indie Flower'

### Icons

- SVG icons use white fill/stroke by default
- Hover state changes to brand-lighter
- Custom icon font for form controls
