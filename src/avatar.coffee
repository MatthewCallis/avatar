class Avatar
  defaults =
    useGravatar: true
    allowGravatarFallback: false
    initials: ''
    initial_fg: '#888888'
    initial_bg: '#f4f6f7'
    initial_size: null
    initial_weight: 100
    initial_font_family: "'Lato', 'Lato-Regular', 'Helvetica Neue'"
    hash: null
    email: null
    size: 80
    fallback: 'mm'
    rating: 'x'
    forcedefault: false
    fallbackImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBmaWxsPSIjYmNjN2NlIiBkPSJNMCAwaDYwdjYwaC02MHoiLz48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNhNGIxYjkiIGQ9Ik0zMC4xIDU0LjhjLTYuNyAwLTEzLjEtMi44LTE3LjYtNy43bC0uNS0uNXYtMi42aC4yYy40LTQgMS42LTYuNyAzLjQtNy42IDEuMy0uNiAyLjktMS4xIDQuOS0xLjZ2LTFsMS0uM3MuNy0uMiAxLjctLjVjMC0uNS0uMS0uNy0uMS0uOS0uNi0xLTEuNS0zLjMtMi4xLTZsLTEuNy0xLjQuMi0uOXMuMi0uOSAwLTEuOWMtLjItLjkuMS0xLjUuMy0xLjguMy0uMy42LS41IDEtLjYuMy0xLjYuOS0zLjEgMS43LTQuMy0xLjMtMS41LTEuNy0yLjYtMS41LTMuNS4yLS45IDEtMS41IDEuOS0xLjUuNyAwIDEuMy4zIDEuOS42LjMtLjcuOS0xLjEgMS43LTEuMS43IDAgMS40LjQgMi40LjguNS4zIDEuMi42IDEuNi43IDMuNC4xIDcuNiAyLjIgOC45IDcuNi4zLjEuNi4zLjguNS40LjUuNSAxLjEuMyAxLjktLjIgMS4yIDAgMi40IDAgMi40bC4yLjgtMS4yIDEuMmMtLjUgMi44LTEuNiA1LjQtMi4yIDYuNS0uMS4xLS4xLjQtLjEuOCAxIC4zIDEuNy41IDEuNy41bDEgLjR2LjhjMi41LjUgNC42IDEuMSA2LjEgMS45IDEuOC45IDIuOSAzLjUgMy40IDcuOGwuMS42LS40LjVjLTQuNiA1LjktMTEuNSA5LjQtMTkgOS40eiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik00NS40IDM2LjhjLTEuNS0uOC0zLjktMS41LTctMnYtLjlzLTEtLjQtMi42LS43Yy0uMi0uOC0uMy0yIC4yLTIuOC41LS45IDEuNy0zLjYgMi4xLTYuNWwuOS0uOXMtLjMtMS40IDAtM2MuMi0uOS0uNC0uNy0uOS0uNS0uOS03LjEtNi4zLTcuNy03LjgtNy43LTEuNC0uMi0zLjktMi4yLTQuMS0xLjMtLjEuOSAxLjIgMS44LS40IDEuNC0xLjYtLjQtMy4xLTEuOC0zLjMtLjgtLjIuNyAxLjIgMi4zIDIgMy4xLTEuMiAxLjMtMi4xIDMuMi0yLjQgNi4xLS41LS4zLTEuNC0uNy0xLjEuMi4zIDEuMyAwIDIuNiAwIDIuNmwxLjQgMS4yYy41IDIuNyAxLjUgNS4xIDIgNiAuNS44LjMgMi4xLjIgMi44LTEuNS4zLTIuNi43LTIuNi43djEuMmMtMi41LjUtNC40IDEuMS01LjggMS43LTIgMS0yLjYgNS43LTIuNyA3Ljl2LjRjNC4xIDQuNCAxMCA3LjIgMTYuNSA3LjIgNy4zIDAgMTMuNy0zLjUgMTcuOC04LjgtLjEtMi4zLS44LTUuNy0yLjQtNi42eiIvPjwvZz48L3N2Zz4='
    github_id: null
    use_avatars_io: false
    avatars_io:
      user_id: null
      identifier: null
      twitter: null
      facebook: null
      instagram: null
      size: 'medium'

  constructor: (element, options = {}) ->
    throw new Error('No image element provided.')  unless element?
    @element = element
    @settings = @merge(defaults, options)

    if @settings.useGravatar and @settings.allowGravatarFallback
      @setSource @gravatarUrl(@settings)
    else if @settings.useGravatar
      @gravatarValid @settings

    else if @settings.use_avatars_io and (@settings.avatars_io.user_id? or @settings.avatars_io.twitter? or @settings.avatars_io.facebook? or @settings.avatars_io.instagram?)

      @setSource @avatarsioAvatar(@settings)

    else if @settings.github_id
      @setSource @githubAvatar(@settings)
    else if @settings.initials.length > 0
      @setSource @initialAvatar(@settings)
    else
      @setSource @settings.fallbackImage

  setSource: (source) ->
    @element.src = source  if source
    return

  initialAvatar: (options) ->
    canvas = document.createElement('canvas')
    return  unless canvas.getContext and canvas.getContext('2d')
    context = canvas.getContext('2d')
    width = @element.width or options.size
    height = @element.height or options.size
    x = width / 2
    y = height / 2
    font_size = options.initial_size or height / 2

    canvas.width = width * window.devicePixelRatio
    canvas.height = height * window.devicePixelRatio
    canvas.style.width = "#{width}px"
    canvas.style.height = "#{height}px"

    context.scale window.devicePixelRatio, window.devicePixelRatio
    context.rect 0, 0, canvas.width, canvas.height
    context.fillStyle = options.initial_bg
    context.fill()

    context.font         = "#{options.initial_weight} #{font_size}px #{options.initial_font_family}"
    context.textAlign    = 'center'
    context.textBaseline = 'middle'
    context.fillStyle    = options.initial_fg
    context.fillText options.initials, x, y

    canvas.toDataURL('image/png')

  githubAvatar: (options) ->
    cdn_min = 0
    cdn_max = 3
    cdn = Math.floor(Math.random() * (cdn_max - cdn_min + 1)) + cdn_min

    "https://avatars#{cdn}.githubusercontent.com/u/#{options.github_id}?v=3&s=#{options.size}"

  avatarsioAvatar: (options) ->
    avatars_io_url = 'http://avatars.io/'

    if options.avatars_io.user_id and options.avatars_io.identifier
      avatars_io_url += "#{options.avatars_io.user_id}/#{options.avatars_io.identifier}"
    else if options.avatars_io.twitter
      avatars_io_url += "twitter/#{options.avatars_io.twitter}"
    else if options.avatars_io.facebook
      avatars_io_url += "facebook/#{options.avatars_io.facebook}"
    else if options.avatars_io.instagram
      avatars_io_url += "instagram/#{options.avatars_io.instagram}"

    avatars_io_url += "?size=#{options.avatars_io.size}"

    avatars_io_url

  gravatarUrl: (options) ->
    options = @merge(defaults, options)
    options.size = (if (options.size >= 1 and options.size <= 2048) then options.size else 80)
    email_or_hash = options.hash or options.email
    email_or_hash = '00000000000000000000000000000000'  if not email_or_hash or typeof email_or_hash isnt 'string'
    email_or_hash = email_or_hash.toLowerCase().trim()
    [
      'https://secure.gravatar.com/avatar/'
      (if email_or_hash.match(/@/g) isnt null then @md5(email_or_hash) else email_or_hash)
      "?s=#{options.size}"
      "&d=#{encodeURIComponent(options.fallback)}"
      "&r=#{options.rating}"
      (if options.forcedefault then '&f=y' else '')
    ].join ''

  gravatarValid: (options) ->
    return  unless options.email or options.hash

    if options.email
      image_source = "https://secure.gravatar.com/avatar/#{@md5(options.email)}?d=404"

    if options.hash
      image_source = "https://secure.gravatar.com/avatar/#{options.hash}?d=404"

    image = new Image()

    image.onload  = @gravatarValidOnLoad
    image.onerror = @gravatarValidOnError

    image.src = image_source

    return

  gravatarValidOnLoad: =>
    @setSource @gravatarUrl(@settings)

  gravatarValidOnError: =>
    if @settings.initials.length > 0
      @setSource @initialAvatar(@settings)
    else
      @setSource @settings.fallbackImage

  merge: (input, options) ->
    output = JSON.parse(JSON.stringify(input))
    output[k] = v  for k, v of options
    output

  md5: (string) ->
    if typeof md5 is 'function'
      md5 string
    else
      '00000000000000000000000000000000'

(exports ? this).Avatar = Avatar

if typeof jQuery isnt 'undefined'
  jQuery.fn['avatar'] = (options) ->
    @each ->
      unless jQuery.data(this, 'plugin_avatar')
        jQuery.data this, 'plugin_avatar', new Avatar(this, options)
      return
  return
