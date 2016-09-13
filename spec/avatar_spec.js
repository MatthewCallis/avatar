/* global Avatar, $, md5 */
describe('Avatar', function () {
  var clock = void 0;
  var server = void 0;
  var sandbox = void 0;

  var avatar = void 0;
  var image = void 0;
  var gravatar_timeout = 1600;

  beforeEach(function () {
    clock = sinon.useFakeTimers();
    server = sinon.fakeServer.create();
    sandbox = sinon.sandbox.create();

    image = document.getElementById('avatar-1');
  });

  afterEach(function () {
    clock.restore();
    server.restore();
    sandbox.restore();

    image = null;
    avatar = null;
  });

  describe('#constructor', function () {
    it('should throw an error without an element', function () {
      Avatar.should.throw(Error);
      Avatar.should.throw('Cannot call a class as a function');
    });

    it('should throw an error if there is no element provided', function () {
      var fn = function fn() {
        avatar = new Avatar();
      };
      expect(fn).to.throw(Error);
      expect(fn).to.throw('No image element provided.');
    });

    it('should render', function () {
      avatar = new Avatar(image);
      avatar.settings.useGravatar.should.be.true();
    });

    it('should allow options', function () {
      avatar = new Avatar(image, {
        useGravatar: false
      });
      avatar.settings.useGravatar.should.not.be.true();
    });

    it('should allow Gravatar fallbacks', function () {
      avatar = new Avatar(image, {
        useGravatar: true,
        allowGravatarFallback: true
      });
      avatar.settings.useGravatar.should.be.true();
      avatar.settings.allowGravatarFallback.should.be.true();
    });

    it('should render a canvas', function () {
      avatar = new Avatar(image, {
        useGravatar: false,
        initials: 'MC'
      });
      avatar.settings.useGravatar.should.not.be.true();
      avatar.settings.useGravatar.should.not.equal('MC');
    });

    it('should be able to set the settings', function () {
      var options = {
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
          instagram: 5
        }
      };
      avatar = new Avatar(image, options);
      avatar.settings.should.deep.equal(options);
    });
  });

  describe('#setSource', function () {
    it('should throw an error if there is no element', function () {
      var fn = function fn() {
        avatar = new Avatar(image);
        delete avatar.element;
        avatar.setSource();
      };
      expect(fn).to.throw(Error);
      expect(fn).to.throw('No image element set.');
    });

    it('should set the src attribute', function () {
      avatar = new Avatar(image);
      avatar.setSource('data:image/png;');
      image.src.should.equal('data:image/png;');
      avatar.setSource('http://placekitten.com/200/300');
      image.src.should.equal('http://placekitten.com/200/300');
      avatar.setSource();
      image.src.should.equal('http://placekitten.com/200/300');
    });
  });

  describe('#initialAvatar', function () {
    it('should return a PNG from element size', function () {
      avatar = new Avatar(image);
      var png = avatar.initialAvatar('MC');
      png.should.match(/^data:image\/png;base64,iV/);
    });

    it('should return a PNG from the size setting', function () {
      avatar = new Avatar(image, { size: 60 });
      var png = avatar.initialAvatar('MC');
      png.should.match(/^data:image\/png;base64,iV/);
    });
  });

  describe('#githubAvatar', function () {
    it('should return a GitHub Avatar URL via instance', function () {
      avatar = new Avatar(image, {
        useGravatar: false,
        github_id: 67945,
        size: 80
      });
      avatar.element.src.should.match(/https:\/\/avatars[0-3].githubusercontent.com\/u\/[0-9]{1,}\?v=3&s=[0-9]{1,4}/i);
    });

    it('should return a GitHub Avatar URL', function () {
      var github_url = Avatar.githubAvatar({
        github_id: 67945,
        size: 80
      });
      github_url.should.match(/https:\/\/avatars[0-3].githubusercontent.com\/u\/[0-9]{1,}\?v=3&s=[0-9]{1,4}/i);
    });

    it('should rnot throw an error with no settings', function () {
      var github_url = Avatar.githubAvatar();
      github_url.should.match(/https:\/\/avatars[0-3].githubusercontent.com\/u\/[0-9]{1,}\?v=3&s=[0-9]{1,4}/i);
    });
  });

  describe('#avatarsioAvatar', function () {
    it('should work as a static method', function () {
      var github_url = Avatar.avatarsioAvatar();
      github_url.should.equal('http://avatars.io/');
    });

    it('should return an Avatars.io Avatar URL', function () {
      avatar = new Avatar(image, {
        useGravatar: false,
        use_avatars_io: true,
        avatars_io: {
          user_id: 12345,
          identifier: 'custom-id',
          size: 'small'
        }
      });
      avatar.element.src.should.equal('http://avatars.io/12345/custom-id?size=small');
    });

    it('should return an Avatars.io Avatar URL with a custom size', function () {
      avatar = new Avatar(image, {
        useGravatar: false,
        use_avatars_io: true,
        avatars_io: {
          user_id: 12345,
          identifier: 'custom-id',
          size: 'medium'
        }
      });
      avatar.element.src.should.equal('http://avatars.io/12345/custom-id?size=medium');
    });

    it('should return an Avatars.io Facebook Avatar URL', function () {
      avatar = new Avatar(image, {
        useGravatar: false,
        use_avatars_io: true,
        avatars_io: {
          facebook: 'matthew.callis',
          size: 'small'
        }
      });
      avatar.element.src.should.equal('http://avatars.io/facebook/matthew.callis?size=small');
    });

    it('should return an Avatars.io Twitter Avatar URL', function () {
      avatar = new Avatar(image, {
        useGravatar: false,
        use_avatars_io: true,
        avatars_io: {
          twitter: 'superfamicom',
          size: 'small'
        }
      });
      avatar.element.src.should.equal('http://avatars.io/twitter/superfamicom?size=small');
    });

    it('should return an Avatars.io Instagram Avatar URL', function () {
      avatar = new Avatar(image, {
        useGravatar: false,
        use_avatars_io: true,
        avatars_io: {
          instagram: 'matthewcallis',
          size: 'small'
        }
      });
      avatar.element.src.should.equal('http://avatars.io/instagram/matthewcallis?size=small');
    });
  });

  describe('#gravatarUrl', function () {
    it('should return a Gravatar URL as a static method', function () {
      var url = Avatar.gravatarUrl();
      url.should.equal('https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x');
    });

    it('should return a Gravatar URL with an email address', function () {
      avatar = new Avatar(image, {
        allowGravatarFallback: true,
        email: 'test@test.com'
      });
      avatar.element.src.should.equal('https://secure.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=80&d=mm&r=x');
    });

    it('should return a Gravatar URL with an hash', function () {
      avatar = new Avatar(image, {
        allowGravatarFallback: true,
        hash: 'b642b4217b34b1e8d3bd915fc65c4452'
      });
      avatar.element.src.should.equal('https://secure.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=80&d=mm&r=x');
    });

    it('should return a Gravatar URL with nothing', function () {
      avatar = new Avatar(image, { allowGravatarFallback: true });
      avatar.element.src.should.equal('https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x');
    });

    it('should return a Gravatar URL with a custom size', function () {
      avatar = new Avatar(image, {
        allowGravatarFallback: true,
        size: 100
      });
      avatar.element.src.should.equal('https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=100&d=mm&r=x');
    });

    it('should return a Gravatar URL with a custom size (string)', function () {
      avatar = new Avatar(image, {
        allowGravatarFallback: true,
        size: '100'
      });
      avatar.element.src.should.equal('https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=100&d=mm&r=x');
    });

    it('should return a Gravatar URL with a minimum size of 80px', function () {
      avatar = new Avatar(image, {
        allowGravatarFallback: true,
        size: 0
      });
      avatar.element.src.should.equal('https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x');
    });

    it('should return a Gravatar URL with a maximum size of 2048px', function () {
      avatar = new Avatar(image, {
        allowGravatarFallback: true,
        size: 4000
      });
      avatar.element.src.should.equal('https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x');
    });

    it('should return a Gravatar URL with a custom fallback', function () {
      avatar = new Avatar(image, {
        allowGravatarFallback: true,
        fallback: 'test'
      });
      avatar.element.src.should.equal('https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=test&r=x');
    });

    it('should return a Gravatar URL with a custom rating', function () {
      avatar = new Avatar(image, {
        allowGravatarFallback: true,
        rating: 'g'
      });
      avatar.element.src.should.equal('https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=g');
    });

    it('should return a Gravatar URL with a forced default', function () {
      avatar = new Avatar(image, {
        allowGravatarFallback: true,
        forcedefault: true
      });
      avatar.element.src.should.equal('https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x&f=y');
    });
  });

  describe('#gravatarValid', function () {
    var call_spy = void 0;
    var error_spy = void 0;
    var load_spy = void 0;

    describe('Invalid Gravatar Hash', function () {
      it('should return an error', function () {
        avatar = new Avatar(image, {
          useGravatar: true,
          hash: '00000000000000000000000000000000'
        });
        call_spy = sinon.spy(avatar, 'gravatarValid');
        load_spy = sinon.spy(avatar, 'gravatarValidOnLoad');
        error_spy = sinon.spy(avatar, 'gravatarValidOnError');
        avatar.gravatarValid({
          hash: '00000000000000000000000000000000'
        });

        setTimeout(function () {
          call_spy.callCount.should.equal(1);
          load_spy.callCount.should.equal(0);
          error_spy.callCount.should.equal(1);
        }, gravatar_timeout);
      });
    });

    describe('Valid Gravatar Hash', function () {
      it('should not return an error', function () {
        avatar = new Avatar(image, {
          useGravatar: true,
          hash: '12929016fffb0b3af98bc440acf0bfe2'
        });
        call_spy = sinon.spy(avatar, 'gravatarValid');
        load_spy = sinon.spy(avatar, 'gravatarValidOnLoad');
        error_spy = sinon.spy(avatar, 'gravatarValidOnError');
        avatar.gravatarValid({
          hash: '12929016fffb0b3af98bc440acf0bfe2'
        });

        setTimeout(function () {
          call_spy.callCount.should.equal(1);
          load_spy.callCount.should.equal(1);
          error_spy.callCount.should.equal(0);
        }, gravatar_timeout);
      });
    });

    describe('Invalid Gravatar Email', function () {
      it('should return an error', function () {
        avatar = new Avatar(image, {
          useGravatar: true,
          email: 'test@test.com'
        });
        call_spy = sinon.spy(avatar, 'gravatarValid');
        load_spy = sinon.spy(avatar, 'gravatarValidOnLoad');
        error_spy = sinon.spy(avatar, 'gravatarValidOnError');
        avatar.gravatarValid({
          email: 'test@test.com'
        });

        setTimeout(function () {
          call_spy.callCount.should.equal(1);
          load_spy.callCount.should.equal(0);
          error_spy.callCount.should.equal(1);
        }, gravatar_timeout);
      });
    });

    describe('Valid Gravatar Email', function () {
      it('should not return an error', function () {
        avatar = new Avatar(image, {
          useGravatar: true,
          email: 'matthew@apptentive.com'
        });
        call_spy = sinon.spy(avatar, 'gravatarValid');
        load_spy = sinon.spy(avatar, 'gravatarValidOnLoad');
        error_spy = sinon.spy(avatar, 'gravatarValidOnError');
        avatar.gravatarValid({
          email: 'matthew@apptentive.com'
        });

        setTimeout(function () {
          call_spy.callCount.should.equal(1);
          load_spy.callCount.should.equal(1);
          error_spy.callCount.should.equal(0);
        }, gravatar_timeout);
      });
    });
  });

  describe('#gravatarValidOnLoad', function () {
    var call_spy = void 0;
    var load_spy = void 0;
    call_spy = load_spy = null;

    it('should call gravatarUrl with settings', function () {
      avatar = new Avatar(image, {
        useGravatar: false
      });
      call_spy = sinon.spy(avatar, 'gravatarValidOnLoad');
      load_spy = sinon.spy(avatar, 'setSource');
      avatar.gravatarValidOnLoad();

      setTimeout(function () {
        call_spy.callCount.should.equal(1);
        load_spy.callCount.should.equal(1);
      }, gravatar_timeout);
    });
  });

  describe('#gravatarValidOnError', function () {
    var call_spy = void 0;
    var init_spy = void 0;
    var load_spy = void 0;

    beforeEach(function () {
      avatar = new Avatar(image, {
        useGravatar: false
      });
      call_spy = sinon.spy(avatar, 'gravatarValidOnError');
      load_spy = sinon.spy(avatar, 'setSource');
      init_spy = sinon.spy(avatar, 'initialAvatar');
    });

    it('should draw an avatar if we have initials', function () {
      avatar.settings.initials = 'MCFUCKYEAH';
      avatar.gravatarValidOnError();
      call_spy.callCount.should.equal(1);
      load_spy.callCount.should.equal(1);
      init_spy.callCount.should.equal(1);
    });

    it('should use the fallback image without initials', function () {
      avatar.settings.initials = '';
      avatar.gravatarValidOnError();
      call_spy.callCount.should.equal(1);
      load_spy.callCount.should.equal(1);
      init_spy.callCount.should.equal(0);
    });
  });

  describe('Issue #5', function () {
    it('should build the image data for a hidden image', function () {
      var options = {
        useGravatar: false,
        initials: 'f',
        initial_bg: '#FF5C45',
        initial_fg: 'white',
        size: 80
      };
      $('#avatar-1').removeAttr('height');
      $('#avatar-1').removeAttr('width');
      $('#avatar-1').hide();
      avatar = new Avatar(image, options);
      image.src.length.should.be.at.least(24);
    });
  });

  describe('#md5', function () {
    it('should match RFC 1321', function () {
      md5('').should.equal('d41d8cd98f00b204e9800998ecf8427e');
      md5('a').should.equal('0cc175b9c0f1b6a831c399e269772661');
      md5('abc').should.equal('900150983cd24fb0d6963f7d28e17f72');
      md5('message digest').should.equal('f96b697d7cb7938d525a2f31aaf161d0');
      md5('abcdefghijklmnopqrstuvwxyz').should.equal('c3fcd3d76192e4007dfb496cca67e13b');
      md5('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789').should.equal('d174ab98d277d9f5a5611c2c9f419d9f');
      md5('12345678901234567890123456789012345678901234567890123456789012345678901234567890').should.equal('57edf4a22be3c955ac49da2e2107b67a');
    });
  });

  describe('#jQueryHelper', function () {
    it('should create an avatar with options', function () {
      $('#avatar-1').avatar({
        useGravatar: false,
        initials: 'MC'
      });
      $('#avatar-1').attr('src').should.match(/^data:image\/png;base64,iV/);
    });
  });
});