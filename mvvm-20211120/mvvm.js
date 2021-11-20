class Dep {
  constructor() {
    this.subs = [] // 消息池
  }

  addSub(watcher) {
    // 把每一个watcher 放入消息池
    this.subs.push(watcher)
  }

  notify() {
    this.subs.forEach((watcher) => watcher.update())
  }
}

class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb

    this.oldVal = this.get()
  }

  get() {
    Dep.target = this
    const value = CompilerUtils.getValue(this.vm, this.expr)
    Dep.target = null
    return value
  }

  update() {
    const newVal = CompilerUtils.getValue(this.vm, this.expr)
    if (newVal !== this.oldVal) {
      this.cb(newVal)
    }
  }
}

class Observer {
  constructor(data) {
    this.observer(data)
    console.info(data)
  }

  observer(obj) {
    if (obj && typeof obj === 'object') {
      for (let key in obj) {
        this.defineReactive(obj, key, obj[key])
      }
    }
  }

  defineReactive(obj, key, value) {
    this.observer(value)
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set: (newVal) => {
        if (newVal !== value) {
          this.observer(newVal)
          value = newVal
          dep.notify()
        }
      },
    })
  }
}

// 核心编译模块
class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    const fragment = this.node2fragment(this.el)
    // 核心的编译模块
    this.compiler(fragment)

    this.el.appendChild(fragment)
  }

  // 判断当前节点是否是node节点
  isElementNode(node) {
    return node.nodeType === 1
  }

  // 把当前节点放入内存
  node2fragment(node) {
    let fragment = document.createDocumentFragment()
    let firstChild
    while ((firstChild = node.firstChild)) {
      fragment.appendChild(node.firstChild)
    }
    return fragment
  }

  // 是否是vue2里面的指令
  isDirection(name) {
    return name.startsWith('v-')
  }

  // element
  elementCompiler(node) {
    const attributes = node.attributes
    ;[...attributes].forEach((item) => {
      const { name, value: expr } = item
      if (this.isDirection(name)) {
        const [, directive] = name.split('-')
        CompilerUtils[directive](node, expr, this.vm)
      }
    })
  }

  // text
  textCompiler(node) {
    const textContent = node.textContent
    if (/\{\{(.+?)\}\}/.test(textContent)) {
      CompilerUtils['text'](node, textContent, this.vm)
    }
  }

  // 核心编译模块
  compiler(node) {
    const childNodes = node.childNodes
    ;[...childNodes].forEach((item) => {
      // 如果是input/div
      if (this.isElementNode(item)) {
        this.elementCompiler(item)
        this.compiler(item)
      } else {
        this.textCompiler(item)
      }
    })
  }
}

// 只是名称而已，没有其他具体含义

// 工具类
CompilerUtils = {
  getValue(vm, expr) {
    return expr.split('.').reduce((data, current) => {
      return data[current]
    }, vm.$data)
  },
  setValue(vm, expr, value) {
    return expr.split('.').reduce((data, current, index, arr) => {
      if (index == arr.length - 1) {
        return (data[current] = value)
      }
      return data[current]
    }, vm.$data)
  },
  model(node, expr, vm) {
    const fn = this.updater['modelUpdater']
    new Watcher(vm, expr, (newValue) => {
      console.info(newValue)
      fn(node, newValue)
    })

    node.addEventListener('input', (e) => {
      this.setValue(vm, expr, e.target.value)
    })
    const value = this.getValue(vm, expr)
    fn(node, value)
  },
  text(node, expr, vm) {
    const fn = this.updater['textUpdater']
    const value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      new Watcher(vm, args[1], (newValue) => {
        fn(node, newValue)
      })
      return this.getValue(vm, args[1])
    })
    fn(node, value)
  },

  // 方法
  updater: {
    modelUpdater(node, value) {
      node.value = value
    },
    textUpdater(node, value) {
      node.textContent = value
    },
  },
}

// 手写一个mvvm.js

class Vue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data

    // 先判断当前节点是否在html中
    if (this.$el) {
      // 把所有data转化为Object.defineProperty
      new Observer(this.$data)

      // 核心的编译模块
      new Compiler(this.$el, this)
    }
  }
}
