/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojmodel', 'ojs/ojknockout', 'ojs/ojselectcombobox', 'ojs/ojcomposite', 'components/stat-graph/loader'],
    function(oj, ko, $) {

        function CompareViewModel() {
            var self = this;

            self.team1 = ko.observableArray([]);
            self.team2 = ko.observableArray([]);
            self.team1Name = ko.computed(function(){
              return self.team1()[0];
            });
            self.team2Name = ko.computed(function(){
              return self.team2()[0];
            });
            self.elo = ko.observable();
            self.teams = ko.observableArray([]);
            self.team1Object = ko.observable({});
            self.team2Object = ko.observable({});
            self.loaded1 = ko.observable(false);
            self.loaded2 = ko.observable(false);
            var teamModel = oj.Model.extend({
                idAttribute: '_id',

            });

            self.colour = ko.observable("blue");
            self.colorUrl1 = ko.computed(function(){
                return '/color/' + self.team1Name();
            });

            self.colour2 = ko.observable("blue");
            self.colorUrl2 = ko.computed(function(){
                return '/color/' + self.team2Name();
            });

            var updateColor = function(url){
                return new Promise(function(resolve, reject){
                    $.get(url,function(data, status){
                        resolve(data.color);
                    });
                })

            }

            self.team1Changed = function(event, data) {
                if (data.option == "value") {
                    self.loaded1(false);
                    console.log('data: ' + data.value);
                    console.log(self.elo()[data.value].rating);
                    var myTeam = new teamModel();
                    var id = self.elo()[data.value].id;
                    myTeam._id = id;
                    myTeam.urlRoot = 'api/team/' + id;
                    myTeam.fetch({
                        success: function(model, response) {
                            var obj = {}
                            obj.rating = self.elo()[data.value].rating;
                            obj.rs_for = response.regularSeasonRecord.for;
                            obj.rs_against = response.regularSeasonRecord.against;
                            obj.rs_gfpg = (response.regularSeasonRecord.for / response.regularSeasonRecord.games).toFixed(2);
                            obj.rs_gapg = (response.regularSeasonRecord.against / response.regularSeasonRecord.games).toFixed(2);
                            obj.t_for = response.tournamentRecord.for;
                            obj.t_against = response.tournamentRecord.against;
                            obj.t_gfpg = (response.tournamentRecord.for / response.tournamentRecord.games).toFixed(2);
                            obj.t_gapg = (response.tournamentRecord.against / response.tournamentRecord.games).toFixed(2);
                            obj.total_gfpg = ((obj.rs_for + obj.t_for) / (response.tournamentRecord.games + response.regularSeasonRecord.games)).toFixed(2);
                            obj.total_gapg = ((obj.rs_against + obj.t_against)/ (response.tournamentRecord.games + response.regularSeasonRecord.games)).toFixed(2);
                            obj.rs_oppWinPct = response.regularSeasonRecord.oppWinPct;
                            obj.t_oppWinPct = response.tournamentRecord.oppWinPct;
                            self.team1Object(obj);
                            self.team1Object.valueHasMutated();
                            updateColor(self.colorUrl1()).then(function(colour){
                                self.colour(colour);
                                self.loaded1(true);
                            })


                        }
                    })
                }

            }

            self.team2Changed = function(event, data) {
                if (data.option == "value") {
                    self.loaded2(false);
                    console.log('data: ' + data.value);
                    console.log(self.elo()[data.value].rating);
                    var myTeam = new teamModel();
                    var id = self.elo()[data.value].id;
                    myTeam._id = id;
                    myTeam.urlRoot = 'api/team/' + id;
                    myTeam.fetch({
                        success: function(model, response) {
                            var obj = {}
                            obj.rating = self.elo()[data.value].rating;
                            obj.rs_for = response.regularSeasonRecord.for;
                            obj.rs_against = response.regularSeasonRecord.against;
                            obj.rs_gfpg = (response.regularSeasonRecord.for / response.regularSeasonRecord.games).toFixed(2);
                            obj.rs_gapg = (response.regularSeasonRecord.against / response.regularSeasonRecord.games).toFixed(2);
                            obj.t_for = response.tournamentRecord.for;
                            obj.t_against = response.tournamentRecord.against;
                            obj.t_gfpg = (response.tournamentRecord.for / response.tournamentRecord.games).toFixed(2);
                            obj.t_gapg = (response.tournamentRecord.against / response.tournamentRecord.games).toFixed(2);
                            obj.total_gfpg = ((obj.rs_for + obj.t_for) / (response.tournamentRecord.games + response.regularSeasonRecord.games)).toFixed(2);
                            obj.total_gapg = ((obj.rs_against + obj.t_against)/ (response.tournamentRecord.games + response.regularSeasonRecord.games)).toFixed(2);
                            obj.rs_oppWinPct = response.regularSeasonRecord.oppWinPct;
                            obj.t_oppWinPct = response.tournamentRecord.oppWinPct;
                            self.team2Object(obj);
                            self.team2Object.valueHasMutated();

                            updateColor(self.colorUrl2()).then(function(colour){
                                self.colour2(colour);
                                self.loaded2(true);
                            })

                        }
                    })
                }
            }
            self.ready = ko.computed(function() {
                return self.loaded1() && self.loaded2() && self.team1Object().rating && self.team2Object().rating ;
            })

            var model = oj.Model.extend({
                idAttribute: 'team'

            });

            var collection = new oj.Collection(null, {
                url: 'api/standings/elo',
                fetchSize: -1,
                model: model
            });
            // Below are a subset of the ViewModel methods invoked by the ojModule binding
            // Please reference the ojModule jsDoc for additionaly available methods.

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
                return new Promise(function(resolve, reject) {
                    collection.fetch({
                        success: function(collection, response, options) {
                            self.teams(response.reduce(function(result, elo) {
                                result.push(elo.team);
                                return result;
                            }, []).sort());
                            self.elo(response.reduce(function(result, elo) {
                                result[elo.team] = elo;
                                return result;
                            }, {}));
                            resolve(true);
                        }
                    })
                })

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
        return new CompareViewModel();
    }
);
