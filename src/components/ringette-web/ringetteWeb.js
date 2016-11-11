define(['ojs/ojcore', 'knockout'],

  function(oj, ko) {
    /**
     * The view model for the main content view template.
     */
    function mainContentViewModel(context) {
      var self = this;
      var element = context.element;
      self.name = ko.observable('web');

      context.props.then(function(properties) {
        if (properties.name) {
          self.name(properties.name);
        }

      });

      self.changeColor = function(colour) {
        document.getElementById("message").style["background-color"] = colour ? colour : '#' + Math.floor(Math.random() * 16777215).toString(16);
      }
      self.sendMessage = function() {
        var params = {
          'bubbles': true,
          'detail': {
            'value': new Date()
          }
        };
        element.dispatchEvent(new CustomEvent('messageClicked', params));
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
