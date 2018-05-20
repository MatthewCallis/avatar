'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var md5 = _interopDefault(require('md5'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var Avatar =
/*#__PURE__*/
function () {
  function Avatar(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Avatar);

    if (!element) {
      throw new Error('No image element provided.');
    }

    this.element = element;
    this.settings = _objectSpread({
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
      },
      setSourceCallback: null
    }, options);
    var source = this.settings.fallbackImage;

    if (this.settings.useGravatar && this.settings.allowGravatarFallback) {
      source = Avatar.gravatarUrl(this.settings);
    } else if (this.settings.useGravatar) {
      this.gravatarValid();
    } else if (this.settings.use_avatars_io && (this.settings.avatars_io.user_id || this.settings.avatars_io.twitter || this.settings.avatars_io.facebook || this.settings.avatars_io.instagram)) {
      source = Avatar.avatarsioAvatar(this.settings);
    } else if (this.settings.github_id) {
      source = Avatar.githubAvatar(this.settings);
    } else if (this.settings.initials.length > 0) {
      source = this.initialAvatar();
    }

    this.setSource(source);
    return this;
  }

  _createClass(Avatar, [{
    key: "setSource",
    value: function setSource(source) {
      if (!this.element) {
        throw new Error('No image element set.');
      }

      if (source) {
        this.element.src = source;

        if (this.settings.setSourceCallback && typeof this.settings.setSourceCallback === 'function') {
          this.settings.setSourceCallback(source);
        }
      }
    }
  }, {
    key: "initialAvatar",
    value: function initialAvatar() {
      var canvas = document.createElement('canvas');
      var width = this.element.width || this.settings.size;
      var height = this.element.height || this.settings.size;
      var devicePixelRatio = Math.max(window.devicePixelRatio, 1);
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = "".concat(width, "px");
      canvas.style.height = "".concat(height, "px");
      var context = canvas.getContext('2d');

      if (context) {
        context.scale(devicePixelRatio, devicePixelRatio);
        context.rect(0, 0, canvas.width, canvas.height);
        context.fillStyle = this.settings.initial_bg;
        context.fill();
        context.font = "".concat(this.settings.initial_weight, " ").concat(this.settings.initial_size || height / 2, "px ").concat(this.settings.initial_font_family);
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = this.settings.initial_fg;
        context.fillText(this.settings.initials, width / 2, height / 2);
      }

      return canvas.toDataURL('image/png') || 'data:';
    }
  }, {
    key: "gravatarValid",
    value: function gravatarValid() {
      if (!(this.settings.email || this.settings.hash)) {
        return;
      }

      var image_source;

      if (this.settings.email) {
        image_source = "https://secure.gravatar.com/avatar/".concat(md5(this.settings.email), "?d=404");
      }

      if (this.settings.hash) {
        image_source = "https://secure.gravatar.com/avatar/".concat(this.settings.hash, "?d=404");
      }

      var image = new Image();
      image.onload = this.gravatarValidOnLoad.bind(this);
      image.onerror = this.gravatarValidOnError.bind(this);
      image.src = image_source;
    }
  }, {
    key: "gravatarValidOnLoad",
    value: function gravatarValidOnLoad() {
      this.setSource(Avatar.gravatarUrl(this.settings));
    }
  }, {
    key: "gravatarValidOnError",
    value: function gravatarValidOnError() {
      if (this.settings.initials.length > 0) {
        this.setSource(this.initialAvatar());
        return;
      }

      this.setSource(this.settings.fallbackImage);
    }
  }], [{
    key: "gravatarUrl",
    value: function gravatarUrl() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var size = settings.size >= 1 && settings.size <= 2048 ? settings.size : 80;
      var email_or_hash = settings.hash || settings.email;

      if (!email_or_hash || typeof email_or_hash !== 'string') {
        email_or_hash = '00000000000000000000000000000000';
      }

      email_or_hash = email_or_hash.toLowerCase().trim();
      var hash = email_or_hash.match(/@/g) !== null ? md5(email_or_hash) : email_or_hash;
      var fallback = settings.fallback ? encodeURIComponent(settings.fallback) : 'mm';
      var rating = settings.rating || 'x';
      var forcedefault = settings.forcedefault ? '&f=y' : '';
      return "https://secure.gravatar.com/avatar/".concat(hash, "?s=").concat(size, "&d=").concat(fallback, "&r=").concat(rating).concat(forcedefault);
    }
  }, {
    key: "githubAvatar",
    value: function githubAvatar() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var cdn_min = 0;
      var cdn_max = 3;
      var cdn = Math.floor(Math.random() * (cdn_max - (cdn_min + 1))) + cdn_min;
      return "https://avatars".concat(cdn, ".githubusercontent.com/u/").concat(settings.github_id || 0, "?v=3&s=").concat(settings.size || 80);
    }
  }, {
    key: "avatarsioAvatar",
    value: function avatarsioAvatar() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var avatars_io_url = 'https://avatars.io/';

      if (!settings.avatars_io) {
        return avatars_io_url;
      }
      /* istanbul ignore else */


      if (settings.avatars_io.user_id && settings.avatars_io.identifier) {
        avatars_io_url += "".concat(settings.avatars_io.user_id, "/").concat(settings.avatars_io.identifier);
      } else if (settings.avatars_io.twitter) {
        avatars_io_url += "twitter/".concat(settings.avatars_io.twitter);
      } else if (settings.avatars_io.facebook) {
        avatars_io_url += "facebook/".concat(settings.avatars_io.facebook);
      } else if (settings.avatars_io.instagram) {
        avatars_io_url += "instagram/".concat(settings.avatars_io.instagram);
      }

      avatars_io_url += "?size=".concat(settings.avatars_io.size);
      return avatars_io_url;
    }
  }]);

  return Avatar;
}();

module.exports = Avatar;
