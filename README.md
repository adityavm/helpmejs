## What This Is

This is a framework/jQuery plug-in to help designers/developers add visual hints/help which explains elements on a page. It does this by reading from a help file, placing a (?) right next to each element you want to show help for, then showing a tooltip when the user hovers over that tag.

[Example](http://cl.ly/3h3q0u3e1p0Y0H3j3e3Y)

The help file is a JSON file in the following form:

	{
		"selector_for_element_to_show_help_for": "Actual help text. This is what is shown when a user hovers over the (?) tag for this element.",
		"all_selectors_supported_by_jQuery_work": "And elements that aren't found or aren't visible are ignored."
	}

The help layer can be easily turned on or off when needed.

## API

The following methods are used as: `$.helpme.xx()`

**init(url)**: Initialises a new mask or loads the previous one if its been called before. `url` is the path to the help file to load from.

**hide()**: Hide the help layer.
