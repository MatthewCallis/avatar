/* eslint-disable ava/no-skip-test */
import { promisify } from 'node:util';
import test from 'ava';
import nock from 'nock';
import sinon from 'sinon';
import Avatar from '../esm/index.js';

const withCallback = (fn) => async (t) => {
  await promisify(fn)(t);
  t.pass(); // There must be at least one passing assertion for the test to pass
};

const initial = {
  initials: 'MC',
  color: '#888888',
  background: '#f4f6f7',
  fontSize: 0,
  fontWeight: 100,
  fontFamily: "'Lato', 'Lato-Regular', 'Helvetica Neue'",
};
const gravatar_timeout = 1600;

test.before(() => {
  nock.disableNetConnect();
  nock.cleanAll();

  // Useful when adding new tests that make calls.
  nock.recorder.rec({
    dont_print: true,
  });

  const request = nock('https://secure.gravatar.com')
    .filteringRequestBody(() => '*')
    .defaultReplyHeaders({
      'Content-Type': 'content-type:image/jpeg',
    })
    .persist()
    .get('/avatar/12929016fffb0b3af98bc440acf0bfe2?d=404')
    .reply(200, 'JPEG')
    .get('/avatar/b642b4217b34b1e8d3bd915fc65c4452?d=404')
    .reply(200, 'JPEG')
    .get('/avatar/00000000000000000000000000000000?d=404')
    .reply(404, '');

  request.on('error', (err) => {
    console.error('NOCK ERROR:', err); // eslint-disable-line no-console
  });
});

test.beforeEach(() => {
  document.body.innerHTML = '<img id="avatar-1" src="" />';
});

test.afterEach.always(() => {
  nock.cleanAll();
});

test('#constructor should throw an error without an element', (t) => {
  t.throws(Avatar, { message: 'Class constructor Avatar cannot be invoked without \'new\'' });
});

test('#constructor should throw an error if there is no element provided', (t) => {
  t.throws(() => {
    Avatar.from();
  }, { message: 'No image element provided.' });
});

test('#constructor should render', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image);
  t.true(avatar.settings.useGravatar);
});

test('#constructor should allow options', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatar: false,
  });
  t.false(avatar.settings.useGravatar);
});

test('#constructor should allow Gravatar fallbacks', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatar: true,
    useGravatarFallback: true,
  });
  t.true(avatar.settings.useGravatar);
  t.true(avatar.settings.useGravatarFallback);
});

test('#constructor should render a canvas', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatar: false,
    initials: 'MC',
  });
  t.false(avatar.settings.useGravatar);
  t.not(avatar.settings.useGravatar, 'MC');
});

test('#constructor should allow primarySource to be used', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    primarySource: 'yay',
  });
  t.is(avatar.element.src, 'http://sfc.fm/yay');
});

test('#constructor should be able to set the settings', (t) => {
  const options = {
    background: '#222',
    color: '#111',
    debug: false,
    email: 'matthew@apptentive.com',
    extra: () => true,
    fallback: 'mm',
    fallbackImage: 'nah',
    fontFamily: 'Comic Sans',
    fontSize: 1,
    fontWeight: 2,
    forcedefault: true,
    githubId: 1,
    hash: '00000000000000000000000000000000',
    height: undefined,
    initials: 'MDC',
    offsetX: undefined,
    offsetY: undefined,
    primarySource: '',
    rating: 'pg',
    setSourceCallback: () => {},
    size: 120,
    useGravatar: false,
    useGravatarFallback: true,
    width: undefined,
  };
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, options);
  t.deepEqual(avatar.settings, options);
});

test('#setSource should throw an error if there is no element', (t) => {
  t.throws(() => {
    const image = document.querySelector('#avatar-1');
    const avatar = new Avatar(image);
    delete avatar.element;
    avatar.setSource();
  }, { message: 'No image element set.' });
});

test('#setSource should set the src attribute', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image);
  avatar.setSource('data:image/png;');
  t.is(image.src, 'data:image/png;');

  avatar.setSource('http://placekitten.com/200/300');
  t.is(image.src, 'http://placekitten.com/200/300');

  avatar.setSource();
  t.is(image.src, 'http://placekitten.com/200/300');
});

test('#setSource should call setSourceCallback if provided', withCallback((t, end) => {
  let output;

  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    setSourceCallback(source) {
      output = source;
    },
  });
  avatar.setSource('data:image/png;');

  setTimeout(() => {
    t.is(output, 'data:image/png;');
    end();
  }, gravatar_timeout);
}));

test('#setSource should do nothing if there is no source provided', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image);
  avatar.setSource('data:image/png;');
  t.is(image.src, 'data:image/png;');

  avatar.setSource();
  t.is(image.src, 'data:image/png;');
});

test('Avatar.initialAvatar should return a PNG', (t) => {
  const png = Avatar.initialAvatar(initial);
  t.regex(png, /^data:/); // /^data:image\/png;base64,iV/
});

test('Avatar.initialAvatar should return a PNG with width & height', (t) => {
  const png = Avatar.initialAvatar({ ...initial, width: 90, height: 30 });
  t.regex(png, /^data:/); // /^data:image\/png;base64,iV/
});

test('Avatar.initialAvatar should return a PNG with offsetX & offsetY', (t) => {
  const png = Avatar.initialAvatar({ ...initial, offsetX: 1, offsetY: 2 });
  t.regex(png, /^data:/); // /^data:image\/png;base64,iV/
});

test('Avatar.githubAvatar should return a GitHub Avatar URL via instance', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatar: false,
    githubId: 67945,
    size: 80,
  });
  t.regex(avatar.element.src, /https:\/\/avatars[0-3]?.githubusercontent.com\/u\/\d+\?s=\d{1,4}&v=4/i);
});

test('Avatar.githubAvatar should return a GitHub Avatar URL', (t) => {
  const github_url = Avatar.githubAvatar({
    githubId: 67945,
    size: 80,
  });
  t.regex(github_url, /https:\/\/avatars[0-3]?.githubusercontent.com\/u\/\d+\?s=\d{1,4}&v=4/i);
});

test('Avatar.githubAvatar should not throw an error with no settings', (t) => {
  const github_url = Avatar.githubAvatar({});
  t.regex(github_url, /https:\/\/avatars[0-3]?.githubusercontent.com\/u\/\d+\?s=\d{1,4}&v=4/i);
});

test('Avatar.gravatarUrl should return a Gravatar URL as a static method', (t) => {
  const url = Avatar.gravatarUrl({});
  t.is(url, 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x');
});

test('Avatar.gravatarUrl should return a Gravatar URL with a custom settings', (t) => {
  t.is(
    Avatar.gravatarUrl({ fallback: 'wow ok', rating: 'g', forcedefault: true }),
    'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=wow%20ok&r=g&f=y',
  );
  t.is(
    Avatar.gravatarUrl({ fallback: '', rating: '', forcedefault: '' }),
    'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x',
  );
});

test('Avatar.gravatarUrl should return a Gravatar URL with an email address', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatarFallback: true,
    email: 'test@test.com',
  });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=80&d=mm&r=x');
});

test('Avatar.gravatarUrl should return a Gravatar URL with an hash', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatarFallback: true,
    hash: 'b642b4217b34b1e8d3bd915fc65c4452',
  });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=80&d=mm&r=x');
});

test('Avatar.gravatarUrl should return a Gravatar URL with nothing', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, { useGravatarFallback: true });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x');
});

test('Avatar.gravatarUrl should return a Gravatar URL with a custom size', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatarFallback: true,
    size: 100,
  });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=100&d=mm&r=x');
});

test('Avatar.gravatarUrl should return a Gravatar URL with a custom size (string)', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatarFallback: true,
    size: '100',
  });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=100&d=mm&r=x');
});

test('Avatar.gravatarUrl should return a Gravatar URL with a minimum size of 80px', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatarFallback: true,
    size: 0,
  });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x');
});

test('Avatar.gravatarUrl should return a Gravatar URL with a maximum size of 2048px', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatarFallback: true,
    size: 4000,
  });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x');
});

test('Avatar.gravatarUrl should return a Gravatar URL with a custom fallback (class)', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatarFallback: true,
    fallback: 'test',
  });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=test&r=x');
});

test('Avatar.gravatarUrl should return a Gravatar URL with a custom rating', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatarFallback: true,
    rating: 'g',
  });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=g');
});

test('Avatar.gravatarUrl should return a Gravatar URL with a forced default', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatarFallback: true,
    forcedefault: true,
  });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x&f=y');
});

test('#gravatarValid with an invalid Gravatar hash should return an error', async (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatar: true,
  });

  const load_spy = sinon.spy();
  const error_spy = sinon.spy();

  await new Promise((resolve, reject) => {
    sinon.stub(avatar, 'gravatarValidOnLoad').callsFake(() => {
      load_spy();
      resolve();
    });
    sinon.stub(avatar, 'gravatarValidOnError').callsFake(() => {
      error_spy();
      resolve();
    });

    // Called again after setting hash.
    avatar.settings.hash = '00000000000000000000000000000000';
    avatar.gravatarValid();
  });

  t.false(load_spy.called);
  t.true(error_spy.called);
});

test('#gravatarValid with a valid Gravatar hash should not return an error', async (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatar: true,
  });

  const load_spy = sinon.spy();
  const error_spy = sinon.spy();

  await new Promise((resolve, reject) => {
    sinon.stub(avatar, 'gravatarValidOnLoad').callsFake(() => {
      load_spy();
      resolve();
    });
    sinon.stub(avatar, 'gravatarValidOnError').callsFake(() => {
      error_spy();
      resolve();
    });

    // Called again after setting hash.
    avatar.settings.hash = '12929016fffb0b3af98bc440acf0bfe2';
    avatar.gravatarValid();
  });

  t.true(load_spy.called);
  t.false(error_spy.called);
});

test('#gravatarValid with an invalid Gravatar email should return an error', async (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatar: true,
  });

  const load_spy = sinon.spy();
  const error_spy = sinon.spy();

  await new Promise((resolve, reject) => {
    sinon.stub(avatar, 'gravatarValidOnLoad').callsFake(() => {
      load_spy();
      resolve();
    });
    sinon.stub(avatar, 'gravatarValidOnError').callsFake(() => {
      error_spy();
      resolve();
    });

    // Called again after setting email.
    avatar.settings.email = 'test@test.com';
    avatar.gravatarValid();
  });

  t.false(load_spy.called);
  t.true(error_spy.called);
});

test('#gravatarValid with a valid Gravatar email should not return an error', async (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatar: true,
  });

  const load_spy = sinon.spy();
  const error_spy = sinon.spy();

  await new Promise((resolve, reject) => {
    sinon.stub(avatar, 'gravatarValidOnLoad').callsFake(() => {
      load_spy();
      resolve();
    });
    sinon.stub(avatar, 'gravatarValidOnError').callsFake(() => {
      error_spy();
      resolve();
    });

    // Called again after setting email.
    avatar.settings.email = 'matthew@apptentive.com';
    avatar.gravatarValid();
  });

  t.true(load_spy.called);
  t.false(error_spy.called);
});

test('#gravatarValidOnLoad should call gravatarUrl with settings', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatar: false,
  });
  const call_spy = sinon.spy(avatar, 'gravatarValidOnLoad');
  const load_spy = sinon.spy(avatar, 'setSource');
  avatar.gravatarValidOnLoad();

  t.true(call_spy.calledOnce);
  t.true(load_spy.calledOnce);
});

test('#gravatarValidOnError should draw an avatar if we have initials', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatar: false,
    initials: 'MC',
  });
  const call_spy = sinon.spy(avatar, 'gravatarValidOnError');
  const load_spy = sinon.spy(avatar, 'setSource');

  avatar.gravatarValidOnError();
  t.is(call_spy.callCount, 1);
  t.is(load_spy.callCount, 1);
});

test('#gravatarValidOnError should use the fallback image without initials', (t) => {
  const image = document.querySelector('#avatar-1');
  const avatar = new Avatar(image, {
    useGravatar: false,
    initials: '',
  });
  const call_spy = sinon.spy(avatar, 'gravatarValidOnError');
  const load_spy = sinon.spy(avatar, 'setSource');
  const init_spy = sinon.spy(Avatar, 'initialAvatar');

  avatar.gravatarValidOnError();
  t.is(call_spy.callCount, 1);
  t.is(load_spy.callCount, 1);
  t.is(init_spy.callCount, 0);
});

test('Issue #5 should build the image data for a hidden image', (t) => {
  const image = document.querySelector('#avatar-1');
  image.removeAttribute('height');
  image.removeAttribute('width');
  image.style.display = 'none';
  Avatar.from(image, {
    useGravatar: false,
    initials: 'f',
    background: '#FF5C45',
    color: 'white',
    size: 80,
  });
  t.not(image.src.length, 0);
});
