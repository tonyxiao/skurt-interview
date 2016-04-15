var assert = require('chai').assert
var gju = require('geojson-utils')

describe('geojson', function () {
  it('Should include point on the corner of polygon', function () {
    const pointIn = gju.pointInPolygon({
        "type": "Point",
        "coordinates": [0, 0]
    }, {
        "type": "Polygon",
        "coordinates": [
            [
                [0, 0],
                [6, 0],
                [6, 6],
                [0, 6]
            ]
        ]
    })
    assert.equal(true, pointIn)
  })
  it('Should include point on the edge of polygon', function () {
    const pointIn = gju.pointInPolygon({
        "type": "Point",
        "coordinates": [0, 3]
    }, {
        "type": "Polygon",
        "coordinates": [
            [
                [0, 0],
                [6, 0],
                [6, 6],
                [0, 6]
            ]
        ]
    })
    assert.equal(true, pointIn)
  })
  it('Should exclude point outside the polygon', function () {
    const pointIn = gju.pointInPolygon({
        "type": "Point",
        "coordinates": [0, 33]
    }, {
        "type": "Polygon",
        "coordinates": [
            [
                [0, 0],
                [6, 0],
                [6, 6],
                [0, 6]
            ]
        ]
    })
    assert.equal(false, pointIn)
  })
})
