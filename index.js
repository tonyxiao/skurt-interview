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

async function isCarInBound(carId) {
  const json = await getJson(`http://skurt-interview-api.herokuapp.com/carStatus/${carId}`)
  return gju.pointInPolygon(json['features'][0]['geometry'], json['features'][1]['geometry'])
}

async function main() {
  try {
    const carId = 2
    const inBounds = await isCarInBound(carId)
    console.log(`Car number ${carId} is inBounds=${inBounds}`)
  } catch (err) {
    console.log(err)
  }
}

main()
