# Are we in iojs?
if require?
  sinon = require('sinon')
  sinonChai = require('sinon-chai')
  chai = require('chai')
  chaiAsPromised = require('chai-as-promised')
  jsdom = require('mocha-jsdom')
  Avatar = require('../build/avatar').Avatar
  md5 = require('MD5')

  should = chai.should()
  expect = chai.expect
  chai.should()
  chai.use(sinonChai)
  chai.use(chaiAsPromised)

  jsdom()
else
  Avatar = window.Avatar
  sinon  = window.sinon

describe "Avatar", ->
  # Globals
  avatar = image = null
  gravatar_timeout = 1600

  before ->
    # DOM Setup
    image = document.createElement('img')
    image.id = 'avatar-1'
    image.alt = ''
    image.name = 'avatar-1'
    image.width = 80
    image.height = 80
    document.body.appendChild image

    image = document.getElementById('avatar-1')

  afterEach ->
    avatar = null

  describe '#constructor', ->
    it 'should throw an error without an element', ->
      Avatar.should.throw(Error)
      Avatar.should.throw('No image element provided.')
      return

    it 'should render', ->
      avatar = new Avatar(image)
      avatar.settings.useGravatar.should.be.true
      return

    it 'should allow options', ->
      avatar = new Avatar(image, useGravatar: false)
      avatar.settings.useGravatar.should.not.be.true
      return

    it 'should allow Gravatar fallbacks', ->
      avatar = new Avatar(image, useGravatar: true, allowGravatarFallback: true)
      avatar.settings.useGravatar.should.be.true
      avatar.settings.allowGravatarFallback.should.be.true
      return

    it 'should render a canvas', ->
      avatar = new Avatar(image, useGravatar: false, initials: 'MC')
      avatar.settings.useGravatar.should.not.be.true
      avatar.settings.useGravatar.should.not.equal 'MC'
      return

  describe '#setSource', ->
    it 'should set the src attribute', ->
      avatar = new Avatar(image)

      avatar.setSource 'data:image/png;'
      image.src.should.equal 'data:image/png;'

      avatar.setSource 'http://placekitten.com/200/300'
      image.src.should.equal 'http://placekitten.com/200/300'

      # Setting the source to undefined should return, leaving it untouched.
      avatar.setSource()
      image.src.should.equal 'http://placekitten.com/200/300'
      return

  describe '#initialAvatar', ->
    beforeEach ->
      avatar = new Avatar(image)
      return

    # JSDOM doesn't support canvas properly, even with canvas.
    if window? and document.createElement('canvas').getContext and document.createElement('canvas').getContext('2d')
      it 'should return a PNG', ->
        png = avatar.initialAvatar('MC', avatar.settings)
        png.should.match(/^data:image\/png;base64,iV/)
        return

  describe '#githubAvatar', ->
    beforeEach ->
      avatar = new Avatar(image, { useGravatar: false, github_id: 67945 })
      return

    it 'should return a GitHub Avatar URL', ->
      github_url = avatar.githubAvatar(github_id: 67945, size: 80)
      github_url.should.match(/https:\/\/avatars[0-3].githubusercontent.com\/u\/67945\?v=3&s=[0-9]{1,4}/i)
      return

  describe '#avatarsioAvatar', ->
    it 'should return an Avatars.io Avatar URL', ->
      avatar = new Avatar(image, { useGravatar: false, use_avatars_io: true, avatars_io: { user_id: 12345, identifier: 'custom-id', size: 'small' } })
      github_url = avatar.avatarsioAvatar(avatars_io: { user_id: 12345, identifier: 'custom-id', size: 'small' })
      github_url.should.equal 'http://avatars.io/12345/custom-id?size=small'
      return

    it 'should return an Avatars.io Avatar URL with a custom size', ->
      avatar = new Avatar(image, { useGravatar: false, use_avatars_io: true, avatars_io: { user_id: 12345, identifier: 'custom-id', size: 'medium' } })
      github_url = avatar.avatarsioAvatar(avatars_io: { user_id: 12345, identifier: 'custom-id', size: 'medium' })
      github_url.should.equal 'http://avatars.io/12345/custom-id?size=medium'
      return

    it 'should return an Avatars.io Facebook Avatar URL', ->
      avatar = new Avatar(image, { useGravatar: false, use_avatars_io: true, avatars_io: { facebook: 'matthew.callis', size: 'small' } })
      github_url = avatar.avatarsioAvatar(avatars_io: { facebook: 'matthew.callis', size: 'small' })
      github_url.should.equal 'http://avatars.io/facebook/matthew.callis?size=small'
      return

    it 'should return an Avatars.io Twitter Avatar URL', ->
      avatar = new Avatar(image, { useGravatar: false, use_avatars_io: true, avatars_io: { twitter: 'superfamicom', size: 'small' } })
      github_url = avatar.avatarsioAvatar(avatars_io: { twitter: 'superfamicom', size: 'small' })
      github_url.should.equal 'http://avatars.io/twitter/superfamicom?size=small'
      return

    it 'should return an Avatars.io Instagram Avatar URL', ->
      avatar = new Avatar(image, { useGravatar: false, use_avatars_io: true, avatars_io: { instagram: 'matthewcallis', size: 'small' } })
      github_url = avatar.avatarsioAvatar(avatars_io: { instagram: 'matthewcallis', size: 'small' })
      github_url.should.equal 'http://avatars.io/instagram/matthewcallis?size=small'
      return

  describe '#gravatarUrl', ->
    it 'should return a Gravatar URL with an email address', ->
      avatar = new Avatar(image, email: 'test@test.com')
      avatar.md5 = md5  unless window and window.md5
      url = avatar.gravatarUrl(avatar.settings)
      url.should.equal 'https://secure.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=80&d=mm&r=x'
      return

    it 'should return a Gravatar URL with an hash', ->
      avatar = new Avatar(image, hash: 'b642b4217b34b1e8d3bd915fc65c4452')
      url = avatar.gravatarUrl(avatar.settings)
      url.should.equal 'https://secure.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=80&d=mm&r=x'
      return

    it 'should return a Gravatar URL with nothing', ->
      avatar = new Avatar(image)
      url = avatar.gravatarUrl(avatar.settings)
      url.should.equal 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x'
      return

    it 'should return a Gravatar URL with a custom size', ->
      avatar = new Avatar(image, size: 100)
      url = avatar.gravatarUrl(avatar.settings)
      url.should.equal 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=100&d=mm&r=x'

      avatar = new Avatar(image, size: '100')
      url = avatar.gravatarUrl(avatar.settings)
      url.should.equal 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=100&d=mm&r=x'

      avatar = new Avatar(image, size: 0)
      url = avatar.gravatarUrl(avatar.settings)
      url.should.equal 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x'

      avatar = new Avatar(image, size: 4000)
      url = avatar.gravatarUrl(avatar.settings)
      url.should.equal 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x'

      return

    it 'should return a Gravatar URL with a custom fallback', ->
      avatar = new Avatar(image, fallback: 'test')
      url = avatar.gravatarUrl(avatar.settings)
      url.should.equal 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=test&r=x'
      return

    it 'should return a Gravatar URL with a custom rating', ->
      avatar = new Avatar(image, rating: 'g')
      url = avatar.gravatarUrl(avatar.settings)
      url.should.equal 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=g'
      return

  if window? and window.Image?
    # Spies aren't being called.
    describe '#gravatarValid', ->
      this.timeout(16000)

      avatar = load_spy = error_spy = call_spy = null
      describe 'Invalid Gravatar Hash', ->
        before (done) ->
          avatar = new Avatar(image, useGravatar: true, hash: '00000000000000000000000000000000')
          call_spy  = sinon.spy(avatar, 'gravatarValid')
          load_spy  = sinon.spy(avatar, 'gravatarValidOnLoad')
          error_spy = sinon.spy(avatar, 'gravatarValidOnError')
          avatar.gravatarValid(hash: '00000000000000000000000000000000')
          setTimeout(done, gravatar_timeout)
          return

        it 'should return an error', ->
          call_spy.callCount.should.equal 1
          load_spy.callCount.should.equal 0
          error_spy.callCount.should.equal 1
          return

        return

      describe 'Valid Gravatar Hash', ->
        before (done) ->
          avatar = new Avatar(image, useGravatar: true, hash: '12929016fffb0b3af98bc440acf0bfe2')
          call_spy  = sinon.spy(avatar, 'gravatarValid')
          load_spy  = sinon.spy(avatar, 'gravatarValidOnLoad')
          error_spy = sinon.spy(avatar, 'gravatarValidOnError')
          avatar.gravatarValid(hash: '12929016fffb0b3af98bc440acf0bfe2')
          setTimeout(done, gravatar_timeout)
          return

        it 'should not return an error', ->
          call_spy.callCount.should.equal 1
          load_spy.callCount.should.equal 1
          error_spy.callCount.should.equal 0
          return

        return

      describe 'Invalid Gravatar Email', ->
        before (done) ->
          avatar = new Avatar(image, useGravatar: true, email: 'test@test.com')
          avatar.md5 = md5  unless window and window.md5
          call_spy  = sinon.spy(avatar, 'gravatarValid')
          load_spy  = sinon.spy(avatar, 'gravatarValidOnLoad')
          error_spy = sinon.spy(avatar, 'gravatarValidOnError')
          avatar.gravatarValid(email: 'test@test.com')
          setTimeout(done, gravatar_timeout)
          return

        it 'should return an error', ->
          call_spy.callCount.should.equal 1
          load_spy.callCount.should.equal 0
          error_spy.callCount.should.equal 1
          return

        return

      describe 'Valid Gravatar Email', ->
        before (done) ->
          avatar = new Avatar(image, useGravatar: true, email: 'matthew@apptentive.com')
          avatar.md5 = md5  unless window and window.md5
          call_spy  = sinon.spy(avatar, 'gravatarValid')
          load_spy  = sinon.spy(avatar, 'gravatarValidOnLoad')
          error_spy = sinon.spy(avatar, 'gravatarValidOnError')
          avatar.gravatarValid(email: 'matthew@apptentive.com')
          setTimeout(done, gravatar_timeout)
          return

        it 'should not return an error', ->
          call_spy.callCount.should.equal 1
          load_spy.callCount.should.equal 1
          error_spy.callCount.should.equal 0
          return

        return

  describe '#gravatarValidOnLoad', ->
    this.timeout(16000)
    call_spy = load_spy = null

    before (done) ->
      avatar = new Avatar(image, useGravatar: false)
      call_spy = sinon.spy(avatar, 'gravatarValidOnLoad')
      load_spy = sinon.spy(avatar, 'setSource')
      avatar.gravatarValidOnLoad()
      setTimeout(done, gravatar_timeout)
      return

    it 'should call gravatarUrl with settings', ->
      call_spy.callCount.should.equal 1
      load_spy.callCount.should.equal 1
      return

  describe '#gravatarValidOnError', ->
    call_spy = load_spy = init_spy = null

    beforeEach ->
      avatar = new Avatar(image, useGravatar: false)
      call_spy = sinon.spy(avatar, 'gravatarValidOnError')
      load_spy = sinon.spy(avatar, 'setSource')
      init_spy = sinon.spy(avatar, 'initialAvatar')
      return

    it 'should draw an avatar if we have initials', ->
      avatar.settings.initials = 'MCFUCKYEAH'
      avatar.gravatarValidOnError()
      call_spy.callCount.should.equal 1
      load_spy.callCount.should.equal 1
      init_spy.callCount.should.equal 1
      return

    it 'should use the fallback image without initials', ->
      avatar.settings.initials = ''
      avatar.gravatarValidOnError()
      call_spy.callCount.should.equal 1
      load_spy.callCount.should.equal 1
      init_spy.callCount.should.equal 0
      return

  describe '#merge', ->
    it 'should merge objects', ->
      avatar = new Avatar(image)

      defaults =
        useGravatar: true
        allowGravatarFallback: false
        initials: ''
        initial_fg: '#888'
        initial_bg: '#f4f6f7'
        initial_size: null
        initial_weight: 100
        initial_font_family: "'Lato', 'Lato-Regular', 'Helvetica Neue'"
        hash: '00000000000000000000000000000000'
        email: null
        size: 80
        fallback: 'mm'
        rating: 'x'
        forcedefault: false
        fallbackImage: ''
        debug: false
        github_id: null
        use_avatars_io: false
        avatars_io:
          user_id: null
          identifier: null
          twitter: null
          facebook: null
          instagram: null

      options =
        useGravatar: false
        allowGravatarFallback: true
        initials: 'MDC'
        initial_fg: '#111'
        initial_bg: '#222'
        initial_size: 1
        initial_weight: 2
        initial_font_family: 'Comic Sans'
        hash: '00000000000000000000000000000000'
        email: 'matthew@apptentive.com'
        size: 120
        fallback: 'mm'
        rating: 'pg'
        forcedefault: true
        fallbackImage: 'nah'
        debug: false
        github_id: 1
        use_avatars_io: true
        avatars_io:
          user_id: 1
          identifier: 2
          twitter: 3
          facebook: 4
          instagram: 5

      output = avatar.merge(defaults, options)
      output.should.deep.equal options
      return
    return

  if window? and window.md5?
    old_md5 = window.md5

    after ->
      window.md5 = old_md5
      return

    describe '#md5', ->
      it 'should have an md5 function', ->
        avatar = new Avatar(image)
        md5_sum = avatar.md5 'test'
        md5_sum.should.equal '098f6bcd4621d373cade4e832627b4f6'
        return

      it 'should fall back to a default when there is no global md5', ->
        window.md5 = null
        avatar = new Avatar(image)
        md5_sum = avatar.md5 'test'
        md5_sum.should.equal '00000000000000000000000000000000'
        return

  # jQuery requires a window with a document
  if typeof jQuery is 'function' and typeof window is 'object'
    describe '#jQueryHelper', ->
      it 'should create an avatar with options', ->
        $('#avatar-1').avatar
          useGravatar: false
          initials: 'MC'
        # Use match because this will vary depending on `window.devicePixelRatio`
        $('#avatar-1').attr('src').should.match(/^data:image\/png;base64,iV/)
        return
      return
