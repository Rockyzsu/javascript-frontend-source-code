// 获得页面中所有折叠项目标题
var collapse = document.getElementById('collapse')
var title = collapse.getElementsByTagName('h3')
var content = collapse.getElementsByTagName('div')
// 通过循环绑定标题鼠标单击事件
for (var i = 0; i < title.length; i++) {
  title[i].onclick = function () {
    // 获取当前折叠项的内容窗口元素
    var current = this.nextElementSibling;
    // 通过切换当前折叠项的display属性值为block来显隐当前折叠项的内容
    if (current.style.display == 'block') {
      current.style.display = 'none'
      this.className = ''
    } else {
      // 重置所有折叠项内容为隐藏
      for (var i = 0; i < content.length; i++) {
        content[i].style.display = 'none'
        content[i].previousElementSibling.className = ''
      }
      current.style.display = 'block'
      this.className = 'active'
    }
  }
}

function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    getComputedStyle(obi, false)[attr]
  }

}

