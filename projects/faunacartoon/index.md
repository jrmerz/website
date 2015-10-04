# Fauna Cartoon

Fauna Cartoon [faunacartoon.com](https://faunacartoon.com) is a series of comics about
animals and nature created by Greg Bishop.  The site takes advantage have several
'cutting edge' HTML 5+/Rolling Spec features including

- Web Components
- Service Workers
- Webapp Manifest

## Web Components via Polymer

This site is primarily built with [Polymer]() and created almost entirely of
webcomponents.  I personally use webcomponents as custom elements with additional
sugering from Polymer.  By this I mean I use the elements to break the application
into logical chunks.  Some of these chunks can be thought of as encapsulated
components but I dislike the loss* of salt to taste CSS libraries like Bootstrap,
Animate CSS and Font Awesome which comes when you include Shadow DOM.  *There are
workarounds to global CSS and Shadow DOM, but none that I find satisfactory at this time.*

## Service Workers via UpUp

While still in the early stages, I thought it would be fun to play around with
service workers to create a simple offline splash screen for the app.  [UpUp]()
provides a nice layer on top of service workers and allows browsers that support
them (Chrome) to have a customized offline screen.

## Webapp Manifest


# Other Shootouts
 - Google Fonts
 - Animate CSS
