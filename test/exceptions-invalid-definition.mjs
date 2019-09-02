import TestRunner from 'test-runner'
import commandLineArgs from '../index.mjs'
import a from 'assert'

const tom = new TestRunner.Tom('exceptions-invalid-definition')

tom.test('throws when no definition.name specified', function () {
  const optionDefinitions = [
    { something: 'one' },
    { something: 'two' }
  ]
  const argv = [ '--one', '--two' ]
  a.throws(
    () => commandLineArgs(optionDefinitions, { argv }),
    err => err.name === 'INVALID_DEFINITIONS'
  )
})

tom.test('throws if dev set a numeric alias', function () {
  const optionDefinitions = [
    { name: 'colours', alias: '1' }
  ]
  const argv = [ '--colours', 'red' ]

  a.throws(
    () => commandLineArgs(optionDefinitions, { argv }),
    err => err.name === 'INVALID_DEFINITIONS'
  )
})

tom.test('throws if dev set an alias of "-"', function () {
  const optionDefinitions = [
    { name: 'colours', alias: '-' }
  ]
  const argv = [ '--colours', 'red' ]

  a.throws(
    () => commandLineArgs(optionDefinitions, { argv }),
    err => err.name === 'INVALID_DEFINITIONS'
  )
})

tom.test('multi-character alias', function () {
  const optionDefinitions = [
    { name: 'one', alias: 'aa' }
  ]
  const argv = [ '--one', 'red' ]
  a.throws(
    () => commandLineArgs(optionDefinitions, { argv }),
    err => err.name === 'INVALID_DEFINITIONS'
  )
})

tom.test('invalid type values 1', function () {
  const argv = [ '--one', 'something' ]
  a.throws(
    () => commandLineArgs([ { name: 'one', type: 'string' } ], { argv }),
    err => err.name === 'INVALID_DEFINITIONS'
  )
})

tom.test('invalid type values 2', function () {
  const argv = [ '--one', 'something' ]
  a.throws(
    () => commandLineArgs([ { name: 'one', type: 234 } ], { argv }),
    err => err.name === 'INVALID_DEFINITIONS'
  )
})

tom.test('invalid type values 3', function () {
  const argv = [ '--one', 'something' ]
  a.throws(
    () => commandLineArgs([ { name: 'one', type: {} } ], { argv }),
    err => err.name === 'INVALID_DEFINITIONS'
  )
})

tom.test('invalid type values 4', function () {
  const argv = [ '--one', 'something' ]
  a.doesNotThrow(function () {
    commandLineArgs([ { name: 'one', type: function () {} } ], { argv })
  }, /invalid/i)
})

tom.test('duplicate name', function () {
  const optionDefinitions = [
    { name: 'colours' },
    { name: 'colours' }
  ]
  const argv = [ '--colours', 'red' ]
  a.throws(
    () => commandLineArgs(optionDefinitions, { argv }),
    err => err.name === 'INVALID_DEFINITIONS'
  )
})

tom.test('duplicate alias', function () {
  const optionDefinitions = [
    { name: 'one', alias: 'a' },
    { name: 'two', alias: 'a' }
  ]
  const argv = [ '--one', 'red' ]
  a.throws(
    () => commandLineArgs(optionDefinitions, { argv }),
    err => err.name === 'INVALID_DEFINITIONS'
  )
})

tom.test('multiple defaultOption', function () {
  const optionDefinitions = [
    { name: 'one', defaultOption: true },
    { name: 'two', defaultOption: true }
  ]
  const argv = [ '--one', 'red' ]
  a.throws(
    () => commandLineArgs(optionDefinitions, { argv }),
    err => err.name === 'INVALID_DEFINITIONS'
  )
})

tom.test('err-invalid-defaultOption: defaultOption on a Boolean type', function () {
  const optionDefinitions = [
    { name: 'one', type: Boolean, defaultOption: true }
  ]
  const argv = [ '--one', 'red' ]
  a.throws(
    () => commandLineArgs(optionDefinitions, { argv }),
    err => err.name === 'INVALID_DEFINITIONS'
  )
})

export default tom
