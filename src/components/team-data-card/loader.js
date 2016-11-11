define(['ojs/ojcore', 'text!./teamDataCard.html', './teamDataCard', 'text!./teamDataCard.json', 'css!./teamDataCard'],
  function(oj, view, viewModel, metadata) {
    oj.Composite.register('team-data-card', {
      metadata: {
        inline: JSON.parse(metadata)
      },
      view: {
        inline: view
      },
      viewModel: {
        inline: viewModel
      }
    });
  }
);
