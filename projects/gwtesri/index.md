# gwt-esri

[gwt-esri](https://github.com/CSTARS/gwt-esri) is a [GWT](http://www.gwtproject.org/)
[JSNI](http://www.gwtproject.org/doc/latest/DevGuideCodingBasicsJSNI.html) wrapper
around the [ESRI JS API](https://developers.arcgis.com/javascript/).  It allows
you to fully integrate with the ESRI JS library in GWT.  This can be very useful
when building complex online GIS applications as you can use JAVA to build the app.

Not to dive into a language argument, but there is something to be
said about strongly typed, OO languages like JAVA over JavaScript.  I think the
real interesting aspect is how GWT, a compile to JS language, sort of went out
of style for a bit.  But now seems to be having a huge come back.  Between ES6/ES2015+
transpilers, Grunt/Gulp concat-minify-uglify or strait compile to languages like
CoffeeScript, TypeScript and JSX the world seems to have slowly swung back into favor
of compile to JS.

I'm still waiting to see if GWT 3.0 ever makes it out the door.  Supposedly
[Google Inbox](http://inbox.google.com) uses GWT as well as other in house Google
products. Guess time will tell.

For now, if you are looking for some GIS goodness in your GWT webapp.  Look no further.
ESRI's ArcGIS REST interface isn't half bad (if you can ever get the service
 setup and running properly).  And their JS API adds a decent layer over the top
 of these services as long as you throw their 'UI widgets' out the door.

[Source](https://github.com/CSTARS/gwt-esri)
