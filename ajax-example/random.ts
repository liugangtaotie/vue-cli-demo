let ajaxArr = []

for (let i = 0; i < 20; i++) {
  ajaxArr.push(`ajax_${i}`)
}

let len = ajaxArr.length

let result = new Array(len).fill(false)

function randomNum() {
  // 数组随机输出一个num
  const num = Math.floor(Math.random() * len)

  if (result[num]) {
    randomNum()
  }
  result[num] = true

  return num
}

const num = randomNum()

console.info('11111', num)
console.info('result', result)
