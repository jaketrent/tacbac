define(['util', 'item/Items', 'item/ItemView', 'tmpl!item/AddItemView', 'item/Item'], function (util, Items, ItemView, addItemViewTmpl, Item) {
  return Backbone.View.extend({
    el: '#cols',
    events: {
      'click .add-item': 'addItem',
      'click .rm-item': 'rmItem'
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
      Backbone.Events.trigger('ensureEditMode');
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
      if (util.browserIsContenteditable()) {
        this.saveItemAdd('newb');
      } else {
        Backbone.Events.trigger('edit', '', this.saveItemAdd, $(evt.currentTarget).closest('.item'));
      }
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
    },
    rmItem: function (evt) {
      if (confirm('Confirm remove?')) {
        var self = this;
        var indx = this.getItemIndexForEvt(evt);
        var item = this.collection.at(indx);
        item.destroy({
          success: function () {
            self.collection.remove(item);
            self.saveSuccess();
          },
          error: this.saveError
        });
      }
    },
    getItemIndexForEvt: function (evt) {
      var self = this;
      var $item = $(evt.currentTarget).closest('.item');
      return this.$('.item').index($item);
    }
  });
});