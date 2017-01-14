define(['ojs/ojcore', 'knockout', 'jquery'],

  function(oj, ko, $) {
    /**
     * The view model for the main content view template.
     */
    function mainContentViewModel(context) {
      var self = this;
      var element = context.element;
      self.teamName = ko.observable('web');
      self.colorUrl = ko.computed(function(){
        return '/color/' + self.teamName();
      });
      self.color = ko.observable("blue");




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
        context.props.then(function(properties) {
          if (properties.teamName) {
            self.teamName(properties.teamName);



          }

        });
      }

      /**
       * This optional method may be implemented on the ViewModel and will be invoked after the
       * View is inserted into the document DOM.
       **/
      self.attached = function(context) {

      }

      /**
       * This optional method may be implemented on the ViewModel and will be invoked after the
       * bindings are applied on this View.
       **/
      self.bindingsApplied = function(context) {
          context.props.then(function(properties) {
              if (properties.teamName) {
                  self.teamName(properties.teamName);
                  $.get(self.colorUrl(),function(data, status){
                      console.log('color: ' + JSON.stringify(data));
                      self.color(data.color);
                  });


              }

          });

      }

      /**
       * This optional method may be implemented on the ViewModel and will be invoked when this
       * composite component is being disposed.
       **/
      self.dispose = function(element) {

      }



    }

    return mainContentViewModel
  });
