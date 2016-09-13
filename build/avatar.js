/* eslint no-var: 0, vars-on-top: 0, no-extend-native: 0, no-else-return: 0, prefer-rest-params: 0, no-self-compare: 0 */
// https://developer.mozilla.org/en-US/docs/MDN/About#Copyrights_and_licenses
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
/* istanbul ignore else */
if (typeof Object.assign !== 'function') {
  Object.assign = function assign(target) {
    /* istanbul ignore if */
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      /* istanbul ignore else */
      if (source != null) {
        for (var key in source) {
          /* istanbul ignore else */
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

/* eslint no-bitwise: 0 */
// http://www.myersdaily.org/joseph/javascript/md5.js
// http://www.myersdaily.org/joseph/javascript/md5-text.html
// http://www.myersdaily.org/joseph/javascript/md5-speed-test.html
function add32(a, b) {
  return a + b & 0xFFFFFFFF;
}

function cmn(q, a, b, x, s, t) {
  a = add32(add32(a, q), add32(x, t));
  return add32(a << s | a >>> 32 - s, b);
}

function ff(a, b, c, d, x, s, t) {
  return cmn(b & c | ~b & d, a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
  return cmn(b & d | c & ~d, a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | ~d), a, b, x, s, t);
}

function md5cycle(x, k) {
  var a = x[0];
  var b = x[1];
  var c = x[2];
  var d = x[3];

  a = ff(a, b, c, d, k[0], 7, -680876936);
  d = ff(d, a, b, c, k[1], 12, -389564586);
  c = ff(c, d, a, b, k[2], 17, 606105819);
  b = ff(b, c, d, a, k[3], 22, -1044525330);
  a = ff(a, b, c, d, k[4], 7, -176418897);
  d = ff(d, a, b, c, k[5], 12, 1200080426);
  c = ff(c, d, a, b, k[6], 17, -1473231341);
  b = ff(b, c, d, a, k[7], 22, -45705983);
  a = ff(a, b, c, d, k[8], 7, 1770035416);
  d = ff(d, a, b, c, k[9], 12, -1958414417);
  c = ff(c, d, a, b, k[10], 17, -42063);
  b = ff(b, c, d, a, k[11], 22, -1990404162);
  a = ff(a, b, c, d, k[12], 7, 1804603682);
  d = ff(d, a, b, c, k[13], 12, -40341101);
  c = ff(c, d, a, b, k[14], 17, -1502002290);
  b = ff(b, c, d, a, k[15], 22, 1236535329);

  a = gg(a, b, c, d, k[1], 5, -165796510);
  d = gg(d, a, b, c, k[6], 9, -1069501632);
  c = gg(c, d, a, b, k[11], 14, 643717713);
  b = gg(b, c, d, a, k[0], 20, -373897302);
  a = gg(a, b, c, d, k[5], 5, -701558691);
  d = gg(d, a, b, c, k[10], 9, 38016083);
  c = gg(c, d, a, b, k[15], 14, -660478335);
  b = gg(b, c, d, a, k[4], 20, -405537848);
  a = gg(a, b, c, d, k[9], 5, 568446438);
  d = gg(d, a, b, c, k[14], 9, -1019803690);
  c = gg(c, d, a, b, k[3], 14, -187363961);
  b = gg(b, c, d, a, k[8], 20, 1163531501);
  a = gg(a, b, c, d, k[13], 5, -1444681467);
  d = gg(d, a, b, c, k[2], 9, -51403784);
  c = gg(c, d, a, b, k[7], 14, 1735328473);
  b = gg(b, c, d, a, k[12], 20, -1926607734);

  a = hh(a, b, c, d, k[5], 4, -378558);
  d = hh(d, a, b, c, k[8], 11, -2022574463);
  c = hh(c, d, a, b, k[11], 16, 1839030562);
  b = hh(b, c, d, a, k[14], 23, -35309556);
  a = hh(a, b, c, d, k[1], 4, -1530992060);
  d = hh(d, a, b, c, k[4], 11, 1272893353);
  c = hh(c, d, a, b, k[7], 16, -155497632);
  b = hh(b, c, d, a, k[10], 23, -1094730640);
  a = hh(a, b, c, d, k[13], 4, 681279174);
  d = hh(d, a, b, c, k[0], 11, -358537222);
  c = hh(c, d, a, b, k[3], 16, -722521979);
  b = hh(b, c, d, a, k[6], 23, 76029189);
  a = hh(a, b, c, d, k[9], 4, -640364487);
  d = hh(d, a, b, c, k[12], 11, -421815835);
  c = hh(c, d, a, b, k[15], 16, 530742520);
  b = hh(b, c, d, a, k[2], 23, -995338651);

  a = ii(a, b, c, d, k[0], 6, -198630844);
  d = ii(d, a, b, c, k[7], 10, 1126891415);
  c = ii(c, d, a, b, k[14], 15, -1416354905);
  b = ii(b, c, d, a, k[5], 21, -57434055);
  a = ii(a, b, c, d, k[12], 6, 1700485571);
  d = ii(d, a, b, c, k[3], 10, -1894986606);
  c = ii(c, d, a, b, k[10], 15, -1051523);
  b = ii(b, c, d, a, k[1], 21, -2054922799);
  a = ii(a, b, c, d, k[8], 6, 1873313359);
  d = ii(d, a, b, c, k[15], 10, -30611744);
  c = ii(c, d, a, b, k[6], 15, -1560198380);
  b = ii(b, c, d, a, k[13], 21, 1309151649);
  a = ii(a, b, c, d, k[4], 6, -145523070);
  d = ii(d, a, b, c, k[11], 10, -1120210379);
  c = ii(c, d, a, b, k[2], 15, 718787259);
  b = ii(b, c, d, a, k[9], 21, -343485551);

  x[0] = add32(a, x[0]);
  x[1] = add32(b, x[1]);
  x[2] = add32(c, x[2]);
  x[3] = add32(d, x[3]);
}

/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */
function md5blk(s) {
  /* I figured global was faster.   */
  var md5blks = []; /* Andy King said do it this way. */
  for (var i = 0; i < 64; i += 4) {
    md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
  }
  return md5blks;
}

function md51(s) {
  var n = s.length;
  var state = [1732584193, -271733879, -1732584194, 271733878];
  var i = void 0;
  for (i = 64; i <= s.length; i += 64) {
    md5cycle(state, md5blk(s.substring(i - 64, i)));
  }
  s = s.substring(i - 64);
  var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (i = 0; i < s.length; i++) {
    tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
  }
  tail[i >> 2] |= 0x80 << (i % 4 << 3);
  if (i > 55) {
    md5cycle(state, tail);
    for (i = 0; i < 16; i++) {
      tail[i] = 0;
    }
  }
  tail[14] = n * 8;
  md5cycle(state, tail);
  return state;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n) {
  var s = '';
  var j = 0;
  for (; j < 4; j++) {
    s += hex_chr[n >> j * 8 + 4 & 0x0F] + hex_chr[n >> j * 8 & 0x0F];
  }
  return s;
}

function hex(x) {
  for (var i = 0; i < x.length; i++) {
    x[i] = rhex(x[i]);
  }
  return x.join('');
}

function md5(s) {
  return hex(md51(s));
}

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* exported Avatar */
/* global jQuery */
var Avatar = function () {
  function Avatar(element) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Avatar);

    if (!element) {
      throw new Error('No image element provided.');
    }

    this.element = element;
    this.settings = Object.assign({
      useGravatar: true,
      allowGravatarFallback: false,
      initials: '',
      initial_fg: '#888888',
      initial_bg: '#f4f6f7',
      initial_size: null,
      initial_weight: 100,
      initial_font_family: "'Lato', 'Lato-Regular', 'Helvetica Neue'",
      hash: null,
      email: null,
      size: 80,
      fallback: 'mm',
      rating: 'x',
      forcedefault: false,
      fallbackImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBmaWxsPSIjYmNjN2NlIiBkPSJNMCAwaDYwdjYwaC02MHoiLz48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNhNGIxYjkiIGQ9Ik0zMC4xIDU0LjhjLTYuNyAwLTEzLjEtMi44LTE3LjYtNy43bC0uNS0uNXYtMi42aC4yYy40LTQgMS42LTYuNyAzLjQtNy42IDEuMy0uNiAyLjktMS4xIDQuOS0xLjZ2LTFsMS0uM3MuNy0uMiAxLjctLjVjMC0uNS0uMS0uNy0uMS0uOS0uNi0xLTEuNS0zLjMtMi4xLTZsLTEuNy0xLjQuMi0uOXMuMi0uOSAwLTEuOWMtLjItLjkuMS0xLjUuMy0xLjguMy0uMy42LS41IDEtLjYuMy0xLjYuOS0zLjEgMS43LTQuMy0xLjMtMS41LTEuNy0yLjYtMS41LTMuNS4yLS45IDEtMS41IDEuOS0xLjUuNyAwIDEuMy4zIDEuOS42LjMtLjcuOS0xLjEgMS43LTEuMS43IDAgMS40LjQgMi40LjguNS4zIDEuMi42IDEuNi43IDMuNC4xIDcuNiAyLjIgOC45IDcuNi4zLjEuNi4zLjguNS40LjUuNSAxLjEuMyAxLjktLjIgMS4yIDAgMi40IDAgMi40bC4yLjgtMS4yIDEuMmMtLjUgMi44LTEuNiA1LjQtMi4yIDYuNS0uMS4xLS4xLjQtLjEuOCAxIC4zIDEuNy41IDEuNy41bDEgLjR2LjhjMi41LjUgNC42IDEuMSA2LjEgMS45IDEuOC45IDIuOSAzLjUgMy40IDcuOGwuMS42LS40LjVjLTQuNiA1LjktMTEuNSA5LjQtMTkgOS40eiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik00NS40IDM2LjhjLTEuNS0uOC0zLjktMS41LTctMnYtLjlzLTEtLjQtMi42LS43Yy0uMi0uOC0uMy0yIC4yLTIuOC41LS45IDEuNy0zLjYgMi4xLTYuNWwuOS0uOXMtLjMtMS40IDAtM2MuMi0uOS0uNC0uNy0uOS0uNS0uOS03LjEtNi4zLTcuNy03LjgtNy43LTEuNC0uMi0zLjktMi4yLTQuMS0xLjMtLjEuOSAxLjIgMS44LS40IDEuNC0xLjYtLjQtMy4xLTEuOC0zLjMtLjgtLjIuNyAxLjIgMi4zIDIgMy4xLTEuMiAxLjMtMi4xIDMuMi0yLjQgNi4xLS41LS4zLTEuNC0uNy0xLjEuMi4zIDEuMyAwIDIuNiAwIDIuNmwxLjQgMS4yYy41IDIuNyAxLjUgNS4xIDIgNiAuNS44LjMgMi4xLjIgMi44LTEuNS4zLTIuNi43LTIuNi43djEuMmMtMi41LjUtNC40IDEuMS01LjggMS43LTIgMS0yLjYgNS43LTIuNyA3Ljl2LjRjNC4xIDQuNCAxMCA3LjIgMTYuNSA3LjIgNy4zIDAgMTMuNy0zLjUgMTcuOC04LjgtLjEtMi4zLS44LTUuNy0yLjQtNi42eiIvPjwvZz48L3N2Zz4=',
      github_id: null,
      use_avatars_io: false,
      avatars_io: {
        user_id: null,
        identifier: null,
        twitter: null,
        facebook: null,
        instagram: null,
        size: 'medium'
      }
    }, options);

    if (this.settings.useGravatar && this.settings.allowGravatarFallback) {
      this.setSource(this.gravatarUrl());
    } else if (this.settings.useGravatar) {
      this.gravatarValid();
    } else if (this.settings.use_avatars_io && (this.settings.avatars_io.user_id !== null || this.settings.avatars_io.twitter != null || this.settings.avatars_io.facebook != null || this.settings.avatars_io.instagram != null)) {
      this.setSource(this.avatarsioAvatar());
    } else if (this.settings.github_id) {
      this.setSource(this.githubAvatar());
    } else if (this.settings.initials.length > 0) {
      this.setSource(this.initialAvatar());
    } else {
      this.setSource(this.settings.fallbackImage);
    }

    return this;
  }

  _createClass(Avatar, [{
    key: 'setSource',
    value: function setSource(source) {
      if (!this.element) {
        throw new Error('No image element set.');
      }
      if (source) {
        this.element.src = source;
      }
    }
  }, {
    key: 'initialAvatar',
    value: function initialAvatar() {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var width = this.element.width || this.settings.size;
      var height = this.element.height || this.settings.size;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      context.scale(window.devicePixelRatio, window.devicePixelRatio);
      context.rect(0, 0, canvas.width, canvas.height);
      context.fillStyle = this.settings.initial_bg;
      context.fill();
      context.font = this.settings.initial_weight + ' ' + (this.settings.initial_size || height / 2) + 'px ' + this.settings.initial_font_family;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = this.settings.initial_fg;
      context.fillText(this.settings.initials, width / 2, height / 2);

      return canvas.toDataURL('image/png');
    }
  }, {
    key: 'githubAvatar',
    value: function githubAvatar() {
      var cdn_min = 0;
      var cdn_max = 3;
      var cdn = Math.floor(Math.random() * (cdn_max - (cdn_min + 1))) + cdn_min;
      return 'https://avatars' + cdn + '.githubusercontent.com/u/' + this.settings.github_id + '?v=3&s=' + this.settings.size;
    }
  }, {
    key: 'avatarsioAvatar',
    value: function avatarsioAvatar() {
      var avatars_io_url = 'http://avatars.io/';
      /* istanbul ignore else */
      if (this.settings.avatars_io.user_id && this.settings.avatars_io.identifier) {
        avatars_io_url += this.settings.avatars_io.user_id + '/' + this.settings.avatars_io.identifier;
      } else if (this.settings.avatars_io.twitter) {
        avatars_io_url += 'twitter/' + this.settings.avatars_io.twitter;
      } else if (this.settings.avatars_io.facebook) {
        avatars_io_url += 'facebook/' + this.settings.avatars_io.facebook;
      } else if (this.settings.avatars_io.instagram) {
        avatars_io_url += 'instagram/' + this.settings.avatars_io.instagram;
      }
      avatars_io_url += '?size=' + this.settings.avatars_io.size;
      return avatars_io_url;
    }
  }, {
    key: 'gravatarUrl',
    value: function gravatarUrl() {
      var size = this.settings.size >= 1 && this.settings.size <= 2048 ? this.settings.size : 80;
      var email_or_hash = this.settings.hash || this.settings.email;
      if (!email_or_hash || typeof email_or_hash !== 'string') {
        email_or_hash = '00000000000000000000000000000000';
      }
      email_or_hash = email_or_hash.toLowerCase().trim();
      return ['https://secure.gravatar.com/avatar/', email_or_hash.match(/@/g) !== null ? md5(email_or_hash) : email_or_hash, '?s=' + size, '&d=' + encodeURIComponent(this.settings.fallback), '&r=' + this.settings.rating, this.settings.forcedefault ? '&f=y' : ''].join('');
    }
  }, {
    key: 'gravatarValid',
    value: function gravatarValid() {
      if (!(this.settings.email || this.settings.hash)) {
        return;
      }
      var image_source = void 0;
      if (this.settings.email) {
        image_source = 'https://secure.gravatar.com/avatar/' + md5(this.settings.email) + '?d=404';
      }
      if (this.settings.hash) {
        image_source = 'https://secure.gravatar.com/avatar/' + this.settings.hash + '?d=404';
      }
      var image = new Image();
      image.onload = this.gravatarValidOnLoad.bind(this);
      image.onerror = this.gravatarValidOnError.bind(this);
      image.src = image_source;
    }
  }, {
    key: 'gravatarValidOnLoad',
    value: function gravatarValidOnLoad() {
      this.setSource(this.gravatarUrl());
    }
  }, {
    key: 'gravatarValidOnError',
    value: function gravatarValidOnError() {
      if (this.settings.initials.length > 0) {
        this.setSource(this.initialAvatar());
        return;
      }
      this.setSource(this.settings.fallbackImage);
    }
  }]);

  return Avatar;
}();

/* istanbul ignore else */


if (typeof jQuery !== 'undefined') {
  jQuery.fn.avatar = function avatar(options) {
    var _this = this;

    return this.each(function () {
      /* istanbul ignore else */
      if (!jQuery.data(_this, 'plugin_avatar')) {
        jQuery.data(_this, 'plugin_avatar', new Avatar(_this, options));
      }
    });
  };
}