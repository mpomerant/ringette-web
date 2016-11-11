define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojlistview', 'ojs/ojarraytabledatasource', 'ojs/ojmodel', 'ojs/ojmasonrylayout'],

  function(oj, ko, $) {
    /**
     * The view model for the main content view template.
     */
    function mainContentViewModel(context) {
      var self = this;


      self.dataSource = ko.observable();
      var model = oj.Model.extend({
        idAttribute: '_id'
      });

      var collection = new oj.Collection(null, {
        url: 'api/team?type=tree',
        fetchSize: -1,
        model: model
      });

      self.associations = ko.observableArray([]);
      self.navigate = function(data, event) {

          oj.Router.rootInstance.go('/team/' + data._id);

        }
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

        collection.fetch({
          success: function(collection, response, options) {
            self.associations(response);
            $("#masonry-layout").ojMasonryLayout("refresh");
          }
        })

      }

      /**
       * This optional method may be implemented on the ViewModel and will be invoked after the
       * View is inserted into the document DOM.
       **/
      self.attached = function(context) {
        console.log('attached');

      }

      /**
       * This optional method may be implemented on the ViewModel and will be invoked after the
       * bindings are applied on this View.
       **/
      self.bindingsApplied = function(context) {
        console.log('bindings applied');
        context.props.then(function(properties) {
          if (properties.data) {
            var ds = new oj.ArrayTableDataSource(properties.data)
            ds.sort({
              key: 'gameDate',
              direction: 'descending'

            })
            self.dataSource(ds);
          }



        });
      }

      /**
       * This optional method may be implemented on the ViewModel and will be invoked when this
       * composite component is being disposed.
       **/
      self.dispose = function() {



      }



    }

    return mainContentViewModel
  });
