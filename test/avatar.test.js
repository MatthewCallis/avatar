import test from 'ava';
import nock from 'nock';
import sinon from 'sinon';
import Avatar from '../build/avatar';

let avatar;
let image;
const gravatar_timeout = 1600;

test.before(() => {
  nock.disableNetConnect();
  nock.cleanAll();

  // Useful when adding new tests that make calls.
  // nock.recorder.rec({
  //   dont_print: true,
  // });

  const request = nock('https://secure.gravatar.com/')
    .filteringRequestBody(() => '*')
    .defaultReplyHeaders({
      'Content-Type': 'content-type:image/jpeg',
    })
    .get('/avatar/12929016fffb0b3af98bc440acf0bfe2?d=404')
    .reply(200, 'JPEG')
    .get('/avatar/00000000000000000000000000000000?d=404')
    .reply(404, '');

  request.on('error', (err) => {
    console.log('NOCK ERROR:', err); // eslint-disable-line no-console
  });
});

test.beforeEach(() => {
  document.write('');
  document.write('<div id=\'avatar-1\'></div>');
  image = document.getElementById('avatar-1');
});

test.afterEach(() => {
  image = null;
  avatar = null;
});

test('#constructor should throw an error without an element', (t) => {
  t.throws(Avatar, 'Cannot call a class as a function');
});

test('#constructor should throw an error if there is no element provided', (t) => {
  const fn = () => {
    avatar = new Avatar();
  };
  const error = t.throws(() => { fn(); }, Error);
  t.is(error.message, 'No image element provided.');
});

test('#constructor should render', (t) => {
  avatar = new Avatar(image);
  t.true(avatar.settings.useGravatar);
});

test('#constructor should allow options', (t) => {
  avatar = new Avatar(image, {
    useGravatar: false,
  });
  t.false(avatar.settings.useGravatar);
});

test('#constructor should allow Gravatar fallbacks', (t) => {
  avatar = new Avatar(image, {
    useGravatar: true,
    allowGravatarFallback: true,
  });
  t.true(avatar.settings.useGravatar);
  t.true(avatar.settings.allowGravatarFallback);
});

test('#constructor should render a canvas', (t) => {
  avatar = new Avatar(image, {
    useGravatar: false,
    initials: 'MC',
  });
  t.false(avatar.settings.useGravatar);
  t.not(avatar.settings.useGravatar, 'MC');
});

test('#constructor should be able to set the settings', (t) => {
  const options = {
    useGravatar: false,
    allowGravatarFallback: true,
    initials: 'MDC',
    initial_fg: '#111',
    initial_bg: '#222',
    initial_size: 1,
    initial_weight: 2,
    initial_font_family: 'Comic Sans',
    hash: '00000000000000000000000000000000',
    email: 'matthew@apptentive.com',
    size: 120,
    fallback: 'mm',
    rating: 'pg',
    forcedefault: true,
    fallbackImage: 'nah',
    debug: false,
    github_id: 1,
    use_avatars_io: true,
    avatars_io: {
      user_id: 1,
      identifier: 2,
      twitter: 3,
      facebook: 4,
      instagram: 5,
    },
  };
  avatar = new Avatar(image, options);
  t.deepEqual(avatar.settings, options);
});

test('#setSource should throw an error if there is no element', (t) => {
  const fn = () => {
    avatar = new Avatar(image);
    delete avatar.element;
    avatar.setSource();
  };
  t.throws(fn, Error);
  t.throws(fn, 'No image element set.');
});

test('#setSource should set the src attribute', (t) => {
  avatar = new Avatar(image);
  avatar.setSource('data:image/png;');
  t.is(image.src, 'data:image/png;');

  avatar.setSource('http://placekitten.com/200/300');
  t.is(image.src, 'http://placekitten.com/200/300');

  avatar.setSource();
  t.is(image.src, 'http://placekitten.com/200/300');
});

test('#initialAvatar should return a PNG from element size', (t) => {
  avatar = new Avatar(image);
  const png = avatar.initialAvatar('MC');
  t.regex(png, /^data:/); // /^data:image\/png;base64,iV/
});

test('#initialAvatar should return a PNG from the size setting', (t) => {
  avatar = new Avatar(image, { size: 60 });
  const png = avatar.initialAvatar('MC');
  t.regex(png, /^data:/); // /^data:image\/png;base64,iV/
});

test('#githubAvatar should return a GitHub Avatar URL via instance', (t) => {
  avatar = new Avatar(image, {
    useGravatar: false,
    github_id: 67945,
    size: 80,
  });
  t.regex(avatar.element.src, /https:\/\/avatars[0-3].githubusercontent.com\/u\/[0-9]{1,}\?v=3&s=[0-9]{1,4}/i);
});

test('#githubAvatar should return a GitHub Avatar URL', (t) => {
  const github_url = Avatar.githubAvatar({
    github_id: 67945,
    size: 80,
  });
  t.regex(github_url, /https:\/\/avatars[0-3].githubusercontent.com\/u\/[0-9]{1,}\?v=3&s=[0-9]{1,4}/i);
});

test('#githubAvatar should not throw an error with no settings', (t) => {
  const github_url = Avatar.githubAvatar();
  t.regex(github_url, /https:\/\/avatars[0-3].githubusercontent.com\/u\/[0-9]{1,}\?v=3&s=[0-9]{1,4}/i);
});

test('#avatarsioAvatar should work as a static method', (t) => {
  const avatarsio_url = Avatar.avatarsioAvatar();
  t.is(avatarsio_url, 'https://avatars.io/');
});

test('#avatarsioAvatar should return an Avatars.io Avatar URL', (t) => {
  avatar = new Avatar(image, {
    useGravatar: false,
    use_avatars_io: true,
    avatars_io: {
      user_id: 12345,
      identifier: 'custom-id',
      size: 'small',
    },
  });
  t.is(avatar.element.src, 'https://avatars.io/12345/custom-id?size=small');
});

test('#avatarsioAvatar should return an Avatars.io Avatar URL with a custom size', (t) => {
  avatar = new Avatar(image, {
    useGravatar: false,
    use_avatars_io: true,
    avatars_io: {
      user_id: 12345,
      identifier: 'custom-id',
      size: 'medium',
    },
  });
  t.is(avatar.element.src, 'https://avatars.io/12345/custom-id?size=medium');
});

test('#avatarsioAvatar should return an Avatars.io Facebook Avatar URL', (t) => {
  avatar = new Avatar(image, {
    useGravatar: false,
    use_avatars_io: true,
    avatars_io: {
      facebook: 'matthew.callis',
      size: 'small',
    },
  });
  t.is(avatar.element.src, 'https://avatars.io/facebook/matthew.callis?size=small');
});

test('#avatarsioAvatar should return an Avatars.io Twitter Avatar URL', (t) => {
  avatar = new Avatar(image, {
    useGravatar: false,
    use_avatars_io: true,
    avatars_io: {
      twitter: 'superfamicom',
      size: 'small',
    },
  });
  t.is(avatar.element.src, 'https://avatars.io/twitter/superfamicom?size=small');
});

test('#avatarsioAvatar should return an Avatars.io Instagram Avatar URL', (t) => {
  avatar = new Avatar(image, {
    useGravatar: false,
    use_avatars_io: true,
    avatars_io: {
      instagram: 'matthewcallis',
      size: 'small',
    },
  });
  t.is(avatar.element.src, 'https://avatars.io/instagram/matthewcallis?size=small');
});

test('#gravatarUrl should return a Gravatar URL as a static method', (t) => {
  const url = Avatar.gravatarUrl();
  t.is(url, 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x');
});

test('#gravatarUrl should return a Gravatar URL with an email address', (t) => {
  avatar = new Avatar(image, {
    allowGravatarFallback: true,
    email: 'test@test.com',
  });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=80&d=mm&r=x');
});

test('#gravatarUrl should return a Gravatar URL with an hash', (t) => {
  avatar = new Avatar(image, {
    allowGravatarFallback: true,
    hash: 'b642b4217b34b1e8d3bd915fc65c4452',
  });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=80&d=mm&r=x');
});

test('#gravatarUrl should return a Gravatar URL with nothing', (t) => {
  avatar = new Avatar(image, { allowGravatarFallback: true });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x');
});

test('#gravatarUrl should return a Gravatar URL with a custom size', (t) => {
  avatar = new Avatar(image, {
    allowGravatarFallback: true,
    size: 100,
  });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=100&d=mm&r=x');
});

test('#gravatarUrl should return a Gravatar URL with a custom size (string)', (t) => {
  avatar = new Avatar(image, {
    allowGravatarFallback: true,
    size: '100',
  });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=100&d=mm&r=x');
});

test('#gravatarUrl should return a Gravatar URL with a minimum size of 80px', (t) => {
  avatar = new Avatar(image, {
    allowGravatarFallback: true,
    size: 0,
  });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x');
});

test('#gravatarUrl should return a Gravatar URL with a maximum size of 2048px', (t) => {
  avatar = new Avatar(image, {
    allowGravatarFallback: true,
    size: 4000,
  });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x');
});

test('#gravatarUrl should return a Gravatar URL with a custom fallback', (t) => {
  avatar = new Avatar(image, {
    allowGravatarFallback: true,
    fallback: 'test',
  });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=test&r=x');
});

test('#gravatarUrl should return a Gravatar URL with a custom rating', (t) => {
  avatar = new Avatar(image, {
    allowGravatarFallback: true,
    rating: 'g',
  });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=g');
});

test('#gravatarUrl should return a Gravatar URL with a forced default', (t) => {
  avatar = new Avatar(image, {
    allowGravatarFallback: true,
    forcedefault: true,
  });
  t.is(avatar.element.src, 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x&f=y');
});

test('#gravatarValid should not throw an error with an email', (t) => {
  avatar = new Avatar(image, {
    useGravatar: true,
    email: 'test@test.test',
  });
  const fn = () => {
    avatar.gravatarValid();
  };
  t.notThrows(fn);
});

test('#gravatarValid should not throw an error with a hash', (t) => {
  avatar = new Avatar(image, {
    useGravatar: true,
    hash: '00000000000000000000000000000000',
  });
  const fn = () => {
    avatar.gravatarValid();
  };
  t.notThrows(fn);
});

test.skip.cb('#gravatarValid with an invalid Gravatar hash should return an error', (t) => {
  t.plan(3);

  avatar = new Avatar(image, {
    useGravatar: true,
    hash: '00000000000000000000000000000000',
  });
  const call_spy = sinon.spy(avatar, 'gravatarValid');
  const load_spy = sinon.spy(avatar, 'gravatarValidOnLoad');
  const error_spy = sinon.spy(avatar, 'gravatarValidOnError');

  avatar.gravatarValid();

  setTimeout(() => {
    t.true(call_spy.called);
    t.true(load_spy.notCalled);
    t.true(error_spy.called);

    t.end();
  }, gravatar_timeout);
});

test.skip.cb('#gravatarValid with a valid Gravatar hash should not return an error', (t) => {
  t.plan(3);

  avatar = new Avatar(image, {
    useGravatar: true,
    hash: '12929016fffb0b3af98bc440acf0bfe2',
  });
  const call_spy = sinon.spy(avatar, 'gravatarValid');
  const load_spy = sinon.spy(avatar, 'gravatarValidOnLoad');
  const error_spy = sinon.spy(avatar, 'gravatarValidOnError');

  avatar.gravatarValid();

  setTimeout(() => {
    t.true(call_spy.called);
    t.true(load_spy.called);
    t.true(error_spy.notCalled);

    t.end();
  }, gravatar_timeout);
});

test.skip.cb('#gravatarValid with an invalid Gravatar email should return an error', (t) => {
  t.plan(3);

  avatar = new Avatar(image, {
    useGravatar: true,
    email: 'test@test.com',
  });
  const call_spy = sinon.spy(avatar, 'gravatarValid');
  const load_spy = sinon.spy(avatar, 'gravatarValidOnLoad');
  const error_spy = sinon.spy(avatar, 'gravatarValidOnError');

  avatar.gravatarValid();

  setTimeout(() => {
    t.true(call_spy.called);
    t.true(load_spy.notCalled);
    t.true(error_spy.called);

    t.end();
  }, gravatar_timeout);
});

test.skip.cb('#gravatarValid with a valid Gravatar email should not return an error', (t) => {
  t.plan(3);

  avatar = new Avatar(image, {
    useGravatar: true,
    email: 'matthew@apptentive.com',
  });
  const call_spy = sinon.spy(avatar, 'gravatarValid');
  const load_spy = sinon.spy(avatar, 'gravatarValidOnLoad');
  const error_spy = sinon.spy(avatar, 'gravatarValidOnError');

  avatar.gravatarValid();

  setTimeout(() => {
    t.true(call_spy.called);
    t.true(load_spy.called);
    t.true(error_spy.notCalled);

    t.end();
  }, gravatar_timeout);
});

test('#gravatarValidOnLoad should call gravatarUrl with settings', (t) => {
  avatar = new Avatar(image, {
    useGravatar: false,
  });
  const call_spy = sinon.spy(avatar, 'gravatarValidOnLoad');
  const load_spy = sinon.spy(avatar, 'setSource');
  avatar.gravatarValidOnLoad();

  t.true(call_spy.calledOnce);
  t.true(load_spy.calledOnce);
});

test('#gravatarValidOnError should draw an avatar if we have initials', (t) => {
  avatar = new Avatar(image, {
    useGravatar: false,
    initials: 'MC',
  });
  const call_spy = sinon.spy(avatar, 'gravatarValidOnError');
  const load_spy = sinon.spy(avatar, 'setSource');
  const init_spy = sinon.spy(avatar, 'initialAvatar');

  avatar.gravatarValidOnError();
  t.is(call_spy.callCount, 1);
  t.is(load_spy.callCount, 1);
  t.is(init_spy.callCount, 1);
});

test('#gravatarValidOnError should use the fallback image without initials', (t) => {
  avatar = new Avatar(image, {
    useGravatar: false,
    initials: '',
  });
  const call_spy = sinon.spy(avatar, 'gravatarValidOnError');
  const load_spy = sinon.spy(avatar, 'setSource');
  const init_spy = sinon.spy(avatar, 'initialAvatar');

  avatar.gravatarValidOnError();
  t.is(call_spy.callCount, 1);
  t.is(load_spy.callCount, 1);
  t.is(init_spy.callCount, 0);
});

test('Issue #5 should build the image data for a hidden image', (t) => {
  image.removeAttribute('height');
  image.removeAttribute('width');
  image.style.display = 'none';
  avatar = new Avatar(image, {
    useGravatar: false,
    initials: 'f',
    initial_bg: '#FF5C45',
    initial_fg: 'white',
    size: 80,
  });
  t.not(image.src.length, 0);
});
