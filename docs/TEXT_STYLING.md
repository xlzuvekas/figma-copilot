# Text Styling Guide

## Purpose

Apply rich formatting to specific ranges of text and extract style information for advanced automation.

## Recommended Tools

- `set_text_style_range` and `get_text_style_range` for basic styles like bold or italic
- `set_text_decoration_range` and `get_text_decoration_range` for underline or strikethrough
- `set_range_font` and `set_range_font_size` to change fonts and sizes
- `set_range_fills` to apply colors
- `get_styled_text_segments` for a detailed breakdown of styled segments
- `set_component_description` and `get_component_description` for markdown-based descriptions
- `normalize_markdown` to convert common Markdown to Figma's subset

## Examples

- Change the font of a word while leaving the rest untouched using `set_range_font`
- Retrieve styling of a paragraph via `get_styled_text_segments` to replicate it elsewhere
