const ajaxs = (index) => {
  // 请求方法已经提供如下
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(index)
    }, Math.random() * 1000)
  })
}

// 入参：[ajax(0),ajax(1)...ajax(19)]
// 结果：1，3，2，7...17
const limitRequest = (requests) => {}

const requestArr = [...Array(20).keys()].map((t) => ajaxs(t))

limitRequest(requestArr)
