define(['item/Item'], function (Item) {
  return Backbone.Collection.extend({
    model: Item,
    url: '/ws/item',
    comparator: function (item) {
      return item.get('create_date');
    }
  });
});