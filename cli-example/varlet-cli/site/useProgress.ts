import { reactive } from 'vue'
import { Progress } from '@varlet/ui'
// @ts-ignore
import config from '@config'
// @ts-ignore
import { mountInstance } from '@varlet/ui/es/utils/components'
import { get } from 'lodash'

export function useProgress() {
  const props = reactive({
    style: {
      position: 'fixed',
      width: '100%',
      left: 0,
      top: 0,
      zIndex: 10086,
    },
    trackColor: '#fff',
    color: get(config, 'themes.color-progress'),
    lineWidth: 3,
    value: 0,
  })

  let timer: number

  const changeValue = () => {
    timer = window.setTimeout(() => {
      if (props.value >= 95) return
      let num = Math.random()

      if (props.value < 70) num = Math.round(5 * Math.random())

      props.value += num
      changeValue()
    }, 200)
  }

  const start = () => {
    props.value = 0
    setTimeout(() => (props.color = '#3594d9'), 200)
    changeValue()
  }

  const end = () => {
    props.value = 100
    setTimeout(() => (props.color = '#fff'), 300)
    window.clearTimeout(timer)
  }

  mountInstance(Progress, props)

  return {
    start,
    end,
  }
}
