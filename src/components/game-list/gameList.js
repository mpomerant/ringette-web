define(['ojs/ojcore', 'knockout', 'ojs/ojlistview', 'ojs/ojarraytabledatasource'],

  function(oj, ko) {
    /**
     * The view model for the main content view template.
     */
    function mainContentViewModel(context) {
      var self = this;
      var element = context.element;
      self.loaded = ko.observable(false);

      self.dataSource = ko.observable();
      self.tournament = ko.observable(false);




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

      }

      /**
       * This optional method may be implemented on the ViewModel and will be invoked after the
       * View is inserted into the document DOM.
       **/
      self.attached = function(context) {
        console.log('attached');

      }

      self.navigateHome = function(data, event) {

        oj.Router.rootInstance.go('/team/' + data._homeId).then(function() {
          oj.Router.sync();
        });

      };

      self.navigateVisitor = function(data, event) {

        oj.Router.rootInstance.go('/team/' + data._visitorId).then(function() {
          oj.Router.sync();
        })

      };
      /**
       * This optional method may be implemented on the ViewModel and will be invoked after the
       * bindings are applied on this View.
       **/
      self.bindingsApplied = function(context) {
        console.log('bindings applied');
        context.props.then(function(properties) {
          if (properties.data) {
            var ds = new oj.ArrayTableDataSource(properties.data)

            self.dataSource(ds);
            self.loaded(true);
          }

          self.tournament(properties.tournament);



        });
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
