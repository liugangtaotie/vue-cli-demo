// 被观察者执行方法
class Dep {
  constructor() {
    this.subs = []
  }

  // 订阅
  addSub(watcher) {
    this.subs.push(watcher)
  }

  // 发布
  notify() {
    this.subs.forEach((watcher) => watcher.update())
  }
}

// 手写一个观察者模式
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb

    // 拿到老值
    this.oldVal = this.get()
  }

  get() {
    Dep.target = this
    const value = CompilerUtil.getVal(this.vm, this.expr)
    Dep.target = null
    return value
  }

  update() {
    const newVal = CompilerUtil.getVal(this.vm, this.expr)

    if (newVal !== this.oldVal) {
      this.cb(newVal)
    }
  }
}

// 数据劫持
class Observer {
  constructor(data) {
    this.observer(data)
    console.info(data)
  }

  observer(obj) {
    if (obj && typeof obj === 'object') {
      for (let key in obj) {
        this.defineReactivity(obj, key, obj[key])
      }
    }
  }

  defineReactivity(obj, key, value) {
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

// 用数据编译模板
class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm

    // 把模板放入内存中
    const fragment = this.node2fragment(this.el)

    // 核心编译模块
    this.compile(fragment)

    // 从内存中将模板取回
    this.el.appendChild(fragment)
  }

  // 判断是否是指令
  isDirective(name) {
    return name.startsWith('v-')
  }

  // 编译元素
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

  // 编译文本
  compileText(node) {
    // console.info('编译文本', node)
    const content = node.textContent
    if (/{\{(.+?)\}\}/.test(content)) {
      CompilerUtil['text'](node, content, this.vm)
    }
  }

  // 核心编译模块
  compile(node) {
    const childNodes = node.childNodes
    ;[...childNodes].forEach((child) => {
      if (this.isElementNode(child)) {
        // 元素的处理
        this.compilerElement(child)
        this.compile(child)
      } else {
        // 文本的处理
        this.compileText(child)
      }
    })
  }

  // 判断当前node是不是一个元素
  isElementNode(node) {
    return node.nodeType === 1
  }

  // 放入内存
  node2fragment(node) {
    let fragment = document.createDocumentFragment()
    let firstChild
    while ((firstChild = node.firstChild)) {
      fragment.appendChild(firstChild)
    }

    return fragment
  }
}

// 工具类
CompilerUtil = {
  getVal(vm, expr) {
    return expr.split('.').reduce((data, current) => {
      return data[current]
    }, vm.$data)
  },
  setVal(vm, expr, value) {
    return expr.split('.').reduce((data, current, index, arr) => {
      if (arr.length - 1 == index) {
        return (data[current] = value)
      }
      return data[current]
    }, vm.$data)
  },
  getContent(vm, expr) {
    return expr.replace(/{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(vm, args[1])
    })
  },
  model(node, expr, vm) {
    const fn = this.updater['modelUpdater']
    new Watcher(vm, expr, (newVal) => {
      fn(node, newVal)
    })

    node.addEventListener('input', (e) => {
      console.info('kkkk')
      this.setVal(vm, expr, e.target.value)
    })

    const value = this.getVal(vm, expr)
    fn(node, value)
  },
  text(node, expr, vm) {
    const fn = this.updater['textUpdater']
    const value = expr.replace(/{\{(.+?)\}\}/g, (...args) => {
      new Watcher(vm, args[1], () => {
        fn(node, this.getContent(vm, expr))
      })
      return this.getVal(vm, args[1])
    })
    fn(node, value)
  },
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

    if (this.$el) {
      // 把所有的data都转化为Object.defineProperty
      new Observer(this.$data)
      // 用数据编译模板
      new Compiler(this.$el, this)
    }
  }
}
