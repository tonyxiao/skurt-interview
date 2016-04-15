import {checkCarsAndSendError} from './lib'

const carIds = [1,2,3,4,5,6,7,8,9,10]
const seconds = 3

setInterval(() => {
  checkCarsAndSendError([1,2,3,4,5,6,7,8,9,10,11])
}, seconds * 1000)
