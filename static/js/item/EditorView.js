define(function () {
  return Backbone.View.extend({
    el: '#editor',
    events: {
      'click .ok': 'save',
      'click .cancel': 'cancel'
    },
    initialize: function () {
      _.bindAll(this);
      Backbone.Events.bind('edit', this.edit);
      Backbone.Events.bind('closeEdit', this.closeEdit);
      this.success = null;
    },
    edit: function (txt, success, $item) {
      if ($item !== undefined) {
        $(this.el).css({
          left: $item.position().left
        });
      }
      $(this.el).slideDown();
      this.$('#txt').val(txt).focus();
      this.success = success;
    },
    closeEdit: function () {
      this.$('#txt').val('');
      $(this.el).slideUp();
    },
    save: function () {
      this.success(this.$('#txt').val());
    },
    cancel: function () {
      this.closeEdit();
    }
  });
});
