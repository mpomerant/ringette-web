define(['ojs/ojcore', 'text!./gameList.html', './gameList', 'text!./gameList.json', 'css!./gameList'],
  function(oj, view, viewModel, metadata) {
    oj.Composite.register('game-list', {
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
