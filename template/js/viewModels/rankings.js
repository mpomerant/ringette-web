/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojlistview', 'ojs/ojcollectiontabledatasource', 'ojs/ojpictochart', 'ojs/ojmodel'],
  function(oj, ko, $) {

    function RankingViewModel() {
      var self = this;
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.
      self.loaded = ko.observable(false);

      var model = oj.Model.extend({
        idAttribute: 'team',
        parse: function(response) {
          var trend = response.games.map(function(game) {
            var win = game.result > 0;
            var loss = game.result < 0;
            var tie = game.result === 0;
            var name = win ? 'Win' : loss ? 'Loss' : 'Tie';
            var shape = win ? 'rectangle' : loss ? 'rectangle' : 'rectangle';
            var color = win ? '#267db3' : loss ? '#ed6647' : '#29ba1c';
            var count = 1;

            return {
              name: name,
              shape: shape,
              color: color,
              count: count
            }
          })
          if (trend.length > 5) {
            trend = trend.slice(trend.length - 5);
          }
          response.trend = trend;
          return response;
        }
      });

      var collection = new oj.Collection(null, {
        url: 'api/standings/elo',
        fetchSize: -1,
        model: model
      });


      self.navigate = function(data, event) {

        oj.Router.rootInstance.go('/team/' + data.id);

      }
      self.dataSource = ko.observable();

        // create an observable which returns
        // the current screen max size
        self.screenRange =
            oj.ResponsiveKnockoutUtils.createScreenRangeObservable();

        // computed observable to change the label
        // from 'cal' to 'calendar' to 'daily calendar'
        // depending on the screen size
        self.imgSize = ko.computed(function() {
            var size = 35;
            var screenRange = self.screenRange();

            if ( oj.ResponsiveUtils.compare(screenRange,
                    oj.ResponsiveUtils.SCREEN_RANGE.MD) > -1)
            {
                size = 75;
            }

            return size;

        });
      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = function(info) {
        var ds = new oj.CollectionTableDataSource(collection)
        self.dataSource(ds);

      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed

      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View.
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
        self.loaded(true);
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new RankingViewModel();
  }
);
