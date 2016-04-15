import {checkCarsAndSendError} from './lib'

const carIds = [1,2,3,4,5,6,7,8,9,10]

// Native algorithm to just pull every 2 minutes. 
// More sophisticated production system will include things like exponential backoff on 
// failure, and TCP-style congestion control.
const seconds = 60 * 2

setInterval(() => {
  checkCarsAndSendError([1,2,3,4,5,6,7,8,9,10,11])
}, seconds * 1000)
