define(function () {
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
      var contentEditable = this.browserIsContenteditable();
      if (contentEditable) {
        $('.is-contenteditable').attr('contenteditable', this.editOn);
        $('html').toggleClass('edit-mode', this.editOn).addClass('contenteditable');
      } else {
        $('html').toggleClass('edit-mode', this.editOn).addClass('no-contenteditable');
      }
    },
    browserIsContenteditable: function () {
      /* no ios 3,4 -- for my purposes */
      return !((/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) && (/OS [1-4](_\d)?(_\d)? like Mac OS X/i.test(navigator.userAgent)));
    }
  });
});