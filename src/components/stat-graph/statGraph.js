define(['ojs/ojcore', 'knockout', 'jquery'],

    function(oj, ko, $) {
        /**
         * The view model for the main content view template.
         */
        function mainContentViewModel(context) {
            var self = this;

            self.width = ko.observable(0);
            self.stat1 = ko.observable(0);
            self.stat2 = ko.observable(0);
            self.loaded = ko.observable(false);

            self.team1Width = ko.computed(function() {

                return (self.stat1() / (self.stat1() + self.stat2())) * self.width();
            });

            self.team2Width = ko.computed(function() {
                return (self.stat2() / (self.stat1() + self.stat2())) * self.width();
            });

            self.team1X = ko.computed(function() {
                return 0;
            })

            self.team2X = ko.computed(function() {
                return self.team1Width();
            });





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
                var element = context.element;
                var $window = $(element);
                self.width($window.width());
                $window.resize(function() {
                    self.width($window.width());

                });

            }

            /**
             * This optional method may be implemented on the ViewModel and will be invoked after the
             * bindings are applied on this View.
             **/
            self.bindingsApplied = function(context) {
                context.props.then(function(properties) {
                    if (properties.stat1) {
                        self.stat1(properties.stat1);

                    }

                    if (properties.stat2) {
                        self.stat2(properties.stat2);

                    }
                    self.loaded(true);


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
