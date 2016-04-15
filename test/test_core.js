import {assert} from 'chai'
import {isCarInBound} from '../lib'

describe('core', function () {
  it('car # 11 is always out of bounds', function (done) {
    isCarInBound(11).then((inBound) => {
      assert.equal(false, inBound)
      done()
    }).catch((err) => {
      done(err)
    })
  })
})
