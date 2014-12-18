class Avatar
  defaults =
    useGravatar: true
    useInitials: true
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

  constructor: (element, options = {}) ->
    throw new Error('No image element provided.')  unless element?
    @element = element
    @settings = @merge(defaults, options)

    if @settings.useGravatar and @settings.allowGravatarFallback
      @setSource @gravatarUrl(@settings)
    else if @settings.useGravatar
      @gravatarValid(@settings.hash or @settings.email,
        =>
          @setSource @gravatarUrl(@settings)
        ,
        =>
          if @settings.initials.length > 0
            @setSource @initialAvatar(@settings)
          else
            @setSource @settings.fallbackImage
      )
    else
      if @settings.initials.length > 0
        @setSource @initialAvatar(@settings)
      else
        @setSource @settings.fallbackImage

  setSource: (source) ->
    @element.src = source  if source
    return

  initialAvatar: (options) ->
    canvas = document.createElement('canvas')
    context = canvas.getContext('2d')
    width = @element.width
    height = @element.height
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

  gravatarUrl: (options) ->
    options = @merge(defaults, options)
    options.size = (if (options.size >= 1 and options.size <= 2048) then options.size else 80)
    email_or_hash = options.hash or options.email
    email_or_hash = '00000000000000000000000000000000'  if not email_or_hash or typeof email_or_hash isnt 'string'
    email_or_hash = email_or_hash.toLowerCase().trim()
    [
      'https://secure.gravatar.com/avatar/'
      (if email_or_hash.match(/@/g) isnt null then md5(email_or_hash) else email_or_hash)
      "?s=#{options.size}"
      "&d=#{encodeURIComponent(options.fallback)}"
      "&r=#{options.rating}"
      (if options.forcedefault then '&f=y' else '')
    ].join ''

  gravatarValid: (email_or_hash_or_url = '', on_load, on_error) ->
    if /^(http|https):/i.test(email_or_hash_or_url)
      email_or_hash_or_url = "#{email_or_hash_or_url}?d=404"
    else
      if not email_or_hash_or_url or typeof email_or_hash_or_url isnt 'string'
        email_or_hash_or_url = ''
      else if email_or_hash_or_url.indexOf("@") isnt -1
        email_or_hash_or_url = md5(email_or_hash_or_url)

      email_or_hash_or_url = "https://secure.gravatar.com/avatar/#{email_or_hash_or_url}?d=404"

    image = new Image()

    image.onload = on_load
    image.onerror = on_error

    image.src = email_or_hash_or_url

    return

  merge: (input, options) ->
    output = JSON.parse(JSON.stringify(input))
    output[k] = v  for k, v of options
    output

(exports ? window).Avatar = Avatar

unless typeof jQuery is 'undefined'
  jQuery.fn['avatar'] = (options) ->
    @each ->
      unless jQuery.data(this, 'plugin_avatar')
        jQuery.data this, 'plugin_avatar', new Avatar(this, options)
      return
  return
