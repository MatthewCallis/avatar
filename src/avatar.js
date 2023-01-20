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
      fallbackImage: "data:image/svg+xml,%3Csvg width='60' xmlns='http://www.w3.org/2000/svg' height='60' viewBox='0 0 60 60'%3E%3Cpath fill='%23bcc7ce' d='M0 0h60v60h-60z'/%3E%3Cg fill-rule='evenodd'%3E%3Cpath fill='%23a4b1b9' d='M30.1 54.8c-6.7 0-13.1-2.8-17.6-7.7l-.5-.5v-2.6h.2c.4-4 1.6-6.7 3.4-7.6 1.3-.6 2.9-1.1 4.9-1.6v-1l1-.3s.7-.2 1.7-.5c0-.5-.1-.7-.1-.9-.6-1-1.5-3.3-2.1-6l-1.7-1.4.2-.9s.2-.9 0-1.9c-.2-.9.1-1.5.3-1.8.3-.3.6-.5 1-.6.3-1.6.9-3.1 1.7-4.3-1.3-1.5-1.7-2.6-1.5-3.5.2-.9 1-1.5 1.9-1.5.7 0 1.3.3 1.9.6.3-.7.9-1.1 1.7-1.1.7 0 1.4.4 2.4.8.5.3 1.2.6 1.6.7 3.4.1 7.6 2.2 8.9 7.6.3.1.6.3.8.5.4.5.5 1.1.3 1.9-.2 1.2 0 2.4 0 2.4l.2.8-1.2 1.2c-.5 2.8-1.6 5.4-2.2 6.5-.1.1-.1.4-.1.8 1 .3 1.7.5 1.7.5l1 .4v.8c2.5.5 4.6 1.1 6.1 1.9 1.8.9 2.9 3.5 3.4 7.8l.1.6-.4.5c-4.6 5.9-11.5 9.4-19 9.4z'/%3E%3Cpath fill='%23fff' d='M45.4 36.8c-1.5-.8-3.9-1.5-7-2v-.9s-1-.4-2.6-.7c-.2-.8-.3-2 .2-2.8.5-.9 1.7-3.6 2.1-6.5l.9-.9s-.3-1.4 0-3c.2-.9-.4-.7-.9-.5-.9-7.1-6.3-7.7-7.8-7.7-1.4-.2-3.9-2.2-4.1-1.3-.1.9 1.2 1.8-.4 1.4-1.6-.4-3.1-1.8-3.3-.8-.2.7 1.2 2.3 2 3.1-1.2 1.3-2.1 3.2-2.4 6.1-.5-.3-1.4-.7-1.1.2.3 1.3 0 2.6 0 2.6l1.4 1.2c.5 2.7 1.5 5.1 2 6 .5.8.3 2.1.2 2.8-1.5.3-2.6.7-2.6.7v1.2c-2.5.5-4.4 1.1-5.8 1.7-2 1-2.6 5.7-2.7 7.9v.4c4.1 4.4 10 7.2 16.5 7.2 7.3 0 13.7-3.5 17.8-8.8-.1-2.3-.8-5.7-2.4-6.6z'/%3E%3C/g%3E%3C/svg%3E",
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

  /**
   * Attempts to create an image node with a Gravatar URL using the existing settings.
   *
   * @memberof Avatar
   */
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
    const size = settings.size && (settings.size >= 1 && settings.size <= 2048) ? settings.size : 80;
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
    return `https://avatars.githubusercontent.com/u/${settings.github_id || 0}?s=${settings.size || 80}&v=4`;
  }
}

module.exports = Avatar;
