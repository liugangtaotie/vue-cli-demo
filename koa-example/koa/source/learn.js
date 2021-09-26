async function fn1(mmmm) {
  console.info('1')

  await mmmm()

  console.info('5')
}

async function fn2(mmmm) {
  console.info('2')

  await mmmm()

  console.info('4')
}

async function fn3(mmmm) {
  console.info('3')
}

function compose(middlewares) {
  return function () {
    return dispatch(0)
    function dispatch(i) {
      let fn = middlewares[i]
      if (!fn) {
        return Promise.resolve()
      }

      return Promise.resolve(
        fn(function next() {
          return dispatch(i + 1)
        })
      )
    }
  }
}

const middlewares = [fn1, fn2, fn3]

const finalFn = compose(middlewares)

finalFn()
