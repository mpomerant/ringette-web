define(['ojs/ojcore', 'text!./teamHero.html', './teamHero', 'text!./teamHero.json', 'css!./teamHero'],
  function(oj, view, viewModel, metadata) {
    oj.Composite.register('team-hero', {
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
