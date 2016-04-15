import {checkCarsAndSendError} from './lib'

const carIds = [1,2,3,4,5,6,7,8,9,10]

// Native algorithm to just pull every minute
// More sophisticated production system will include things like exponential backoff on 
// failure, and TCP-style congestion control.
const seconds = 60
// const errorRecipient = 'tonyx.ca@gmail.com' // Uncomment for testing
const errorRecipient = 'engineering@skurt.com'
const apiUrl = 'http://skurt-interview-api.herokuapp.com/carStatus/'

// Start immediately
checkCarsAndSendError(apiUrl, errorRecipient, carIds)

// They every minute thereafter
setInterval(() => {
  checkCarsAndSendError(apiUrl, errorRecipient, carIds)
}, seconds * 1000)
