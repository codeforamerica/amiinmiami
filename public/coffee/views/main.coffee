class App.Views.Main extends Backbone.View

  el: "#main"

  initialize: () ->
    @map = new App.Views.Map
    @question = new App.Views.Question
    @answer = new App.Views.Answer
    @$header = $(@header)

    userLocation.on "location:withinlimits",  _.bind(@onWithinLimits, @)
    userLocation.on "location:outsidelimits", _.bind(@onOutsideLimits, @)

    $("#input-location").focus()

  onWithinLimits: () ->
    @displayAnswer("Yes")

  onOutsideLimits: () ->
    @displayAnswer("No")

  displayAnswer: (answer) ->
    @question.hide _.bind((() -> @answer.show(answer)), @)
    @map.refreshLocation()

  # Press Escape to reset
  $(document).keydown (e) ->
    if e.which is 27 and e.ctrlKey is false and e.metaKey is false
      @answer.hide
      @question.show
      @map.resetLocation