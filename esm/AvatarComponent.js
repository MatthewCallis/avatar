/* eslint-disable react/prop-types, node/no-unpublished-import, node/no-unsupported-features/es-syntax, import/extensions, import/no-extraneous-dependencies, node/no-extraneous-import, jsdoc/require-param */
import React from 'react';
import Avatar from '../src/avatar.js';

/**
 * Logic for setting the source.
 *
 * @param setSource
 * @param props
 */
export function sourceLogic(setSource, { fallbackImage, primarySource, useGravatar, size, email, hash, fallback, rating, forcedefault, githubId, width, height, initials, offsetX, offsetY, background, color, fontFamily, fontSize, fontWeight }) {
  if (primarySource) {
    setSource(primarySource);
  } else if (useGravatar) {
    setSource(Avatar.gravatarUrl({ size, email, hash, fallback, rating, forcedefault }));
  } else if (githubId) {
    setSource(Avatar.githubAvatar({ size, githubId }));
  } else if (initials.length > 0) {
    setSource(Avatar.initialAvatar({ size, width, height, initials, offsetX, offsetY, background, color, fontFamily, fontSize, fontWeight }));
  } else {
    setSource(fallbackImage);
  }
}

/**
 * A React wrapper for the Avatar library.
 *
 * @param {object} props The components props.
 * @param {string} props.classes Classes applied to the IMG node.
 * @param {number} props.size The width & height of the IMG node.
 * @param {number | undefined} props.width The width of the image, Intial Avatar specific.
 * @param {number | undefined} props.height The height of the image, Intial Avatar specific.
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
export function AvatarComponent({
  classes = '',
  useGravatar = true,
  useGravatarFallback = false,
  initials = '',
  color = '#888888',
  background = '#f4f6f7',
  fontSize = 0,
  fontWeight = 100,
  fontFamily = "'Sofia', 'Helvetica Neue', sans-serif",
  offsetX,
  offsetY,
  hash = '',
  email = '',
  size = 80,
  width,
  height,
  fallback = 'mm',
  rating = 'x',
  forcedefault = false,
  fallbackImage = "data:image/svg+xml,%3Csvg width='60' xmlns='http://www.w3.org/2000/svg' height='60' viewBox='0 0 60 60'%3E%3Cpath fill='%23bcc7ce' d='M0 0h60v60h-60z'/%3E%3Cg fill-rule='evenodd'%3E%3Cpath fill='%23a4b1b9' d='M30.1 54.8c-6.7 0-13.1-2.8-17.6-7.7l-.5-.5v-2.6h.2c.4-4 1.6-6.7 3.4-7.6 1.3-.6 2.9-1.1 4.9-1.6v-1l1-.3s.7-.2 1.7-.5c0-.5-.1-.7-.1-.9-.6-1-1.5-3.3-2.1-6l-1.7-1.4.2-.9s.2-.9 0-1.9c-.2-.9.1-1.5.3-1.8.3-.3.6-.5 1-.6.3-1.6.9-3.1 1.7-4.3-1.3-1.5-1.7-2.6-1.5-3.5.2-.9 1-1.5 1.9-1.5.7 0 1.3.3 1.9.6.3-.7.9-1.1 1.7-1.1.7 0 1.4.4 2.4.8.5.3 1.2.6 1.6.7 3.4.1 7.6 2.2 8.9 7.6.3.1.6.3.8.5.4.5.5 1.1.3 1.9-.2 1.2 0 2.4 0 2.4l.2.8-1.2 1.2c-.5 2.8-1.6 5.4-2.2 6.5-.1.1-.1.4-.1.8 1 .3 1.7.5 1.7.5l1 .4v.8c2.5.5 4.6 1.1 6.1 1.9 1.8.9 2.9 3.5 3.4 7.8l.1.6-.4.5c-4.6 5.9-11.5 9.4-19 9.4z'/%3E%3Cpath fill='%23fff' d='M45.4 36.8c-1.5-.8-3.9-1.5-7-2v-.9s-1-.4-2.6-.7c-.2-.8-.3-2 .2-2.8.5-.9 1.7-3.6 2.1-6.5l.9-.9s-.3-1.4 0-3c.2-.9-.4-.7-.9-.5-.9-7.1-6.3-7.7-7.8-7.7-1.4-.2-3.9-2.2-4.1-1.3-.1.9 1.2 1.8-.4 1.4-1.6-.4-3.1-1.8-3.3-.8-.2.7 1.2 2.3 2 3.1-1.2 1.3-2.1 3.2-2.4 6.1-.5-.3-1.4-.7-1.1.2.3 1.3 0 2.6 0 2.6l1.4 1.2c.5 2.7 1.5 5.1 2 6 .5.8.3 2.1.2 2.8-1.5.3-2.6.7-2.6.7v1.2c-2.5.5-4.4 1.1-5.8 1.7-2 1-2.6 5.7-2.7 7.9v.4c4.1 4.4 10 7.2 16.5 7.2 7.3 0 13.7-3.5 17.8-8.8-.1-2.3-.8-5.7-2.4-6.6z'/%3E%3C/g%3E%3C/svg%3E",
  githubId = 0,
  alt = '',
  title = '',
  primarySource = '',
}) {
  const [source, setSource] = React.useState(primarySource || fallbackImage);

  width = width || size;
  height = height || size;

  React.useEffect(() => {
    /* c8 ignore next */
    sourceLogic(setSource, { fallbackImage, primarySource, useGravatar, size, email, hash, fallback, rating, forcedefault, githubId, width, height, initials, offsetX, offsetY, background, color, fontFamily, fontSize, fontWeight });
  }, [primarySource, fallbackImage, email, fallback, forcedefault, githubId, hash, initials, offsetX, offsetY, background, color, fontFamily, fontSize, fontWeight, rating, size, useGravatar]);

  // (<img src={source} width={width} height={height} alt={alt} title={title} className={classes} />)
  return /* #__PURE__ */React.createElement('img', {
    src: source,
    width,
    height,
    alt,
    title,
    className: classes,
  });
}
AvatarComponent.displayName = 'AvatarComponent';
AvatarComponent.defaultProps = {
  classes: '',
  useGravatar: true,
  useGravatarFallback: false,
  initials: '',
  color: '#888888',
  background: '#f4f6f7',
  fontSize: 0,
  fontWeight: 100,
  fontFamily: "'Sofia', 'Helvetica Neue', sans-serif",
  offsetX: undefined,
  offsetY: undefined,
  hash: '',
  email: '',
  size: 80,
  width: undefined,
  height: undefined,
  fallback: 'mm',
  rating: 'x',
  forcedefault: false,
  fallbackImage: "data:image/svg+xml,%3Csvg width='60' xmlns='http://www.w3.org/2000/svg' height='60' viewBox='0 0 60 60'%3E%3Cpath fill='%23bcc7ce' d='M0 0h60v60h-60z'/%3E%3Cg fill-rule='evenodd'%3E%3Cpath fill='%23a4b1b9' d='M30.1 54.8c-6.7 0-13.1-2.8-17.6-7.7l-.5-.5v-2.6h.2c.4-4 1.6-6.7 3.4-7.6 1.3-.6 2.9-1.1 4.9-1.6v-1l1-.3s.7-.2 1.7-.5c0-.5-.1-.7-.1-.9-.6-1-1.5-3.3-2.1-6l-1.7-1.4.2-.9s.2-.9 0-1.9c-.2-.9.1-1.5.3-1.8.3-.3.6-.5 1-.6.3-1.6.9-3.1 1.7-4.3-1.3-1.5-1.7-2.6-1.5-3.5.2-.9 1-1.5 1.9-1.5.7 0 1.3.3 1.9.6.3-.7.9-1.1 1.7-1.1.7 0 1.4.4 2.4.8.5.3 1.2.6 1.6.7 3.4.1 7.6 2.2 8.9 7.6.3.1.6.3.8.5.4.5.5 1.1.3 1.9-.2 1.2 0 2.4 0 2.4l.2.8-1.2 1.2c-.5 2.8-1.6 5.4-2.2 6.5-.1.1-.1.4-.1.8 1 .3 1.7.5 1.7.5l1 .4v.8c2.5.5 4.6 1.1 6.1 1.9 1.8.9 2.9 3.5 3.4 7.8l.1.6-.4.5c-4.6 5.9-11.5 9.4-19 9.4z'/%3E%3Cpath fill='%23fff' d='M45.4 36.8c-1.5-.8-3.9-1.5-7-2v-.9s-1-.4-2.6-.7c-.2-.8-.3-2 .2-2.8.5-.9 1.7-3.6 2.1-6.5l.9-.9s-.3-1.4 0-3c.2-.9-.4-.7-.9-.5-.9-7.1-6.3-7.7-7.8-7.7-1.4-.2-3.9-2.2-4.1-1.3-.1.9 1.2 1.8-.4 1.4-1.6-.4-3.1-1.8-3.3-.8-.2.7 1.2 2.3 2 3.1-1.2 1.3-2.1 3.2-2.4 6.1-.5-.3-1.4-.7-1.1.2.3 1.3 0 2.6 0 2.6l1.4 1.2c.5 2.7 1.5 5.1 2 6 .5.8.3 2.1.2 2.8-1.5.3-2.6.7-2.6.7v1.2c-2.5.5-4.4 1.1-5.8 1.7-2 1-2.6 5.7-2.7 7.9v.4c4.1 4.4 10 7.2 16.5 7.2 7.3 0 13.7-3.5 17.8-8.8-.1-2.3-.8-5.7-2.4-6.6z'/%3E%3C/g%3E%3C/svg%3E",
  githubId: 0,
  alt: '',
  title: '',
  primarySource: '',
};
export default AvatarComponent;
