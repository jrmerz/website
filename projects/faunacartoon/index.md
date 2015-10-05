# Fauna Cartoon

Fauna Cartoon [faunacartoon.com](https://faunacartoon.com) is a series of comics about
animals and nature created by Greg Bishop.  The site takes advantage have several
'cutting edge' HTML 5+/Rolling Spec features including

- [Web Components](http://webcomponents.org/)
- [Service Workers](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
- [Webapp Manifest](https://developers.google.com/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android?hl=en)

## Web Components via Polymer

This site is primarily built with [Polymer](https://www.polymer-project.org) and created almost entirely of
webcomponents.  I personally use webcomponents as custom elements with additional
sugaring from Polymer.  By this I mean I use the elements to break the application
into logical chunks.  Some of these chunks can be thought of as encapsulated
components but I dislike the loss of salt to taste CSS libraries like Bootstrap,
Animate CSS and Font Awesome which comes when you include Shadow DOM.  There are
workarounds to global CSS and Shadow DOM, but none that I find satisfactory at this time.

## Service Workers via UpUp

While still in the early stages, I thought it would be fun to play around with
service workers to create a simple offline splash screen for the app.  [UpUp](https://www.talater.com/upup/)
provides a nice layer on top of service workers and allows browsers that support
them (Chrome) to have a customized offline screen.

## Webapp Manifest

This is used by Safari on iOS and Chrome on Android to allow to [describe](http://www.w3.org/TR/appmanifest/)
your application and allow for the 'Add to Home Screen' button to show.  This,
combined with HTTPS and a Service Work will have Chrome prompt to install the
webapp in the latest versions for chrome for android.

# Other Shootouts
 - [Google Fonts](https://www.google.com/fonts)
 - [Animate CSS](https://daneden.github.io/animate.css/)

[Source](https://github.com/jrmerz/fauna)
