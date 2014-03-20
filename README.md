Backbone.Collection.sorting
===========================
A simple sorting plugin solution for Backbone collections with configurable sort direction and types including numeric, alphabet, dates, and boolean values.

This plugin defines the "comparator" with a new method that supports various sorting order types and direction. The sort types include:

1. Numeric
2. Alphabetical
3. Dates (parsed from string)
4. Boolean

You may set the direction in regular ascending order or reversed order (descending).

## How to use
Simply set the setting "sorting" in your collection and all newly added models and "sort" triggers will order the collection by this setting.
```
collection.sorting = {
  by: (attribute or "id"),
  type: ("numeric", "alpha", "date", or "boolean"),
  direction: ("ascending" or "descending")
}
```

#### collection.sorting.by
Choose an attribute or the model's "id" to sort the order by. 

#### collection.sorting.type
You may sort in any of these valid values: "numeric", "alpha", "date", or "boolean".

#### collection.sorting.direction
Sort it normally in "ascending" or reversed: "descending" order.

```js
var Arrival  = Backbone.Model;
var arrivals = new Backbone.Collection;

arrivals.sorting = { by: 'estimated', type: 'date', direction: 'descending' };

arrivals.add(new Arrival({description: 'From JFK to SFO', estimated: '2014-04-16T00:00:00Z'}));
arrivals.add(new Arrival({description: 'From LAX to SFO', estimated: '2014-05-16T13:00:00Z'}));
arrivals.add(new Arrival({description: 'From LAS to SFO', estimated: '2014-04-16T05:00:00Z'}));

alert(arrivals.pluck('description'));
// Will result:  From LAX to SFO,From LAS to SFO,From JFK to SFO
```

### Changing the sort

#### setSorting
##### collection.setSorting([sorting], [options]);
Change the sort by applying new values using the "setSorting" method. After the property has been extended with the new values, a "sort" trigger is fired. You may run the method { silent: true } through the options parameter, to trigger silently.

#### getSorting
##### collection.getSorting();
This simiply returns the current sorting object.

#### flipSorting
##### collection.flipSorting();
This is a shortcut to flipping the sort.  If it's "ascending", it'll set it to "descending", and vice-versa.

```js
arrivals.setSorting({ direction: 'ascending' });

alert(arrivals.pluck('description'));
// Will result:  From JFK to SFO,From LAS to SFO,From LAX to SFO

arrivals.setSorting({ by: 'description', type: 'alpha', direction: 'descending' });

alert(arrivals.pluck('description'));
// Will result:  From LAX to SFO,From LAS to SFO,From JFK to SFO
```


## Non-destructive plugin
The plugin is non-destructive to the existing behaviors as long as the "sorting" setting isn't invoked.  The "comparator" method can still be overwritten.

## Prerequisites
 - Backbone v1.0
 - Underscore v1.4

## How to load

### Require.js AMD

```js
requirejs.config({
  paths: {
    'underscore': 'assets/js/underscore',
    'backbone': 'assets/js/backbone',
    'backbone-collection-sorting': 'assets/js/backbone-collection-sorting'
  },

  shim: {
    'backbone': {
      deps: ['underscore'],
      exports: 'Backbone'
    },
    'backbone-collection-sorting': {
      deps: ['underscore', 'backbone'],
      exports: 'Backbone'
    }
  }
});
```

### Static

```html
<script src="assets/js/underscore.js" />
<script src="assets/js/backbone.js" />
<script src="assets/js/backbone-collection-sorting.js" />
```

## Versions
#### v0.1.1
 - Added `getSorting` and `flipSorting` functions

#### v0.1
 - First commit! 
 
