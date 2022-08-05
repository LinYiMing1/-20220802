// 获取 表格数据
const initArtCateList = () => {
  $.ajax({
    type: 'GET',
    url: '/my/article/cates',
    success: res => {
      if (res.status !== 0) return layer.msg(res.message)
      // 调用 template
      const htmlStr = template('tpl-table', res.data)
      $('tbody').empty().html(htmlStr)
    },
  })
}

initArtCateList()

const layer = layui.layer
let indexAdd = null
const form = layui.form

$('#addCateBtn').on('click', function () {
  // 通过 layer.open() 展示弹出层
  indexAdd = layer.open({
    type: 1,
    area: ['500px', '250px'],
    title: '添加文章分类',
    // 获取虚拟模板的内容
    content: $('#dialog-add').html(),
  })
})

// 实现添加文章分类的功能
// 发起Ajax请求，注意，我们这个按钮不是写死的，是弹框出来的时候动态生成的，所以我们通过事件委派方式给表单绑定 `submit` 事件
// 通过代理监听 submit 事件
$('body').on('submit', '#form-add', function (e) {
  e.preventDefault()
  $.ajax({
    type: 'POST',
    url: '/my/article/addcates',
    data: $(this).serialize(),
    success: res => {
      console.log(res)
      if (res.status !== 0) return layer.msg('新增分类失败！')
      initArtCateList()
      layer.msg('新增分类成功！')
      // 关闭指定层
      layer.close(indexAdd)
    },
  })
})

// 修改
// 通过代理方式，为 btn-edit 按钮绑定点击事件
let indexEdit = null
$('tbody').on('click', '.btn-edit', function () {
  // 弹出修改文章分类的弹窗
  indexEdit = layer.open({
    type: 1,
    area: ['500px', '250px'],
    title: '修改文章分类',
    content: $('#dialog-edit').html(),
  })
  let id = $(this).attr('data-id')
  // 发起请求获取对应分类的数据
  $.ajax({
    method: 'GET',
    url: '/my/article/cates/' + id,
    success: function (res) {
      // console.log(res)
      form.val('form-edit', res.data)
    },
  })
})

// 更新文章分类
$('body').on('submit', '#form-edit', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/my/article/updatecate',
    data: $(this).serialize(),
    success: res => {
      if (res.status !== 0) {
        return layer.msg('更新分类数据失败！')
      }
      layer.msg('更新分类数据成功！')
      layer.close(indexEdit)
      initArtCateList()
    },
  })
})

// 删除
// 删除文章分类
$("tbody").on("click", ".btn-delete", function () {
  const id = $(this).attr("data-id");
  // 提示用户是否删除
  layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
          method: "GET",
          url: "/my/article/deletecate/" + id,
          data:null,
          success: function (res) {
              if (res.status !== 0) {
                  return layer.msg("删除分类失败！");
              }
              layer.msg("删除分类成功！");
              layer.close(index);
              initArtCateList();
          },
      });
  });
})
