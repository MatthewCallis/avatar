const md5 = require('./md5');

/**
 * Avatar is a JavaScript library for showing Gravatars or generating user avatars.
 *
 * @property {HTMLImageElement} element The image DOM node
 * @property {object} settings Settings
 * @class
 */
class Avatar {
  /**
   * Return an Avatar instance.
   *
   * @param {HTMLImageElement} element The image node to target.
   * @param {object} [options={}] Settings
   * @returns {Avatar} The new instance
   * @class
   */
  constructor(element, options = {}) {
    if (!element) {
      throw new Error('No image element provided.');
    }

    this.element = element;
    this.settings = {
      useGravatar: true,
      allowGravatarFallback: false,
      initials: '',
      initial_fg: '#888888',
      initial_bg: '#f4f6f7',
      initial_size: 0,
      initial_weight: 100,
      initial_font_family: "'Lato', 'Lato-Regular', 'Helvetica Neue'",
      hash: '',
      email: '',
      size: 80,
      fallback: 'mm',
      rating: 'x',
      forcedefault: false,
      fallbackImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBmaWxsPSIjYmNjN2NlIiBkPSJNMCAwaDYwdjYwaC02MHoiLz48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNhNGIxYjkiIGQ9Ik0zMC4xIDU0LjhjLTYuNyAwLTEzLjEtMi44LTE3LjYtNy43bC0uNS0uNXYtMi42aC4yYy40LTQgMS42LTYuNyAzLjQtNy42IDEuMy0uNiAyLjktMS4xIDQuOS0xLjZ2LTFsMS0uM3MuNy0uMiAxLjctLjVjMC0uNS0uMS0uNy0uMS0uOS0uNi0xLTEuNS0zLjMtMi4xLTZsLTEuNy0xLjQuMi0uOXMuMi0uOSAwLTEuOWMtLjItLjkuMS0xLjUuMy0xLjguMy0uMy42LS41IDEtLjYuMy0xLjYuOS0zLjEgMS43LTQuMy0xLjMtMS41LTEuNy0yLjYtMS41LTMuNS4yLS45IDEtMS41IDEuOS0xLjUuNyAwIDEuMy4zIDEuOS42LjMtLjcuOS0xLjEgMS43LTEuMS43IDAgMS40LjQgMi40LjguNS4zIDEuMi42IDEuNi43IDMuNC4xIDcuNiAyLjIgOC45IDcuNi4zLjEuNi4zLjguNS40LjUuNSAxLjEuMyAxLjktLjIgMS4yIDAgMi40IDAgMi40bC4yLjgtMS4yIDEuMmMtLjUgMi44LTEuNiA1LjQtMi4yIDYuNS0uMS4xLS4xLjQtLjEuOCAxIC4zIDEuNy41IDEuNy41bDEgLjR2LjhjMi41LjUgNC42IDEuMSA2LjEgMS45IDEuOC45IDIuOSAzLjUgMy40IDcuOGwuMS42LS40LjVjLTQuNiA1LjktMTEuNSA5LjQtMTkgOS40eiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik00NS40IDM2LjhjLTEuNS0uOC0zLjktMS41LTctMnYtLjlzLTEtLjQtMi42LS43Yy0uMi0uOC0uMy0yIC4yLTIuOC41LS45IDEuNy0zLjYgMi4xLTYuNWwuOS0uOXMtLjMtMS40IDAtM2MuMi0uOS0uNC0uNy0uOS0uNS0uOS03LjEtNi4zLTcuNy03LjgtNy43LTEuNC0uMi0zLjktMi4yLTQuMS0xLjMtLjEuOSAxLjIgMS44LS40IDEuNC0xLjYtLjQtMy4xLTEuOC0zLjMtLjgtLjIuNyAxLjIgMi4zIDIgMy4xLTEuMiAxLjMtMi4xIDMuMi0yLjQgNi4xLS41LS4zLTEuNC0uNy0xLjEuMi4zIDEuMyAwIDIuNiAwIDIuNmwxLjQgMS4yYy41IDIuNyAxLjUgNS4xIDIgNiAuNS44LjMgMi4xLjIgMi44LTEuNS4zLTIuNi43LTIuNi43djEuMmMtMi41LjUtNC40IDEuMS01LjggMS43LTIgMS0yLjYgNS43LTIuNyA3Ljl2LjRjNC4xIDQuNCAxMCA3LjIgMTYuNSA3LjIgNy4zIDAgMTMuNy0zLjUgMTcuOC04LjgtLjEtMi4zLS44LTUuNy0yLjQtNi42eiIvPjwvZz48L3N2Zz4=',
      github_id: 0,
      setSourceCallback: () => {},
      ...options,
    };

    let source = this.settings.fallbackImage;
    if (this.settings.useGravatar && this.settings.allowGravatarFallback) {
      source = Avatar.gravatarUrl(this.settings);
    } else if (this.settings.useGravatar) {
      this.gravatarValid();
    } else if (this.settings.github_id) {
      source = Avatar.githubAvatar(this.settings);
    } else if (this.settings.initials.length > 0) {
      source = Avatar.initialAvatar(this.settings);
    }

    this.setSource(source);

    return this;
  }

  /**
   * Return an Avatar instance.
   *
   * @static
   * @param {HTMLImageElement} element The image node to target.
   * @param {object} options Settings
   * @returns {Avatar} The new instance
   * @memberof Avatar
   */
  static from(element, options) {
    return new Avatar(element, options);
  }

  /**
   * Sets the element `src` attribute.
   *
   * @param {string} source The source to set to `src`.
   * @memberof Avatar
   */
  setSource(source) {
    if (!this.element) {
      throw new Error('No image element set.');
    }
    if (source) {
      this.element.src = source;
      this.settings.setSourceCallback(source);
    }
  }

  gravatarValid() {
    if (!this.settings.email && !this.settings.hash) {
      return;
    }
    const id = this.settings.email ? md5(this.settings.email) : this.settings.hash;
    const image = new window.Image();
    image.addEventListener('load', this.gravatarValidOnLoad.bind(this));
    image.addEventListener('error', this.gravatarValidOnError.bind(this));
    image.src = `https://secure.gravatar.com/avatar/${id}?d=404`;
  }

  gravatarValidOnLoad() {
    this.setSource(Avatar.gravatarUrl(this.settings));
  }

  gravatarValidOnError() {
    if (this.settings.initials.length > 0) {
      this.setSource(Avatar.initialAvatar(this.settings));
      return;
    }
    this.setSource(this.settings.fallbackImage);
  }

  /**
   * Creates an avatar from
   *
   * @param {object} settings Settings
   * @param {number} settings.size The width & height of the output image
   * @param {string} settings.initials Initials to be used.
   * @param {string} settings.initial_bg Text Color
   * @param {string} settings.initial_fg Text Color
   * @param {number} settings.initial_size Text Size in pixels
   * @param {number} settings.initial_weight Font weight (numeric value for light, bold, etc.)
   * @param {string} settings.initial_font_family Font familt to use for the initials
   * @returns {string} A Base64 Data URL string with a PNG image representation of the avatar.
   * @memberof Avatar
   */
  static initialAvatar(settings) {
    const canvas = document.createElement('canvas');
    const width = settings.size;
    const height = settings.size;
    const devicePixelRatio = Math.max(window.devicePixelRatio, 1);
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext('2d');
    context.scale(devicePixelRatio, devicePixelRatio);
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = settings.initial_bg;
    context.fill();
    context.font = `${settings.initial_weight} ${settings.initial_size || height / 2}px ${settings.initial_font_family}`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = settings.initial_fg;
    context.fillText(settings.initials, (width / 2), (height / 2));

    /* istanbul ignore next */
    return canvas.toDataURL('image/png');
  }

  /**
   * Build a Gravatar avatar URL.
   *
   * @static
   * @param {object} [settings={}] Settings
   * @param {number} [settings.size=80] The image resolution width & height
   * @param {string} [settings.email] The email for the Gravatar hash
   * @param {string} [settings.hash] The Gravatar hash
   * @param {string} [settings.fallback=mm] The Gravatar fallback setting
   * @param {string} [settings.rating=x] The Gravatar rating setting
   * @param {boolean} [settings.forcedefault] The Gravatar forcedefault setting
   * @returns {string} A URL to a Gravatar avatar
   * @memberof Avatar
   */
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

  /**
   * Build a GitHub avatar URL.
   *
   * @static
   * @param {object} [settings={}] Settings
   * @param {number|string} [settings.github_id=0] The GitHub User ID
   * @param {number} [settings.size=80] The image resolution width & height
   * @returns {string} A URL to a GitHub avatar
   * @memberof Avatar
   */
  static githubAvatar(settings = {}) {
    const cdn_min = 0;
    const cdn_max = 3;
    const cdn = Math.floor(Math.random() * (cdn_max - (cdn_min + 1))) + cdn_min;
    return `https://avatars${cdn}.githubusercontent.com/u/${settings.github_id || 0}?s=${settings.size || 80}&v=4`;
  }
}

module.exports = Avatar;
