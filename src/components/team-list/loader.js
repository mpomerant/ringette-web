define(['ojs/ojcore', 'text!./teamList.html', './teamList', 'text!./teamList.json', 'css!./teamList'],
  function(oj, view, viewModel, metadata) {
    oj.Composite.register('team-list', {
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
