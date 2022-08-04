$(function () {
  const form = layui.form
  // 自定义校验规则
  form.verify({
    nickname: val => {
      if (val.length > 6) return '昵称长度必须在 1 ~ 6 个字符之间！'
    },

    // [正则匹配，匹配不符时的提示文字]
    email: [/@/, '邮箱格式输入错误'],
  })

  // 获取用户的基本信息
  // 初始化用户信息
  const initUserInfo = () => {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      data: null,
      success: res => {
        const { status, message, data } = res
        if (status !== 0) return layer.msg(message)
        // layui 提供的 form.val() 方法
        form.val('formUserInfo', data)
      },
    })
  }

  initUserInfo()

  // 重置功能
  $('#resetBtn').click(function (e) {
    // 阻止默认行为：表单提交和重置
    e.preventDefault()
    // 重新调用初始化函数
    initUserInfo()
  })

  // 提交功能
  $('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      // data: $('.layui-form').serialize(),
      data: form.val('formUserInfo'),
      success: res => {
        const { status, message, data } = res
        if (status !== 0) return layer.msg(message)
        layer.msg(message)
        // 调用父页面渲染函数
        window.parent.getUserInfo()
      },
    })
  })
})
