require.config({
  paths: {
    'order': 'vendor/order',
    'text': 'vendor/text',
    'handlebars': 'vendor/handlebars-1.0.0.beta.6'
  }
});

require(['require', 'webstack'], function (require) {
  if (!window.JSON) {
    require(['vendor/json2'], function () {
      /*for old browsers*/
    });
  }
  require(['item/ItemsView', 'item/EditorView', 'item/EditToggle'], function (ItemsView, EditorView, EditToggle) {
    new ItemsView();
    new EditorView();
    new EditToggle();
  });
});