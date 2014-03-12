Backbone.Collection.sorting
===========================
A simple sorting plugin solution for Backbone collections with configurable sort direction and types including numeric, alphabet, dates, and boolean values.

This plugin defines the "comparator" with a method that supports various sorting order types and direction. The sort types include:

1. Numeric
2. Alphabetical
3. Dates (parsed from string)
4. Boolean

You may set the direction in regular ascending order or reversed order (descending).

## How to use
```
collection.sorting = {
  by: (attribute or "id"),
  type: ("numeric", "alpha", "date", or "boolean"),
  direction: ("ascending" or "descending")
}
```
Simply set the setting "sorting" in your collection and all newly added models and "sort" triggers will order the collection by this setting.

Example:
```js
var Arrival  = Backbone.Model;
var arrivals = new Backbone.Collection;

arrivals.sorting = { by: 'estimated', type: 'date', direction: 'descending' };

arrivals.add(new Arrival({description: "From JFK to SFO", estimated: "2014-04-16T00:00:00Z"}));
arrivals.add(new Arrival({description: "From LAX to SFO", estimated: "2014-04-16T13:00:00Z"}));
arrivals.add(new Arrival({description: "From LAS to SFO", estimated: "2014-04-16T01:00:00Z"}));

alert(arrivals.pluck('description'));
// Will result:  From LAX to SFO,From LAS to SFO,From JFK to SFO
```
## Non-destructive plugin
The plugin is non-destructive to the existing behaviors as long as the "sorting" setting isn't invoked.  The "comparator" method can still be overwritten.

## Prerequisites
 - Backbone v1.0
 - Underscore v1.4

## Dependencies loading

### Require.js AMD

```js
requirejs.config({
  baseUrl: 'static/',
  urlArgs: 'bust=' +  Date.now(),
  paths: {
    "underscore": 'assets/js/underscore',
    "backbone": 'assets/js/backbone',
    "backbone-collection-sorting": 'assets/js/backbone-collection-sorting'
  },

  shim: {
    "backbone": {
      deps: ['underscore'],
      exports: 'Backbone'
    },
    "backbone-collection-sorting": {
      deps: ['underscore', 'backbone'],
      exports: 'Backbone'
    }
  }
});
```

### Old style

```html
<script src="assets/js/underscore.js" />
<script src="assets/js/backbone.js" />
<script src="assets/js/backbone-collection-sorting.js" />
```
