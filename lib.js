import request from 'request'
import gju from 'geojson-utils'
import mailgun from 'mailgun-js'

async function getJson(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        try {
          resolve(JSON.parse(body))
        } catch (err) {
          reject(err)
        }
      }
    })
  })
}

export async function isCarInBound(apiUrl, carId) {
  const json = await getJson(`${apiUrl}${carId}`)
  return gju.pointInPolygon(json['features'][0]['geometry'], json['features'][1]['geometry'])
}

export async function areCarsInBound(apiUrl, carIds) {
  const resultPromises = carIds.map((carId) => isCarInBound(apiUrl, carId))
  const results = await Promise.all(resultPromises)

  // does the job...
  var resultsByCarId = []
  carIds.forEach((carId, index) => {
    resultsByCarId.push({carId, inBound: results[index]})
  })
  return resultsByCarId
}

export async function sendErrorEmail(recipient, subject, text) {
  // XXX: DO NOT PUT API KEY IN SRC CODE IN PROD
  const apiKey = 'key-0581405a6a7cc054db09a93141ad6544'
  const domain = 'sandboxd1bddbf67c514f94a6849ed21a670f15.mailgun.org'
  const mailer = mailgun({apiKey, domain})
  const data = {
    from: 'Tony Xiao Error Reporter <postmaster@sandboxd1bddbf67c514f94a6849ed21a670f15.mailgun.org>',
    to: recipient,
    subject,
    text,
  }
  return await mailer.messages().send(data)
}

export async function checkCarsAndSendError(apiUrl, errorRecipient, carIds) {
  console.log(`${new Date()} Checking car with ids: ${carIds}`)
  try {
    const results = await areCarsInBound(apiUrl, carIds)
    const outOfBoundCars = results
      .filter((result) => result.inBound === false)
      .map((result) => result.carId)
      
    if (outOfBoundCars.length === 0) {
      console.log('No cars are out of bounds')
    } else {
      console.log(`${outOfBoundCars.length} cars are out of bounds: ${outOfBoundCars}. Will send error email`)
      await sendErrorEmail(
        errorRecipient,
        `ALERT: ${outOfBoundCars.length} are out of bounds`,
        `Please check car with the following ids: ${outOfBoundCars}`
      )
    }
  } catch (err) {
    console.log('Error occured while checking cars in bounds, will send error email', err)
    // TODO: If the email sending service itself fails we can be in trouble. Be more resilient
    await sendErrorEmail(
      errorRecipient,
      'ERROR: Error while checking whether cars are in bounds',
      `Error Details: ${err}`
    )
  }
}
