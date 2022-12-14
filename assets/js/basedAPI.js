// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
// $.ajax() > ajaxPrefilter过滤器 -> 发送请求给服务器

// const baseUrl = 'http://www.liulongbin.top:3007'
const baseUrl = 'http://big-event-api-t.itheima.net'

$.ajaxPrefilter(option => {
  // 统一为有权限的接口，设置 headers 请求头
  if (option.url.includes('/my/')) {
    option.headers = {
      Authorization: localStorage.getItem('token'),
    }
  }
  option.url = baseUrl + option.url

  // 不论成功还是失败，最终都会调用 complete 回调函数
  option.complete = res => {
    // console.log(res)
    // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      //  强制清空 token
      localStorage.removeItem('token')
      // 强制跳转到登录页面
      location.href = '/login.html'
    }
  }
})
