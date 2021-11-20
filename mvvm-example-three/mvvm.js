// 发布-订阅 观察者模式 -  被观察者

// 订阅者
class Dep {
  constructor() {
    this.subs = []
  }

  addSub(watcher) {
    this.subs.push(watcher)
  }

  // 订阅
  notify() {
    this.subs.forEach((watcher) => watcher.update())
  }
}

// 发布者
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb

    this.oldVal = this.getVal()
  }

  getVal() {
    Dep.target = this
    const value = CompilerUtil.getValue(this.vm, this.expr)
    Dep.target = null
    return value
  }

  update() {
    const newValue = CompilerUtil.getValue(this.vm, this.expr)
    console.info('update', newValue)
    console.info('update', this.oldVal)
    if (newValue !== this.oldVal) {
      console.info('执行回调')
      this.cb(newValue)
    }
  }
}

// 数据劫持
class Observe {
  constructor(data) {
    this.observe(data)
  }
  observe(obj) {
    if (obj && typeof obj === 'object') {
      for (let key in obj) {
        this.defineReactive(obj, key, obj[key])
      }
    }
  }
  defineReactive(obj, key, value) {
    this.observe(value)
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set: (newVal) => {
        if (newVal !== value) {
          this.observe(newVal)
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

    // 将数据放入内存
    const fragment = this.node2fragment(this.el)

    // 用数据编译模板
    this.compiler(fragment)
    this.el.appendChild(fragment)
  }

  // 将数据放入内存
  node2fragment(node) {
    let fragment = document.createDocumentFragment()
    let firstChild
    while ((firstChild = node.firstChild)) {
      fragment.appendChild(node.firstChild)
    }
    return fragment
  }

  // 是否是一个node节点
  isElementNode(node) {
    return node.nodeType === 1
  }

  // 是否是一个指令
  isDirective(name) {
    return name.startsWith('v-')
  }

  // 编译element
  compilerElement(node) {
    const attributes = node.attributes
    ;[...attributes].forEach((attr) => {
      const { name, value: expr } = attr
      if (this.isDirective(name)) {
        const [, directive] = name.split('-')
        CompilerUtil[directive](node, expr, this.vm)
      }
    })
  }

  // 编译text
  compilerText(node) {
    const textContent = node.textContent
    if (/{\{(.+?)\}\}/.test(textContent)) {
      CompilerUtil['text'](node, textContent, this.vm)
    }
  }

  // 用数据编译模板
  compiler(node) {
    const childNodes = node.childNodes
    ;[...childNodes].forEach((child) => {
      if (this.isElementNode(child)) {
        this.compilerElement(child)
        this.compiler(child)
      } else {
        this.compilerText(child)
      }
    })
  }
}

// 工具类
CompilerUtil = {
  getValue(vm, expr) {
    return expr.split('.').reduce((data, current) => {
      return data[current]
    }, vm.$data)
  },
  model(node, expr, vm) {
    const fn = this.updater['modelUpdate']
    new Watcher(vm, expr, (newValue) => {
      console.info(newValue)
      fn(node, newValue)
    })
    const value = this.getValue(vm, expr)
    fn(node, value)
  },
  text(node, expr, vm) {
    const fn = this.updater['textUpdate']
    const value = expr.replace(/{\{(.+?)\}\}/g, (...args) => {
      return this.getValue(vm, args[1])
    })
    fn(node, value)
  },
  updater: {
    modelUpdate(node, value) {
      return (node.value = value)
    },
    textUpdate(node, value) {
      return (node.textContent = value)
    },
  },
}

// 手写一个mvvm.js
class Vue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data

    if (this.$el) {
      // 将所有的data 转化为Object.defineProperty
      new Observe(this.$data)
      // 用数据编译模块
      new Compiler(this.$el, this)
    }
  }
}
