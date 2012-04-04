define(function () {
  return {
    browserIsContenteditable: function () {
      /* no ios 3,4 -- for my purposes */
      return !((/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) && (/OS [1-4](_\d)?(_\d)? like Mac OS X/i.test(navigator.userAgent)));
    }
  }
});