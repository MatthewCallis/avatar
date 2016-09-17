/* exported Avatar */
/* global jQuery */
import './polyfill';
import md5 from './md5';

class Avatar {
  constructor(element, options = {}) {
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
        size: 'medium',
      },
    }, options);

    let source = this.settings.fallbackImage;
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

  setSource(source) {
    if (!this.element) {
      throw new Error('No image element set.');
    }
    if (source) {
      this.element.src = source;
    }
  }

  initialAvatar() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const width = this.element.width || this.settings.size;
    const height = this.element.height || this.settings.size;
    const devicePixelRatio = Math.max(window.devicePixelRatio, 1);
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.scale(devicePixelRatio, devicePixelRatio);
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = this.settings.initial_bg;
    context.fill();
    context.font = `${this.settings.initial_weight} ${this.settings.initial_size || height / 2}px ${this.settings.initial_font_family}`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = this.settings.initial_fg;
    context.fillText(this.settings.initials, (width / 2), (height / 2));

    return canvas.toDataURL('image/png');
  }

  gravatarValid() {
    if (!(this.settings.email || this.settings.hash)) {
      return;
    }
    let image_source;
    if (this.settings.email) {
      image_source = `https://secure.gravatar.com/avatar/${md5(this.settings.email)}?d=404`;
    }
    if (this.settings.hash) {
      image_source = `https://secure.gravatar.com/avatar/${this.settings.hash}?d=404`;
    }
    const image = new Image();
    image.onload = this.gravatarValidOnLoad.bind(this);
    image.onerror = this.gravatarValidOnError.bind(this);
    image.src = image_source;
  }

  gravatarValidOnLoad() {
    this.setSource(Avatar.gravatarUrl(this.settings));
  }

  gravatarValidOnError() {
    if (this.settings.initials.length > 0) {
      this.setSource(this.initialAvatar());
      return;
    }
    this.setSource(this.settings.fallbackImage);
  }

  static gravatarUrl(settings = {}) {
    const size = (settings.size >= 1 && settings.size <= 2048 ? settings.size : 80);
    let email_or_hash = settings.hash || settings.email;
    if (!email_or_hash || typeof email_or_hash !== 'string') {
      email_or_hash = '00000000000000000000000000000000';
    }
    email_or_hash = email_or_hash.toLowerCase().trim();

    const hash = email_or_hash.match(/@/g) !== null ? md5(email_or_hash) : email_or_hash;
    const fallback = settings.fallback ? encodeURIComponent(settings.fallback) : 'mm';
    const rating = settings.rating || 'x';
    const forcedefault = settings.forcedefault ? '&f=y' : '';

    return `https://secure.gravatar.com/avatar/${hash}?s=${size}&d=${fallback}&r=${rating}${forcedefault}`;
  }

  static githubAvatar(settings = {}) {
    const cdn_min = 0;
    const cdn_max = 3;
    const cdn = Math.floor(Math.random() * (cdn_max - (cdn_min + 1))) + cdn_min;
    return `https://avatars${cdn}.githubusercontent.com/u/${settings.github_id || 0}?v=3&s=${settings.size || 80}`;
  }

  static avatarsioAvatar(settings = {}) {
    let avatars_io_url = 'http://avatars.io/';
    if (!settings.avatars_io) {
      return avatars_io_url;
    }
    /* istanbul ignore else */
    if (settings.avatars_io.user_id && settings.avatars_io.identifier) {
      avatars_io_url += `${settings.avatars_io.user_id}/${settings.avatars_io.identifier}`;
    } else if (settings.avatars_io.twitter) {
      avatars_io_url += `twitter/${settings.avatars_io.twitter}`;
    } else if (settings.avatars_io.facebook) {
      avatars_io_url += `facebook/${settings.avatars_io.facebook}`;
    } else if (settings.avatars_io.instagram) {
      avatars_io_url += `instagram/${settings.avatars_io.instagram}`;
    }
    avatars_io_url += `?size=${settings.avatars_io.size}`;
    return avatars_io_url;
  }
}

/* istanbul ignore else */
if (typeof jQuery !== 'undefined') {
  jQuery.fn.avatar = function avatar(options) {
    return this.each(() => {
      /* istanbul ignore else */
      if (!jQuery.data(this, 'plugin_avatar')) {
        jQuery.data(this, 'plugin_avatar', new Avatar(this, options));
      }
    });
  };
}
