/* eslint-disable no-unused-vars, node/no-unsupported-features/es-syntax, import/no-extraneous-dependencies */
declare module 'md5' {
  export function md5(s: any): any;
}
declare module 'avatar-initials' {
  import * as React from 'react';

  /**
   * Avatar is a JavaScript library for showing Gravatars or generating user avatars.
   *
   * @property {HTMLImageElement} element The image DOM node
   * @property {object} settings Settings
   * @class
   */
  export default class Avatar {
    /**
     * Return an Avatar instance.
     *
     * @static
     * @param {HTMLImageElement} element The image node to target
     * @param {object} settings Settings
     * @returns {Avatar} The new instance
     */
    static from(element: HTMLImageElement, settings: object): Avatar;

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
    static initialAvatar(settings: {
      /** The width & height of the output image */
      size: number;
      /** The width of the output image */
      width?: number;
      /** The height of the output image */
      height?: number;
      /** Initials to be used */
      initials: string;
      /** Avatar Background Color */
      background: string;
      /** Avatar Text Color */
      color: string;
      /** Text Size in pixels */
      fontSize: number;
      /** Font weight (numeric value for light, bold, etc.) */
      fontWeight: number;
      /** Font family to use for the initials */
      fontFamily: string;
      /** Text X position in pixels, defaults to: width / 2 */
      offsetX?: number;
      /** Text Y position in pixels, defaults to: height / 2 */
      offsetY?: number;
    }): string;

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
    static gravatarUrl({ size, email, hash, fallback, rating, forcedefault }: {
      /** The image resolution (width & height), defaults to 80 */
      size?: number;
      /** The email for the Gravatar hash */
      email?: string;
      /** The Gravatar hash */
      hash?: string;
      /** The Gravatar fallback setting, defaults to `mm` */
      fallback?: string;
      /** The Gravatar rating setting, defaults to `x` */
      rating?: string;
      /** The Gravatar forcedefault setting */
      forcedefault?: boolean;
    }): string;

    /**
     * Build a GitHub avatar URL.
     *
     * @static
     * @param {object} settings Settings
     * @param {number|string} settings.githubId The GitHub User ID
     * @param {number} settings.size The image resolution width & height
     * @returns {string} A URL to a GitHub avatar
     */
    static githubAvatar({ githubId, size }: {
      /** The GitHub User ID */
      githubId: number | string;
      /** The image resolution (width & height), defaults to 80 */
      size?: number;
    }): string;

    /**
     * Return an Avatar instance.
     *
     * @param {HTMLImageElement} element The image node to target.
     * @param {object} [options={}] Settings
     * @class
     */
    constructor(element: HTMLImageElement, options?: object);

    element: HTMLImageElement;

    settings: any;

    /**
     * Sets the element `src` attribute.
     *
     * @param {string} source The source to set to `src`.
     */
    setSource(source: string): void;

    /**
     * Attempts to create an image node with a Gravatar URL using the existing settings.
     */
    gravatarValid(): void;

    gravatarValidOnLoad(): void;

    gravatarValidOnError(): void;
  }

  /**
   * A React wrapper for the Avatar library.
   *
   * @param {object} props The components props.
   * @param {string} props.classes Classes applied to the IMG node.
   * @param {number} props.size The width & height of the image.
   * @param {number} props.width The width of the image, Intial Avatar specific.
   * @param {number} props.height The height of the image, Intial Avatar specific.
   * @param {string} props.fallbackImage When no other sources are found, this will be used as the source.
   * @param {string} props.alt The alt property of the IMG node.
   * @param {string} props.title The title property of the IMG node.
   * @param {string} props.primarySource When provided it will be used above all other sources.
   * @param {string} props.initials The string to use as the Initials, Intial Avatar specific.
   * @param {string} props.color The font color to use for the Initials, Intial Avatar specific.
   * @param {string} props.background The background color to use for the Initials, Intial Avatar specific.
   * @param {number} props.fontSize The font size to use for the Initials, Intial Avatar specific.
   * @param {number} props.fontWeight The font weight to use for the Initials, Intial Avatar specific.
   * @param {string} props.fontFamily The font family to use for the Initials, Intial Avatar specific.
   * @param {number | undefined} props.offsetX The X offset of the Initials text from the left, default is centered.
   * @param {number | undefined} props.offsetY The Y ffset of the Initials text from the top, default is centered.
   * @param {boolean} props.useGravatar When true, a Gravatar will attempt to be used, Gravatar specific.
   * @param {boolean} props.useGravatarFallback When true, a Gravatar fallback will be used, Gravatar specific.
   * @param {string} props.hash The MD5 hash to use for the Gavatar, Gravatar specific.
   * @param {string} props.email The email to use for generating the MD5 hash, Gravatar specific.
   * @param {string} props.fallback The type of fallback to use, Gravatar specific.
   * @param {string} props.rating The content rating of the Gravatar, Gravatar specific.
   * @param {boolean} props.forcedefault When set, force a Gravatar default, Gravatar specific.
   * @param {number} props.githubId A GitHub ID to use to find the avatar, GitHub specific.
   * @returns {React.DetailedReactHTMLElement} The AvatarComponent node.
   */
  export function AvatarComponent({ classes, useGravatar, useGravatarFallback, initials, color, background, fontSize, fontWeight, fontFamily, offsetX, offsetY, hash, email, size, width, height, fallback, rating, forcedefault, fallbackImage, githubId, alt, title, primarySource }: {
    /** Classes applied to the IMG node. */
    classes: string;
    /** The width & height of the IMG node. */
    size: number;
    /** The width of the image, Intial Avatar specific. */
    width?: number | undefined;
    /** The height of the image, Intial Avatar specific. */
    height?: number | undefined;
    /** When no other sources are found, this will be used as the source. */
    fallbackImage: string;
    /** The alt property of the IMG node. */
    alt: string;
    /** The title property of the IMG node. */
    title: string;
    /** When provided it will be used above all other sources. */
    primarySource: string;
    /** The string to use as the Initials, Intial Avatar specific. */
    initials: string;
    /** The font color to use for the Initials, Intial Avatar specific. */
    color: string;
    /** The background color to use for the Initials, Intial Avatar specific. */
    background: string;
    /** The font size to use for the Initials, Intial Avatar specific. */
    fontSize: number;
    /** The font weight to use for the Initials, Intial Avatar specific. */
    fontWeight: number;
    /** The font family to use for the Initials, Intial Avatar specific. */
    fontFamily: string;
    /** The X offset of the Initials text from the left, default is centered. */
    offsetX: number | undefined;
    /** The Y ffset of the Initials text from the top, default is centered. */
    offsetY: number | undefined;
    /** When true, a Gravatar will attempt to be used, Gravatar specific. */
    useGravatar: boolean;
    /** When true, a Gravatar fallback will be used, Gravatar specific. */
    useGravatarFallback: boolean;
    /** The MD5 hash to use for the Gavatar, Gravatar specific. */
    hash: string;
    /** The email to use for generating the MD5 hash, Gravatar specific. */
    email: string;
    /** The type of fallback to use, Gravatar specific. */
    fallback: string;
    /** The content rating of the Gravatar, Gravatar specific. */
    rating: string;
    /** When set, force a Gravatar default, Gravatar specific. */
    forcedefault: boolean;
    /** A GitHub ID to use to find the avatar, GitHub specific. */
    githubId: number;
  }): React.DetailedReactHTMLElement;

  namespace AvatarComponent {
    const displayName: string;
    namespace defaultProps {
      const classes: string;
      const useGravatar: boolean;
      const useGravatarFallback: boolean;
      const initials: string;
      const color: string;
      const background: string;
      const fontSize: number;
      const fontWeight: number;
      const fontFamily: string;
      const offsetX: any;
      const offsetY: any;
      const hash: string;
      const email: string;
      const size: number;
      const width: any;
      const height: any;
      const fallback: string;
      const rating: string;
      const forcedefault: boolean;
      const fallbackImage: string;
      const githubId: number;
      const alt: string;
      const title: string;
      const primarySource: string;
    }
  }
}
// # sourceMappingURL=index.d.ts.map
