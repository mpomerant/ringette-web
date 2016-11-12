/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojmodel', 'ojs/ojchart', 'ojs/ojtimezonedata', 'ojs/ojcomposite', 'components/game-list/loader', 'components/team-data-card/loader', 'components/team-hero/loader'],
  function(oj, ko, $) {

    function TeamViewModel() {
      var self = this;
      self.loaded = ko.observable(false);
      self.teamRouter = null;

      var options = {
        formatType: 'date',
        dateFormat: 'medium'
      };
      var converterFactory = oj.Validation.converterFactory("datetime");
      self.converter = converterFactory.createConverter(options);
      self.teamId = ko.observable();
      self.teamName = ko.observable('Loading');
      self.data = ko.observable({});
      self.regularSeason = ko.observableArray([]);
      self.tournament = ko.observableArray([]);
      self.teamAssociation = ko.observable();



      self.eloScores = ko.observableArray([]);
      self.lineSeriesValue = ko.computed(function() {
        return [{
          name: self.teamName(),
          items: self.eloScores()
        }];
      });

      var lineGroups = [];



      self.lineGroupsValue = ko.observableArray(lineGroups);
      var eloModel = oj.Model.extend({
        idAttribute: 'id',
        parse: function(response) {
          response[0].games.forEach(function(game) {
            game.date = self.converter.format(game.date);
          })
          var val = response[0];
          return val;
        }
      })
      var model = oj.Model.extend({
        idAttribute: '_id',
        parse: function(response) {
          response.regularSeason.forEach(function(game) {
            game.gameDate = self.converter.format(game.gameDate);
            game.score = game.homeScore + '-' + game.visitorScore;
          })

          response.tournament.forEach(function(game) {
            game.gameDate = self.converter.format(game.gameDate);
            game.score = game.homeScore + '-' + game.visitorScore;
          })

          var record = response.regularSeasonRecord;
          record.record = record.win + '-' + record.loss + '-' + record.tie

          var tournamentRecord = response.tournamentRecord;
          tournamentRecord.record = tournamentRecord.win + '-' + tournamentRecord.loss + '-' + tournamentRecord.tie
          return response
        }
      });
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.


      var initRouter = function() {
          self.teamId(self.teamRouter.stateId());

          var myTeam = new model();
          myTeam._id = self.teamId();
          myTeam.urlRoot = 'api/team/' + self.teamId();
          myTeam.fetch({
            success: function(model, response) {
              self.loaded(false);
              self.teamName(response.team.name);
              self.data(response);
              self.regularSeason(response.regularSeason);
              self.tournament(response.tournament);
              self.loaded(true);
            }
          })
          var elo = new eloModel();
          elo.urlRoot = 'api/standings/elo/' + self.teamId();
          elo.fetch({
            success: function(model) {

              var scores = model.get('games').map(function(game) {
                return parseFloat(game.score);
              });


              self.eloScores(scores);



              var dates = model.get('games').map(function(game) {
                return game.date;
              });
              self.lineGroupsValue(dates);
              var max = Math.max.apply(null, scores) + 25;
              var min = Math.min.apply(null, scores) - 50;

              $("#lineChart").ojChart("option", "yAxis.max", max);
              $("#lineChart").ojChart("option", "yAxis.min", min);
              $('#lineChart').ojChart("refresh");
            }
          })
        }
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
      self.handleActivated = function() {

        self.teamRouter = oj.Router.rootInstance.getChildRouter('teamId');
        if (!self.teamRouter) {
          self.teamRouter = oj.Router.rootInstance.createChildRouter('teamId', 'team');
          self.teamRouter.configure(function(stateId) {
            var state;

            if (stateId) {
              state = new oj.RouterState(stateId, {

                enter: function() {
                  initRouter();
                }
              }, self.teamRouter);
            }
            return state;
          });
          oj.Router.sync().then(function() {

          });
        }


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
      self.handleAttached = function() {
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
      self.handleBindingsApplied = function() {

      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new TeamViewModel();
  }
);
