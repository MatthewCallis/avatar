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
      size: 80,
      fallbackImage: "data:image/svg+xml,%3Csvg width='60' xmlns='http://www.w3.org/2000/svg' height='60' viewBox='0 0 60 60'%3E%3Cpath fill='%23bcc7ce' d='M0 0h60v60h-60z'/%3E%3Cg fill-rule='evenodd'%3E%3Cpath fill='%23a4b1b9' d='M30.1 54.8c-6.7 0-13.1-2.8-17.6-7.7l-.5-.5v-2.6h.2c.4-4 1.6-6.7 3.4-7.6 1.3-.6 2.9-1.1 4.9-1.6v-1l1-.3s.7-.2 1.7-.5c0-.5-.1-.7-.1-.9-.6-1-1.5-3.3-2.1-6l-1.7-1.4.2-.9s.2-.9 0-1.9c-.2-.9.1-1.5.3-1.8.3-.3.6-.5 1-.6.3-1.6.9-3.1 1.7-4.3-1.3-1.5-1.7-2.6-1.5-3.5.2-.9 1-1.5 1.9-1.5.7 0 1.3.3 1.9.6.3-.7.9-1.1 1.7-1.1.7 0 1.4.4 2.4.8.5.3 1.2.6 1.6.7 3.4.1 7.6 2.2 8.9 7.6.3.1.6.3.8.5.4.5.5 1.1.3 1.9-.2 1.2 0 2.4 0 2.4l.2.8-1.2 1.2c-.5 2.8-1.6 5.4-2.2 6.5-.1.1-.1.4-.1.8 1 .3 1.7.5 1.7.5l1 .4v.8c2.5.5 4.6 1.1 6.1 1.9 1.8.9 2.9 3.5 3.4 7.8l.1.6-.4.5c-4.6 5.9-11.5 9.4-19 9.4z'/%3E%3Cpath fill='%23fff' d='M45.4 36.8c-1.5-.8-3.9-1.5-7-2v-.9s-1-.4-2.6-.7c-.2-.8-.3-2 .2-2.8.5-.9 1.7-3.6 2.1-6.5l.9-.9s-.3-1.4 0-3c.2-.9-.4-.7-.9-.5-.9-7.1-6.3-7.7-7.8-7.7-1.4-.2-3.9-2.2-4.1-1.3-.1.9 1.2 1.8-.4 1.4-1.6-.4-3.1-1.8-3.3-.8-.2.7 1.2 2.3 2 3.1-1.2 1.3-2.1 3.2-2.4 6.1-.5-.3-1.4-.7-1.1.2.3 1.3 0 2.6 0 2.6l1.4 1.2c.5 2.7 1.5 5.1 2 6 .5.8.3 2.1.2 2.8-1.5.3-2.6.7-2.6.7v1.2c-2.5.5-4.4 1.1-5.8 1.7-2 1-2.6 5.7-2.7 7.9v.4c4.1 4.4 10 7.2 16.5 7.2 7.3 0 13.7-3.5 17.8-8.8-.1-2.3-.8-5.7-2.4-6.6z'/%3E%3C/g%3E%3C/svg%3E",
      setSourceCallback: () => {},
      primarySource: '',
      // Initial Specific
      initials: '',
      color: '#888888',
      background: '#f4f6f7',
      fontSize: 0,
      fontWeight: 100,
      fontFamily: "'Lato', 'Lato-Regular', 'Helvetica Neue'",
      offsetX: undefined,
      offsetY: undefined,
      width: undefined,
      height: undefined,
      // Gravatar Specific
      useGravatar: true,
      useGravatarFallback: false,
      hash: '',
      email: '',
      fallback: 'mm',
      rating: 'x',
      forcedefault: false,
      // Github Specific
      githubId: 0,
      ...options,
    };

    let source = this.settings.fallbackImage;
    if (this.settings.primarySource) {
      source = this.settings.primarySource;
    } else if (this.settings.useGravatar && this.settings.useGravatarFallback) {
      source = Avatar.gravatarUrl(this.settings);
    } else if (this.settings.useGravatar) {
      this.gravatarValid();
    } else if (this.settings.githubId) {
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
   * @param {object} settings Settings
   * @returns {Avatar} The new instance
   */
  static from(element, settings) {
    return new Avatar(element, settings);
  }

  /**
   * Sets the element `src` attribute.
   *
   * @param {string} source The source to set to `src`.
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
   * @param {number|undefined} settings.width The width of the output image
   * @param {number|undefined} settings.height The height of the output image
   * @param {string} settings.initials Initials to be used
   * @param {string} settings.background Avatar Background Color
   * @param {string} settings.color Avatar Text Color
   * @param {number} settings.fontSize Text Size in pixels
   * @param {number} settings.fontWeight Font weight (numeric value for light, bold, etc.)
   * @param {string} settings.fontFamily Font family to use for the initials
   * @param {number} [settings.offsetX] Text X position in pixels, defaults to: width / 2
   * @param {number} [settings.offsetY] Text Y position in pixels, defaults to: height / 2
   * @returns {string} A Base64 Data URL string with a PNG image representation of the avatar or an empty string.
   */
  static initialAvatar(settings) {
    let canvas;
    /* c8 ignore start */
    try {
      canvas = document.createElement('canvas');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Canvas related error:', error);
      return '';
    }
    /* c8 ignore end */
    const width = settings.width ? settings.width : settings.size;
    const height = settings.height ? settings.height : settings.size;
    const devicePixelRatio = Math.max(window.devicePixelRatio, 1);
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext('2d');
    // If the context is not avaliable for some reason, return early.
    /* c8 ignore start */
    if (!context) {
      // eslint-disable-next-line no-console
      console.error('Canvas context error.');
      return '';
    }
    /* c8 ignore end */

    const x = settings.offsetX ? settings.offsetX : (width / 2);
    const y = settings.offsetY ? settings.offsetY : (height / 2);

    context.scale(devicePixelRatio, devicePixelRatio);
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = settings.background;
    context.fill();
    context.font = `${settings.fontWeight} ${settings.fontSize || height / 2}px ${settings.fontFamily}`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = settings.color;
    context.fillText(settings.initials, x, y);

    /* c8 ignore next */
    return canvas.toDataURL('image/png');
  }

  /**
   * Build a Gravatar avatar URL.
   *
   * @static
   * @param {object} settings Settings
   * @param {number} settings.size The image resolution (width & height), defaults to 80
   * @param {string} settings.email The email for the Gravatar hash
   * @param {string} settings.hash The Gravatar hash
   * @param {string} settings.fallback The Gravatar fallback setting, defaults to `mm`
   * @param {string} settings.rating The Gravatar rating setting, defaults to `x`
   * @param {boolean} settings.forcedefault The Gravatar forcedefault setting
   * @returns {string} A URL to a Gravatar avatar
   */
  static gravatarUrl({ size = 80, email = '', hash = '', fallback = 'mm', rating = 'x', forcedefault = false }) {
    size = size && (size >= 1 && size <= 2048) ? size : 80;
    let email_or_hash = hash || email;
    email_or_hash = email_or_hash.toLowerCase().trim();
    if (!email_or_hash || typeof email_or_hash !== 'string') {
      email_or_hash = '00000000000000000000000000000000';
    }

    hash = email_or_hash.includes('@') ? md5(email_or_hash) : email_or_hash;
    const d = fallback ? encodeURIComponent(fallback) : 'mm';
    const r = rating || 'x';
    const force = forcedefault ? '&f=y' : '';

    return `https://secure.gravatar.com/avatar/${hash}?s=${size}&d=${d}&r=${r}${force}`;
  }

  /**
   * Build a GitHub avatar URL.
   *
   * @static
   * @param {object} settings Settings
   * @param {number|string} settings.githubId The GitHub User ID
   * @param {number} settings.size The image resolution width & height
   * @returns {string} A URL to a GitHub avatar
   */
  static githubAvatar({ githubId = 0, size = 80 }) {
    return `https://avatars.githubusercontent.com/u/${githubId}?s=${size}&v=4`;
  }
}

module.exports = Avatar;
