prebuilt in prod => pages

in dev mode every page is build on demand so first time we visit it it takes more tame than the consecutive attempts

we can listen to events in nextJs router component and react based on those to produce some cool effects like loading progress

if we refresh, we can see for half a second the code from the server side in its ugly html form without the styles. At some point client jumps in and we see everything correct.

We have this among other thigns, because we are using styled components which is purely client side and done on the fly so we need a way to deal with this.

How to fix this???

In pages, we need to create a file called _document.js.

Here we are going to crawl through all our files to collect all the styles and compose them in the server side to match in the initial server side rendered page the styles from client side. _document.js is the file we need to use for that