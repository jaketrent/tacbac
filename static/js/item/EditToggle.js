define(function () {
  return Backbone.View.extend({
    el: '#edit-tgl',
    events: {
      'click': 'toggleEdit'
    },
    initialize: function () {
      _.bindAll(this);
      this.editOn = false;
    },
    toggleEdit: function () {
      this.editOn = !this.editOn;
      $('body').toggleClass('edit-mode', this.editOn);
    }
  });
});