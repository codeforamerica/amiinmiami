var config = {
  name: 'Miami',
  latitude: 25.7667,
  longitude: -80.2000,
  regionBias: '25.25,-80|26,-79',//'35.773258,-115.642090|36.469890,-114.636840', //25.7667° N, 80.2000° W
  initialZoom: 13,
  finalZoom: 14,
  fileName: '/data/region.geojson',
  tagline: 'Because there is more to Miami than you think there is.',
  about: 'Las Vegas is one of the most visited cities in the world, and yet its most famous destination &mdash; a 6.8km boulevard of extravagantly themed casinos commonly known as ‘The Strip’ &mdash; is actually located outside of Las Vegas city limits.  To add to the confusion, the city’s true borders are often jagged and full of small holes.  According to the U.S. Postal Service, local residents may still claim a Las Vegas address, even if they are under the jurisdiction of one of the surrounding unincorporated communities throughout Clark County.  As a result, the City of Las Vegas requires residents verify that they reside within city limits to receive city services.',
  responseYes: 'You are within city limits!',
  responseNo: 'You\'re UMSA or not in the County.',
  examples: [
    '90 NW 29th Street',
    '9806 NE 2nd Ave',
    '8821 SW 136th Street'
  ]
}

module.exports = config
