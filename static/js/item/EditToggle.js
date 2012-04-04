define(['util'], function (util) {
  return Backbone.View.extend({
    el: '#edit-tgl',
    events: {
      'click': 'toggleEdit'
    },
    initialize: function () {
      _.bindAll(this);
      this.editOn = false;
      Backbone.Events.bind('ensureEditMode', this.ensureEditMode);
    },
    toggleEdit: function () {
      this.editOn = !this.editOn;
      this.ensureEditMode();
    },
    ensureEditMode: function () {
      if (util.browserIsContenteditable()) {
        $('.is-contenteditable').attr('contenteditable', this.editOn);
        $('html').toggleClass('edit-mode', this.editOn).addClass('contenteditable');
      } else {
        $('html').toggleClass('edit-mode', this.editOn).addClass('no-contenteditable');
      }
    }
  });
});