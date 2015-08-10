var config = {
  name: 'Miami-Dade County',
  latitude: 25.7667,
  longitude: -80.2000,
  regionBias: '25.25,-80|26,-79',//'35.773258,-115.642090|36.469890,-114.636840', //25.7667° N, 80.2000° W
  initialZoom: 13,
  finalZoom: 14,
  fileName: '/data/region.geojson',
  tagline: 'Are you getting city services from a city, or from Miami-Dade County?',
  about: 'Miami-Dade County is the seventh largest county in the nation with 34 municipalities, but also an unincorporated municipal service area (UMSA) that services more than a million people. Use this app to figure out whether an address is in a city or within UMSA!',
  responseYes: 'You are living inside a Miami-Dade municipality.',
  responseNo: 'You\'re living in an unincorporated area of the county.',
  examples: [
    '90 NW 29th Street',
    '9806 NE 2nd Ave',
    '8821 SW 136th Street'
  ]
}

module.exports = config
