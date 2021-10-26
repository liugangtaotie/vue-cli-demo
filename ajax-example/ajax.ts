console.info('1111')

const ajaxArr = [
  'ajax_a',
  'ajax_c',
  'ajax_d',
  'ajax_e',
  'ajax_f',
  'ajax_g',
  'ajax_h',
  'ajax_i',
]

const ajaxPromise = function (url) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      console.log('1000', url)
      resolve(true)
    }, 1000)
  })
}

const limitRequest = (urls, maxNum) => {
  const len = urls.length

  const result = new Array(len).fill(false)

  let count = 0

  return new Promise((resolve, reject) => {
    // 请求maxNum个
    while (count < maxNum) {
      next()
    }

    console.info('1111', result)

    function next() {
      let current = count++
      // 处理边界条件
      if (current >= len) {
        // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
        !result.includes(false) && resolve(result)
        console.info('222', result)
        return
      }
      const url = urls[current]
      console.log(`开始 ${current}`, new Date().toLocaleString())
      ajaxPromise(url)
        .then((res) => {
          // 保存请求结果
          result[current] = res
          console.log(`完成 ${current}`, new Date().toLocaleString())
          // 请求没有全部完成, 就递归
          if (current < len) {
            next()
          }
        })
        .catch((err) => {
          console.log(`结束 ${current}`, new Date().toLocaleString())
          result[current] = err
          // 请求没有全部完成, 就递归
          if (current < len) {
            next()
          }
        })
    }
  })
}

limitRequest(ajaxArr, 3)
