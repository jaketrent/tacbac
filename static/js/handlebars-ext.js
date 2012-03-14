define(['handlebars', 'vendor/showdown'], function(Handlebars){

  var converter = new Showdown.converter();

  Handlebars.registerHelper('markdown', function(text) {
    return new Handlebars.SafeString(converter.makeHtml(text));
  });

});
