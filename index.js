import {isCarInBound, areCarsInBound} from './lib'

async function main() {
  try {
    // const carId = 2
    // const inBounds = await isCarInBound(carId)
    // console.log(`Car number ${carId} is inBounds=${inBounds}`)
    const results = await areCarsInBound([1,2,3,4,5,6,7,8,9,10])
    console.log('inbounds', results)
  } catch (err) {
    console.log(err)
  }
}

main()
