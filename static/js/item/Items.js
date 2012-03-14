define(['item/Item'], function (Item) {
  return Backbone.Collection.extend({
    model: Item,
    url: '/ws/item'
  });
});