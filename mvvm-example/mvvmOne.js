class Compiler {
  constructor(el, vm) {
    //
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    let fragment = this.node2fragment(this.el)
    console.info('111111', fragment)

    // 把内容塞到页面中
    this.el.appendChild(fragment)
  }

  // 把节点移动到内存中
  node2fragment(node) {
    let fragment = document.createDocumentFragment()
    let firstChild
    while ((firstChild = node.firstChild)) {
      fragment.appendChild(firstChild)
    }
    return fragment
  }

  isElementNode(node) {
    return node.nodeType === 1
  }
}

// 基类
class Vue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data

    // 这个根元素 存在 编译模板
    if (this.$el) {
      new Compiler(this.$el, this)
    }
  }
}
