//     Backbone.Collection.sorting v0.1.3
//     by Joe Vu - joe.vu@homeslicesolutions.com
//     For all details and documentation:
//     https://github.com/homeslicesolutions/backbone-collection-sorting

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'backbone'], factory);
    } else {
        // Browser globals
        factory(_, Backbone);
    }
}(this, function(_, Backbone){

  // Extending out
  _.extend(Backbone.Collection.prototype, {  

    //@Main Sorting object. Format like so: { by: (attribute), type: ("numeric","alpha","date", or "boolean"), direction: ("ascending" or "descending") }
    sorting: null,

    //@Default method
    comparator: function(a, b) {

      // if "sorting" property not set, just return false;
      if (!this.sorting) { sort = false; return false; }

      // Fill in all the pieces;
      this.sorting = _.extend({}, this._sortingDefault, this.sorting );

      // Variables
      var a = this.sorting.by == 'id' ? a.id : a.get(this.sorting.by),
          b = this.sorting.by == 'id' ? b.id : b.get(this.sorting.by),
          isAscending = !this.sorting.direction || this.sorting.direction != 'descending',
          sortType = this.sorting.type || 'numeric';
      
      // If attributes don't exist, set back
      if (a === void 0 || b === void 0) return -1;

      // Alphabetical
      if ( sortType == 'alpha' ) {
        a = a.toString().toLowerCase();
        b = b.toString().toLowerCase();

        // Compare
        if (isAscending) {
          return a > b ? 1 : -1;
        } else {
          return a < b ? 1 : -1;
        }
        return 0;

      // Numeric types
      } else {

        // Date: convert date to timestamp
        if (sortType == 'date') {
          a = this._normalizeDate( a ).getTime();
          b = this._normalizeDate( b ).getTime();

        // Boolean: false = 0 and true = 1
        } else if (sortType == 'boolean') {
          a = Number( a );
          b = Number( b );

        // Other: likely to be a number
        } else {
          a = parseFloat(a) || a;
          b = parseFloat(b) || b;
        }

        // If invalid, just append
        if (isNaN(a)) { return 1 };

        // Compare
        if (isAscending) {
          return a-b;
        } else {
          return b-a;
        }
      }
    },

    //@Set Sorting method
    setSorting: function( key, val, options ) {
      if (key == null) return;
      
      var data;
      if (typeof key === 'object') {
        data = key;
        options = val;
      } else {
        (data = {})[key] = val;
      }
      
      this.sorting = _.extend({}, this.sorting || this._sortingDefault, data );
      if (!options || !options.silent) this.sort();
    },

    //@Get Sorting
    getSorting: function( key ) {
      return key ? this.sorting[key] : this.sorting;
    },

    //@Flip Sorting Direction
    flipSorting: function() {
      this.setSorting({ direction: this.sorting.direction === 'ascending' ? 'descending' : 'ascending' });
    },

    //_Sorting Default object
    _sortingDefault: {
      by: 'id',
      type: 'numeric',
      direction: 'ascending'
    },

    //_Normalize Date (with added support for IE UTC Dates)
    _normalizeDate: function( dateString ) {
      if ( !dateString ) return dateString;

      var date = new Date(dateString);

      if (isNaN(date.getTime()) && dateString.toString().match(/^([0-9]+)\-([0-9]+)\-([0-9]+)T/g)) {
          var dateString = dateString.toString(),
              cal = dateString.split('T')[0].split('-'),
              time = dateString.split('T')[1].split(':');
          date = new Date();
          date.setUTCFullYear( cal[0] );
          date.setUTCMonth( parseInt(cal[1])-1 );
          date.setUTCDate( cal[2] );
          date.setUTCHours( time[0] );
          date.setUTCMinutes( time[1] );
          date.setUTCSeconds( parseFloat( time[2] ) || 0 );
      }

      return date;
    }
  });

}));
