describe "Avatar", ->
  # Globals
  avatar = image = load_spy = error_spy = null

  before ->
    # DOM Setup
    # document.body.innerHTML = ''
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
    it 'should render', ->
      avatar = new Avatar(image)
      avatar.settings.useGravatar.should.be.true

    it 'should allow options', ->
      avatar = new Avatar(image, useGravatar: false)
      avatar.settings.useGravatar.should.not.be.true

    it 'should render a canvas', ->
      avatar = new Avatar(image, initials: 'MC')
      avatar.settings.useGravatar.should.be.true

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

  describe '#initialAvatar', ->
    beforeEach ->
      avatar = new Avatar(image)

    it 'should return a PNG', ->
      png = avatar.initialAvatar('MC', avatar.settings)
      png.should.match(/^data:image\/png;base64,iV/)

  describe '#gravatarUrl', ->
    it 'should return a Gravatar URL with an email address', ->
      avatar = new Avatar(image, email: 'test@test.com')
      url = avatar.gravatarUrl(avatar.settings)
      url.should.equal 'https://secure.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=80&d=mm&r=x'

    it 'should return a Gravatar URL with an hash', ->
      avatar = new Avatar(image, hash: 'b642b4217b34b1e8d3bd915fc65c4452')
      url = avatar.gravatarUrl(avatar.settings)
      url.should.equal 'https://secure.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=80&d=mm&r=x'

    it 'should return a Gravatar URL with nothing', ->
      avatar = new Avatar(image)
      url = avatar.gravatarUrl(avatar.settings)
      url.should.equal 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=x'

    it 'should return a Gravatar URL with a custom size', ->
      avatar = new Avatar(image, size: 100)
      url = avatar.gravatarUrl(avatar.settings)
      url.should.equal 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=100&d=mm&r=x'

      avatar = new Avatar(image, size: '100')
      url = avatar.gravatarUrl(avatar.settings)
      url.should.equal 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=100&d=mm&r=x'

    it 'should return a Gravatar URL with a custom fallback', ->
      avatar = new Avatar(image, fallback: 'test')
      url = avatar.gravatarUrl(avatar.settings)
      url.should.equal 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=test&r=x'

    it 'should return a Gravatar URL with a custom rating', ->
      avatar = new Avatar(image, rating: 'g')
      url = avatar.gravatarUrl(avatar.settings)
      url.should.equal 'https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&d=mm&r=g'

  # Spies aren't being called.
  # describe '#gravatarValid', ->
  #   beforeEach ->
  #     avatar = new Avatar(image, useGravatar: false)
  #     load_spy = sinon.spy()
  #     error_spy = sinon.spy()
  #
  #   it 'should return an error for an invalid Gravatar URL', ->
  #     avatar.gravatarValid('https://secure.gravatar.com/avatar/00000000000000000000000000000000?s=80&r=x', load_spy, error_spy)
  #     load_spy.callCount.should.equal 0
  #     error_spy.callCount.should.equal 1
  #
  #   it 'should not return an error for a valid Gravatar URL', ->
  #     avatar.gravatarValid('https://secure.gravatar.com/avatar/12929016fffb0b3af98bc440acf0bfe2?s=80&r=x', load_spy, error_spy)
  #     load_spy.callCount.should.equal 1
  #     error_spy.callCount.should.equal 0
  #
  #   it 'should return an error for an invalid Gravatar hash', ->
  #     avatar.gravatarValid('00000000000000000000000000000000', load_spy, error_spy)
  #     load_spy.callCount.should.equal 0
  #     error_spy.callCount.should.equal 1
  #
  #   it 'should not return an error for a valid Gravatar hash', ->
  #     avatar.gravatarValid('12929016fffb0b3af98bc440acf0bfe2', load_spy, error_spy)
  #     load_spy.callCount.should.equal 1
  #     error_spy.callCount.should.equal 0
  #
  #   it 'should return an error for an invalid Gravatar email', ->
  #     avatar.gravatarValid('test@test.com', load_spy, error_spy)
  #     load_spy.callCount.should.equal 0
  #     error_spy.callCount.should.equal 1
  #
  #   it 'should not return an error for a valid Gravatar email', ->
  #     avatar.gravatarValid('matthew@apptentive.com', load_spy, error_spy)
  #     load_spy.callCount.should.equal 1
  #     error_spy.callCount.should.equal 0

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

      output = avatar.merge(defaults, options)
      output.should.deep.equal options

  describe 'jQuery Helper', ->
    it 'should create an avatar with options', ->
      $('#avatar-1').avatar
        useGravatar: false
        initials: 'MC'
      # Use match because this will very depending on `window.devicePixelRatio`
      $('#avatar-1').attr('src').should.match(/^data:image\/png;base64,iV/)
