// 1.1 获取裁剪区域的 DOM 元素
const $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview',
}

// 1.3 创建裁剪区域
$image.cropper(options)

// 下面定义一个按钮，文本是 上传，一旦用户点击按钮，我们手动触发 文件选择框的点击事件
$('#uploadBtn').on('click', function () {
  $('#file').click()

  // 绑定 change 事件，input 内容变动触发
  $('#file').change(function (e) {
    // 通过 e.target.files 获取用户选择文件列表 【伪数组】
    const fileList = e.target.files.length
    if (fileList === 0) return layer.msg('请选择文件！')

    // 1. 拿到用户选择的文件
    let file = e.target.files[0]
    // 2. 将文件，转化为路径【字符串形式】
    var imgURL = URL.createObjectURL(file)
    // 3. 重新初始化裁剪区域
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })
})

// 将裁剪后的头像上传到服务器
//  为确定按钮绑定点击事件
$('#sendBtn').on('click', function (e) {
  // 1、拿到用户裁切之后的头像
  // 直接复制代码即可
  const dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100,
    })
    .toDataURL('image/png')
  // 2、发送 ajax 请求，发送到服务器
  $.ajax({
    method: 'POST',
    url: '/my/update/avatar',
    data: {
      avatar: dataURL,
    },
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('更换头像失败！')
      }
      layer.msg('更换头像成功！')
      window.parent.getUserInfo()
    },
  })
})
