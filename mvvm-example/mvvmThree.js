class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    // 把模板放入内存里面，处理好了再返回
    let fragment = this.node2fragment(this.el)
    // 编译模板字符串
    this.compiler(fragment)
    // 编译处理好了，返回到视图
    this.el.appendChild(fragment)
  }

  // 核心编译模块
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

  // 编译文本
  compilerText(node) {
    // console.info(node)
  }

  isDirective(node) {
    return node.startsWith('v-')
  }

  // 编译元素
  compilerElement(node) {
    const attributes = node.attributes
    ;[...attributes].forEach((attr) => {
      const { name, value: expr } = attr
      if (this.isDirective(name)) {
        console.info(attr)
        const [, directive] = name.split('-')
        CompilerUtil[directive](node, expr, this.vm)
      }
    })
  }

  // 是否是node节点
  isElementNode(node) {
    return node.nodeType === 1
  }

  // 将node 放入内存
  node2fragment(node) {
    let fragment = document.createDocumentFragment()
    let firstChild
    while ((firstChild = node.firstChild)) {
      fragment.appendChild(firstChild)
    }
    return fragment
  }
}

CompilerUtil = {
  getValue(vm, expr) {
    return expr.split('.').reduce((data, current) => {
      console.info(data, current)
      return data[current]
    }, vm.$data)
  },

  // 解析v-model指令
  model(node, expr, vm) {
    const fn = this.updater['modelUpdater']

    const value = this.getValue(vm, expr)

    fn(node, value)
  },

  text() {},

  updater: {
    modelUpdater(node, value) {
      return (node.value = value)
    },
  },
}

// 手写一个mvvm.js
class Vue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    if (this.$el) {
      new Compiler(this.$el, this)
    }
  }
}
