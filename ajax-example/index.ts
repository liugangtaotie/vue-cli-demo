setTimeout(() => {
  console.info('1')
}, 0)

console.info('2')

const s1 = async () => {
  console.info('3')

  await s2()

  console.info('4')
}

const s2 = async () => {
  console.info('5')
}

s1()

new Promise(function (resolve) {
  console.log('6')
  resolve(true)
  console.log('7')
}).then(function () {
  console.log('8')
})

console.info('9')
