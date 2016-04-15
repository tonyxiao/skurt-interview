import {assert} from 'chai'
import {isCarInBound} from '../lib'

describe('core', function () {
  it('car # 11 is always out of bounds', function (done) {
    const apiUrl = 'http://skurt-interview-api.herokuapp.com/carStatus/'
    isCarInBound(apiUrl, 11).then((inBound) => {
      assert.equal(false, inBound)
      done()
    }).catch((err) => {
      done(err)
    })
  })
  it('Fail if api gives error', function (done) {
    const apiUrl = 'http://bogus222323232784844848.herokuapp.com/carStatus/'
    isCarInBound(apiUrl, 11).then((inBound) => {
      assert.fail()
      done()
    }).catch((err) => {
      assert.isNotNull(err, 'Expecting error when given error api response')
      done()
    })
  })
})
