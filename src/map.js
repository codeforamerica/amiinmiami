'use strict'
/* global L, Modernizr */

var config = require('../config')
var MAP_ATTRIBUTION = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
var TILE_LAYER_URL = '//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
var MARKER_IMAGE_FILE = '/img/marker.svg'

// Retina tiles
if (window.devicePixelRatio > 1) {
  TILE_LAYER_URL = '//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}@2x.png'
}

// Fallback for no SVG support
if (!Modernizr.svg) {
  MARKER_IMAGE_FILE = '/img/marker.png'
}

var REGION_LAYER_STYLE = {
  color: '#f11',
  weight: 5,
  opacity: 0.1
}

var LeafletMap = function (json) {
  this.json = json;

  this.map = L.map('map', {
    dragging: false,
    touchZoom: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    closePopupOnClick: false,
    keyboard: false,
    zoomControl: false
  })

  this.markers = []
}

var markerIcon = L.icon({
  iconUrl: MARKER_IMAGE_FILE,
  shadowUrl: '/img/marker_shadow.png',

  iconSize: [36, 43], // size of the icon
  shadowSize: [100, 50],
  iconAnchor: [18, 43], // point of the icon which will correspond to marker's location
  shadowAnchor: [40, 44],
  popupAnchor: [0, -50] // point from which the popup should open relative to the iconAnchor
})

LeafletMap.prototype.render = function () {
  L.tileLayer(TILE_LAYER_URL, {
    attribution: MAP_ATTRIBUTION,
    maxZoom: 23
  }).addTo(this.map)

/*
  L.geoJson(this.json, {
    style: REGION_LAYER_STYLE
  }).addTo(this.map)
 */

  L.geoJson(this.json, {
    style: function() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      var randomcolor = "rgb("+r+" ,"+g+","+ b+")";
      return {
        color: randomcolor,
        weight: 5,
        opacity: 0.1
      };
    }
  }).addTo(this.map)


  this.reset()
}

LeafletMap.prototype.reset = function () {
  this.removeMarkers()
  this.setLocation(config.latitude, config.longitude, config.initialZoom)
  this.map.closePopup()
  this.map.dragging.disable()
}

LeafletMap.prototype.setLocation = function (lat, lng, zoom) {
  // This is a hack to slightly nudge
  // the center of the viewport so that
  // the popup could be shown in viewport!
  lat = lat + 0.01
  this.map.setView([lat, lng], zoom)
  this.map.dragging.enable()
  return true
}

LeafletMap.prototype.createMarker = function (lat, lng) {
  var marker = L.marker([lat, lng], {
    icon: markerIcon,
    clickable: false
  }).addTo(this.map)
  this.markers.push(marker)
  return true
}

LeafletMap.prototype.createPopup = function (lat, lng, answer, detail) {
  // Popup content
  var content = ''
  content += '<div class="popup-background"><svg class="svg-popup"><use xlink:href="#svg-popup"></svg></div>'
  content += '<h2>' + answer + '</h2><p>' + detail + '</p>'
  content += '<button id="reset-button">Again?</button>'

  // As of Leaflet 0.6+, autoPan is buggy and unreliable
  // (my guess? because we're overwriting a lot of that popup appearance style)
  L.popup({
    autoPan: false,
    closeButton: false
  })
  .setLatLng([lat, lng])
  .setContent(content)
  .openOn(this.map)
}

LeafletMap.prototype.removeMarkers = function () {
  for (var i = 0; i < this.markers.length; i++) {
    this.map.removeLayer(this.markers[i])
  }
  return true
}

module.exports = LeafletMap
