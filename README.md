wd-sticky-headers
==============

An AngularJS directive for making headers scroll with the screen.

[Demo Page](http://rawgit.com/kellytruter/wd-sticky-header/master/demo/index.html)

How to use it
-------------

Just include jQuery, Angular, and the sticky-headers JavaScript file in your page. You can also install it
using `npm`:

```
npm install wd-sticky-header
```

```html
  <head>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.6/angular.min.js"></script>
	<script src="https://rawgithub.com/kellytruter/wd-sticky-headers/master/src/fsm-sticky-header.js"></script>
  </head>
```

Then include the `wd-sticky-headers` Angular module in your own module:

```js
angular.module('MyModule', ['wd-sticky-headers']);
```

Then add the directive to the element that you with to stick to the top of the page

```html
  <table ng-app="MyModule" id="theScrollBody">
    <thead>
      <tr wd-sticky-header wd-scroll-body="#theScrollBody" scroll-stop='50' wd-is-fixed="true">
         <th>Column One Header</th>
         <th>Column Two Header</th>
      </tr>
    </thead>
    <tbody>
      <tr>
         <td>table1 data1</td>
         <td>table1 data1</td>
      </tr>
      <tr>
         <td>table1 data2</td>
         <td>table1 data2</td>
      </tr>
      ...
    </tbody>
  </table>
```

Options
--------

* scroll-body
   * this is the JQuery selector of the element that your header is bound to.  Sticky header will follow the position of that element and keep the header on top of that element as it scrolls off the page.
* scroll-stop
   * this is how many pixels from the top of the page your elment will stop scrolling at, just in case you have a header on the top of your page.
* scrollable-container
   * If you have a scrollable element such as a div, rather than the web page body scrolling, you'll need to specify that element id here.

Browser Support
--------

We support the current versions of Chrome, Firefox, Safari, Microsoft Edge and Internet Explorer 10+.
