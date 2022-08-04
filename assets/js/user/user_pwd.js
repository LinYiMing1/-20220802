const form = layui.form

form.verify({
  pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
  samePwd: val => {
    if (val === $('.layui.form [name=oldPwd').val()) return '新旧密码不能相同！'
  },
  rePwd: val => {
    if (val !== $('[name=newPwd]').val()) return '两次密码不一致！'
  },
})

$('.layui-form').submit(function (e) {
  e.preventDefault()
  $.ajax({
    type: 'POST',
    url: '/my/updatepwd',
    // data: $(".layui-form").serialize(),
    data: form.val('formUserPwd'),
    success: res => {
      const { status, message } = res
      layer.msg(message)
      if (status !== 0) return
      //   $('.layui-form')[0].reset()
      // 提交成功后模拟点击重置按钮，清空表单
      $('#resetBtn').click()
    },
  })
})
