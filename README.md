# Vinyl Siding
Vinyl Siding is a patchwork collection of css classes.  Rather than create global
opinions on element styling, vinyl Siding offers an opinionated set of skeletal
structures that can be used to quickly create web components.  Component styling
is saved as styles that can be reused.

## Version
This is currently alpha, with features being added daily and refactoring occurring constantly.

## License
Open Source license TBD.

## Table of Contents
tbd

## Installation
tbd

## Tooling
Vinyl Siding uses [Gulp](http://gulpjs.com/) for common tasks.  Current tasks include:
- tbd

## Core CSS
Vinyl Siding supplies modern, consistent, and useful UI elements.  All CSS is designed to be responsive, implementing building components mobile-first.
- Forms
- Tables
- Typography
- Grid
- Colors
- Media

## Core JS
Vinyl Siding supplies basic js functionality that can be activated via HTML.  In order to be truly extensible, are components are written in plain old javascript and can be ignored or easy implemented in existing JS frameworks.
- Close Button
- target=_blank functionality without adding the target attribute
- Carousel
- Dynamic Image Loading

## Core AJAX
Using a simple JSON response syntax, Vinyl Siding will perform basic content manipulations.  Like other JS aspects, this can be omitted in favor of more advanced frameworks.

```javascript
"meta": {
	"status": string, // status code.
	"values": { object // List of meta data matching data.
		{elem1}: {
			"selector": string, // CSS selector of container element.
			"action": string, // append | prepend | replace
			"template": string // template name, if applicable.
		}
	}
"data": {
	{elem1}: string // html or json response.
}
```

##Core Widgets
- Messages
- Modals
- Search
- Toggle
- Tooltip
- Pager
- Tags
- Slide-in Panel (Left, Right, Top, Bottom)
- Dropdown Button
