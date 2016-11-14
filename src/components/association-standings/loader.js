define(['ojs/ojcore', 'text!./associationStandings.html', './associationStandings', 'text!./associationStandings.json', 'css!./associationStandings'],
  function(oj, view, viewModel, metadata) {
    oj.Composite.register('association-standings', {
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
