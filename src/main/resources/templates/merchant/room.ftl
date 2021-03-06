
<!--商户端之房源界面-->

<!DOCTYPE html>
<html lang="en">
<#assign base=request.contextPath />
<head>
    <meta charset="UTF-8">
    <title>北墘小屋</title>
    <!--Base-->
    <script src="${base}/js/jquery-1.11.2.min.js" type="application/javascript"></script>
    <script src="${base}/js/base.js"></script>
    <!--Layui-->
    <script src="${base}/plugins/layui/layui.all.js" type="application/javascript"></script>
    <link rel="stylesheet" href="${base}/plugins/layui/css/layui.css">
    <!--css-->
    <link rel="stylesheet" href="${base}/plugins/layuiadmin/style/admin.css" media="all">
</head>
<body>
<div class="layui-fluid layui-anim layui-anim-scale" style="padding: 30px;">
    <div class="layui-card">
        <div class="layui-card-header">
            <strong style="font-size: 22px;font-family: 'kaiti';letter-spacing: 2px">房源管理</strong>
        </div>
        <div class="layui-card-body">
            <div class="layui-form layui-card-header layuiadmin-card-header-auto">
                <div id="search_area">
                    <label>房源标题：</label>
                    <div class="layui-inline">
                        <input class="layui-input" id="content" autocomplete="off">
                    </div>
                    <span style="margin-left: 50px">
                        <button class="layui-btn layuiadmin-btn-forum-list" data-type="keyLike">
                            <i class="layui-icon layui-icon-search layuiadmin-button-btn"></i>
                        </button>
                        <button class="layui-btn layui-btn-primary" data-type="reload">
                            <i class="layui-icon layui-icon-refresh layuiadmin-button-btn"></i>
                        </button>
                            <a lay-href="/merchant/toOpeRoom?type='Add'" class="layui-btn layui-bg-cyan layui-btn-sm" href="javascript:;" >添加</a>
                    </span>
                </div>
            </div>
            <div class="layui-card-body">
                <table id="roomTable" lay-filter="roomTable"></table>
            </div>
        </div>
    </div>
</div>
<style>
    .layui-table-page{
        text-align: center;
    }
</style>
<script>
    layui.config({
        base: '/plugins/layuiadmin/' //静态资源所在路径
    }).extend({
        index: 'lib/index' //主入口模块
    }).use(['index', 'room']);
</script>
</body>
</html>
