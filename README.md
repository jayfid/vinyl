# Vinyl (siding)
Vinyl is a simple css framework meant to be used as an online product foundation.  Inspired by Bootstrap and other front-end frameworks, Vinyl aims to bridge the gap between open source UX and custom component-ization of websites.

## Version
This is currently alpha, which features being added daily.

## License
Open Source license TBD.

## Table of Contents
tbd

## Ideology
As network transfer times go down and browser abilities improve, the web offers a much more viable landscape for application building.  The goal of Vinyl is to create a core foundation where discrete application components can be built and maintained modularly while still providing a consistent UX.

## Installation
- Download Vinyl core.
- `cd` to the directory and `npm install`.
- Start adding components!
- Preprocess *everything* with grunt.

## Tooling
Vinyl uses [Gulp](http://gulpjs.com/) for common tasks.  Current tasks include:
- TBD

## Core CSS
Vinyl supplies modern, consistent, and useful UI elements.  All CSS is designed to be responsive, implementing Mobile First design ideas.
- Forms
- Tables
- Typography
- Grid
- Colors
- Media

## Core JS
Vinyl supplies basic js functionality that can be activated via HTML.  In order to be truly extensible, are components are written in plain old javascript and can be ignored or easy implemented in existing JS frameworks.
- Close Button
- target=_blank functionality without adding the target attribute
- Carousel
- Dynamic Image Loading

## Core AJAX
Using a simple JSON response syntax, Vinyl will perform basic content manipulations.  Like other JS aspects, this can be omitted in favor of more advanced frameworks.

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
