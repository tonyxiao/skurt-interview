import {isCarInBound, areCarsInBound, sendErrorEmail, checkCarsAndSendError} from './lib'

async function main() {
  try {
    // const carId = 2
    // const inBounds = await isCarInBound(carId)
    // console.log(`Car number ${carId} is inBounds=${inBounds}`)
    // const results = await areCarsInBound([1,2,3,4,5,6,7,8,9,10])
    // console.log('inbounds', results)
    await checkCarsAndSendError([1,2,3,4,5,6,7,8,9,10])
    console.log('done')
    // const subject = 'Hello Tony Xiao'
    // const body = 'Congratulations Tony Xiao, you just sent an email with Mailgun!  You are truly awesome!  You can see a record of this email in your logs: https://mailgun.com/cp/log .  You can send up to 300 emails/day from this sandbox server.  Next, you should add your own domain so you can send 10,000 emails/month for free.'
    // const res = await sendErrorEmail(subject, body)
    // console.log('res', res)
  } catch (err) {
    console.log(err)
  }
}




main()
