define(['ojs/ojcore', 'knockout', 'ojs/ojlistview', 'ojs/ojcollectiontabledatasource'],

  function(oj, ko) {
    /**
     * The view model for the main content view template.
     */
    function mainContentViewModel(context) {
      var self = this;
      var element = context.element;
      self.loaded = ko.observable(false);
      self.association = ko.observable('');
      self.url = ko.computed(function() {
        return '/api/standings/' + self.association();
      })

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
                size = 50;
            }

            return size;

        });

      var model = oj.Model.extend({
        idAttribute: 'team',
        parse: function(response) {
          response.regularSeasonRecord = response.rs.win + '-' + response.rs.loss + '-' + response.rs.tie;
          response.tournamentRecord = response.tournament.win + '-' + response.tournament.loss + '-' + response.tournament.tie;
          response.qualifyingRecord = response.qualifying.win + '-' + response.qualifying.loss + '-' + response.qualifying.tie;
          response.rsPoints = response.rs.points;
          return response;

        }
      });

      var collection = new oj.Collection(null, {
        url: self.url(),
        fetchSize: -1,
        model: model
      });
      self.dataSource = ko.observable();




      /**
       * This optional method may be implemented on the ViewModel to perform initialization tasks.
       * This method will be invoked only if the ViewModel specified during registration is
       * an object instance as opposed to a constructor function. If the registered ViewModel is
       * a constructor function, the same context object will be passed to the constructor function
       * instead. If this method returns a Promise, activation will be delayed until the Promise is resolved.
       **/
      self.initialize = function(context) {

      }


      /**
       * This optional method may be implemented on the ViewModel and will be invoked after the ViewModel is initialized.
       **/
      self.activated = function(context) {
        console.log('activated');
        context.props.then(function(properties) {
          if (properties.association) {
            self.association(properties.association);
            collection.url = self.url();
            var ds = new oj.CollectionTableDataSource(collection)
            ds.sort({
              key: 'rsPoints',
              direction: 'descending'

            })
            self.dataSource(ds);
            self.loaded(true);
          }



        });


      }

      /**
       * This optional method may be implemented on the ViewModel and will be invoked after the
       * View is inserted into the document DOM.
       **/
      self.attached = function(context) {
        console.log('attached');

      }

      self.navigate = function(data, event) {

        oj.Router.rootInstance.go('/team/' + data.id).then(function() {
          oj.Router.sync();
        });

      };


      /**
       * This optional method may be implemented on the ViewModel and will be invoked after the
       * bindings are applied on this View.
       **/
      self.bindingsApplied = function(context) {
        console.log('bindings applied');

      }

      /**
       * This optional method may be implemented on the ViewModel and will be invoked when this
       * composite component is being disposed.
       **/
      self.dispose = function(element) {
        console.log('dispose');


      }



    }

    return mainContentViewModel
  });
