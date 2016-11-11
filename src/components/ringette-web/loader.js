define(['ojs/ojcore', 'text!./ringetteWeb.html', './ringetteWeb', 'text!./ringetteWeb.json', 'css!./ringetteWeb'],
    function(oj, view, viewModel, metadata) {
        oj.Composite.register('ringette-web',
            {
                metadata: {inline: JSON.parse(metadata)},
                view: {inline: view},
                viewModel: {inline: viewModel}
            });
    }
);
