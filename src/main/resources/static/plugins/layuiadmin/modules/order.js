/**
 *  @author   Caiwx
 */

layui.define(["form", "table", "element"], function (exports) {
    var $ = layui.$,
        table = layui.table
        , element = layui.element;
    element.render();

    /**
     * 初始化表格
     */
    var orderTable = table.render({
        elem: '#orderTable'
        , url: '/orderPage'
        , page: true
        , limit: 10
        , height: 'full'
        , method: 'get'
        , request: {
            pageName: 'current' //页码的参数名称，默认：page
            , limitName: 'size' //每页数据量的参数名，默认：limit
        }
        , cols: [[
            {
                field: 'roomInfo.title'
                , title: '房间名称'
                , align: 'center'
                , Width: 193
                , templet: d => {
                    return d.roomInfo.title
                }
            }
            , {
                field: 'user.name'
                , title: '用户信息'
                , align: 'center'
                , width: 140
                , event: "detail"
                , templet: d => {
                    return "<div style='color: #bf997c;cursor: pointer'>查看详情</div>"
                }
            }
            , {
                field: 'orderCode'
                , title: '订单编号'
                , align: 'center'
                , width: 180
            }
            , {
                field: 'beginTime'
                , title: '入住时间'
                , align: 'center'
                , width: 192
                , templet: (d) => {
                    return Base.formatDate(d.beginTime, 'yy/MM/dd');
                }
            }
            , {
                field: 'endTime'
                , title: '退房时间'
                , align: 'center'
                , width: 192
                , templet: (d) => {
                    return Base.formatDate(d.endTime, 'yy/MM/dd');
                }
            }
            , {
                field: 'dayCount'
                , title: '入住天数'
                , align: 'center'
                , width: 100
            }
            , {
                field: 'price'
                , title: '价钱'
                , align: 'center'
                , width: 100
            }
            , {
                field: 'status'
                , title: '订单状态'
                , align: 'center'
                , width: 112
                , templet: d => {
                    let html = '';
                    switch (d.status) {
                        case "WP":
                            html += '<span class="layui-badge layui-bg-blue">待付款</span>';
                            break;
                        case "WR":
                            html += '<span class="layui-badge layui-bg-orange">待评价</span>';
                            break;
                        case "YR":
                            html += '<span class="layui-badge layui-bg-green">已评价</span>';
                            break;
                        case "WDD":
                            html += '<span class="layui-badge">退款中</span>';
                            break;
                        case "SDD":
                            html += '<span class="layui-badge layui-bg-cyan">退款成功</span>';
                            break;
                        case "FDD":
                            html += '<span class="layui-badge layui-bg-gray">退款失败</span>';
                            break;
                    }
                    return html;
                }
            }
            , {
                field: 'createTime'
                , title: '创建时间'
                , align: 'center'
                , Width: 171
                , sort: true
                , templet: (d) => {
                    return Base.formatDate(d.createTime, 'yy/MM/dd HH:mm:ss');
                }
            }
            , {
                title: '操作'
                , width: 197
                , align: 'center'
                , fixed: 'right'
                , templet: (d) => {
                    let delHtml = '<a class="layui-btn layui-btn-danger layui-btn-radius layui-btn-sm" lay-event="del">删除</a>';
                    let opeHtml = '';
                    if (d.status === 'WDD'){
                        opeHtml += '<a class="layui-btn layui-btn-sm layui-btn-radius" lay-event="agree">同意</a>';
                        opeHtml += '<a class="layui-btn layui-btn-warm layui-btn-sm layui-btn-radius" lay-event="refuse">拒绝</a>'
                    }
                    return delHtml + opeHtml;
                }
            }
        ]]
    });

    /**
     * 监听事件
     */
    $('button[data-type]').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    var active = {
        keyLike: function () {                          //关键词模糊搜索
            const content = $('#content');
            //执行重载
            table.reload('orderTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                , where: {
                    content: content.val()
                }
            });
        },
        reload: function () {                           //重置加载页面
            $('#content').val("");
            table.reload('orderTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                , where: {
                    content: $('#content').val()
                }
            });
        }
    };

    /**
     * 创建监听工具
     */
    table.on('tool(orderTable)', function (obj) {
        var data = obj.data;
        if (obj.event == 'detail') {         //点击查看内容详情
            layer.open({
                type: 0
                , title: '信息详情'
                , offset: 'auto'
                , btn:[]
                , area: ['400px','300px']
                , shadeClose: true
                , id: 'layerDemo' + data.id
                , content:
                    '<div style="padding: 20px;">'+
                    '<div style="margin-bottom: 10px"><span style="font-size: 14px;font-weight: 800;margin-right: 28px">入住人名称:</span><span style="font-size: 19px">' + data.name + '</span></div>'+
                    '<div style="margin-bottom: 10px"><span style="font-size: 14px;font-weight: 800;margin-right: 28px">联系电话:</span><span style="font-size: 19px">' + data.phone + '</span></div>'+
                    '<div style="margin-bottom: 10px"><span style="font-size: 14px;font-weight: 800;margin-right: 28px">身份证号码:</span><span style="font-size: 19px">' + data.cardno + '</span></div>'+
                    '<div style="margin-bottom: 10px"><span style="font-size: 14px;font-weight: 800;margin-right: 28px">订单留言:</span><span style="font-size: 19px">' + data.comment + '</span></div>'+
                    '</div>'
                , shade: 0.3
                , anim: 5
            });
        } else if (obj.event == 'del') {
            layer.confirm('是否删除该订单?', {icon: 3, title: '提示'}, function (index) {
                Base.ajax("/doOpeOrder", "POST", {'id': data.id, 'status': 'D'}, (res) => {
                    if (res.code === Base.status.success) {
                        layer.msg("操作成功", {icon: 6, time: 800});
                        setTimeout(() => {
                            layer.close(index);
                            $(".layui-icon-refresh").click();
                        }, 800)
                    } else {
                        layer.msg(res.msg, {icon: 5, time: 500});
                    }
                })
            });
        } else if (obj.event == 'agree') {
            layer.confirm('是否同意退款?', {icon: 3, title: '提示'}, function (index) {
                Base.ajax("/doOpeOrder", "POST", {'id': data.id, 'status': 'SDD'}, (res) => {
                    if (res.code === Base.status.success) {
                        layer.msg("操作成功", {icon: 6, time: 800});
                        setTimeout(() => {
                            layer.close(index);
                            $(".layui-icon-refresh").click();
                        }, 800)
                    } else {
                        layer.msg(res.msg, {icon: 5, time: 500});
                    }
                })
            });
        } else if (obj.event == 'refuse') {
            layer.confirm('是否拒绝退款?', {icon: 3, title: '提示'}, function (index) {
                Base.ajax("/doOpeOrder", "POST", {'id': data.id, 'status': 'FDD'}, (res) => {
                    if (res.code === Base.status.success) {
                        layer.msg("操作成功", {icon: 6, time: 800});
                        setTimeout(() => {
                            layer.close(index);
                            $(".layui-icon-refresh").click();
                        }, 800)
                    } else {
                        layer.msg(res.msg, {icon: 5, time: 500});
                    }
                })
            });
        }
    });

    exports('order', {});
});