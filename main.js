requirejs.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                ['jquery.2.1.3', 'require.text.2.0.12.js']
            ],
            exports: 'Backbone'
        }
    },
    paths:{
        jquery:'jquery.2.1.3',
        underscore:'underscore.1.5.0',
        backbone:'backbone.1.1.2',
        text:'require.text.2.0.12.js'
    }
});


require(['backbone'], function(Backbone) {
    console.log('require ', Backbone);
});