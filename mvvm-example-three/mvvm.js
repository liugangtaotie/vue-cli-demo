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

  // 编译element
  compilerElement(node) {
    console.info('element', node)
  }

  // 编译element
  compilerText(node) {
    console.info('text', node)
  }

  // 用数据编译模板
  compiler(node) {
    const childNodes = node.childNodes
    ;[...childNodes].forEach((child) => {
      if (this.isElementNode(child)) {
        console.info(child)
        this.compilerElement(child)
        this.compiler(child)
      } else {
        // this.compilerText(child)
      }
    })
  }
}

// 手写一个mvvm.js
class Vue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data

    if (this.$el) {
      // 用数据编译模块
      new Compiler(this.$el, this)
    }
  }
}
