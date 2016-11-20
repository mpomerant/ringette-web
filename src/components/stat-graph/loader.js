define(['ojs/ojcore', 'text!./statGraph.html', './statGraph', 'text!./statGraph.json', 'css!./statGraph'],
  function(oj, view, viewModel, metadata) {
    oj.Composite.register('stat-graph', {
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
