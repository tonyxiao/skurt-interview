import request from 'request'
import gju from 'geojson-utils'

async function getJson(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(body))
      }
    })
  })
}

export async function isCarInBound(carId) {
  const json = await getJson(`http://skurt-interview-api.herokuapp.com/carStatus/${carId}`)
  return gju.pointInPolygon(json['features'][0]['geometry'], json['features'][1]['geometry'])
}

export async function areCarsInBound(carIds) {
  const resultPromises = carIds.map((carId) => isCarInBound(carId))
  const results = await Promise.all(resultPromises)

  // does the job...
  var resultsByCarId = {}
  carIds.forEach((carId, index) => {
    resultsByCarId[carId] = results[index]
  })
  return resultsByCarId
}
