let ajaxArr = []

for (let i = 0; i < 200; i++) {
  ajaxArr.push(`ajax_${i}`)
}

console.info(ajaxArr)

// ajax 请求方式
const ajaxPromise = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
      console.info(url)
    }, 1000)
  })
}

// 请求限流
const limitRequest = (arr, maxNum) => {
  // 请求总数
  const len = arr.length

  // 标志位
  let result = new Array(len).fill(false)

  // 使用过index标志位
  let resultUsed = new Array(len).fill(false)

  let count = 0

  return new Promise((resolve, reject) => {
    while (count < maxNum) {
      next()
    }

    function randomNum(arr) {
      // 取出为false的数组
      let temp = []
      arr.forEach((item, index) => {
        if (!item) {
          temp.push(index)
        }
      })
      const index = Math.floor(Math.random() * temp.length)
      return temp[index]
    }

    function next() {
      const current = count++

      // 随机一个数，这个数字没有出现过
      const currentNoRepeat = randomNum(resultUsed)
      resultUsed[currentNoRepeat] = true

      // 处理边界条件
      if (current >= len) {
        !result.includes(false) && resolve(result)
        return
      }

      const url = arr[currentNoRepeat]

      console.log(`开始 ${currentNoRepeat}`, new Date().toLocaleString())

      ajaxPromise(url)
        .then((res) => {
          result[currentNoRepeat] = true
          console.log(`完成 ${currentNoRepeat}`, new Date().toLocaleString())
          if (current < len) {
            next()
          }
        })
        .catch((err) => {
          result[currentNoRepeat] = false
          console.log(`失败 ${currentNoRepeat}`, new Date().toLocaleString())
          if (current < len) {
            next()
          }
        })
    }
  })
}

limitRequest(ajaxArr, 5)
