import request from 'request'
import gju from 'geojson-utils'
import mailgun from 'mailgun-js'

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

export async function sendErrorEmail(subject, text) {
  // XXX: DO NOT PUT API KEY IN SRC CODE IN PROD
  const apiKey = 'key-0581405a6a7cc054db09a93141ad6544'
  const domain = 'sandboxd1bddbf67c514f94a6849ed21a670f15.mailgun.org'
  const mailer = mailgun({apiKey, domain})
  const data = {
    from: 'Error Reporter <postmaster@sandboxd1bddbf67c514f94a6849ed21a670f15.mailgun.org>',
    to: 'tonyx.ca@gmail.com',
    subject,
    text,
  }
  return await mailer.messages().send(data)
}
