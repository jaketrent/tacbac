define(['item/Items', 'item/ItemView', 'tmpl!item/AddItemView', 'item/Item'], function (Items, ItemView, addItemViewTmpl, Item) {
  return Backbone.View.extend({
    el: '#cols',
    events: {
      'click .add-item': 'addItem'
    },
    initialize: function () {
      _.bindAll(this);
      this.collection = new Items();
      this.collection.bind('reset', this.render);
      this.collection.bind('error', function (coll, res) {
        alert(res);
      });
      this.collection.fetch();
      $(window).resize(this.resize);
    },
    render: function (coll, res) {
      var frag = document.createDocumentFragment();

      _(this.collection.models).each(function (item) {
        var itemView = new ItemView({
          model: item
        });
        frag.appendChild(itemView.render().el);
      });

      $(this.el).html(frag).append(addItemViewTmpl());
      this.resize();
      return this;
    },
    resize: function () {
      var $items = this.$('.item');
      var itemWidth = $items.eq(0).width();
      var extraWidthEach = 1; /*border*/
      var totalWidth = (itemWidth + extraWidthEach) * $items.length;
      $(this.el).css({
        width: totalWidth
      });
      $('body').css({
        width: totalWidth
      });
      var winHeight = $(window).height();
      _(this.$('.item')).each(function (item) {
        if ($(item).height() < winHeight) {
          $(item).css({
            height: winHeight
          });
        }
      });
    },
    addItem: function (evt) {
      Backbone.Events.trigger('edit', '', this.saveItemAdd, $(evt.currentTarget).closest('.item'));
    },
    saveItemAdd: function (newItemTitle) {
      var item = new Item();
      this.collection.add(item);
      item.save({
        title: newItemTitle
      }, {
        success: this.saveSuccess,
        error: this.saveError
      });
    },
    saveSuccess: function (item, res) {
      this.render();
      Backbone.Events.trigger('closeEdit');
    },
    saveError: function (item, res) {
      alert('item ERROR save');
    }
  });
});