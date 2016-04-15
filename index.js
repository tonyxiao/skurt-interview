import {checkCarsAndSendError} from './lib'

const carIds = [1,2,3,4,5,6,7,8,9,10]

// Native algorithm to just pull every minute
// More sophisticated production system will include things like exponential backoff on 
// failure, and TCP-style congestion control.
const seconds = 60

// Start immediately
checkCarsAndSendError(carIds)

// They every minute thereafter
setInterval(() => {
  checkCarsAndSendError(carIds)
}, seconds * 1000)
