//判断空间是不是存在，不存在创建
if ($.pd == undefined) {
    $.extend({
        pd: {}
    });
}

$.extend($.pd, {
    configs: {
        //ajax 返回值
        AJAXDATATYPE: {
            XML: 'xml', //返回 XML 文档，可用 jQuery 处理。
            HTML: 'html', //返回纯文本 HTML 信息；包含的 script 标签会在插入 dom 时执行。
            /*返回纯文本 JavaScript 代码。不会自动缓存结果。
            //除非设置了 "cache" 参数。注意:在远程请求时(不在同一个域下)，
            //所有 POST 请求都将转为 GET 请求。（因为将使用 DOM 的 script标签来加载）
            */
            SCRIPT: 'script', 
            JSON: 'json', //返回 JSON 数据 。
            /*
            JSONP 格式。使用 JSONP 形式调用函数时，
            如 "myurl?callback=?" jQuery 将自动替换 ? 
            为正确的函数名，以执行回调函数。
            */
            JSONP: 'jsonp', //
            TEXT: 'text' //返回纯文本字符串
        },
        //ajax 提交方式
       AJAXTYPE: {
            GET: 'get',
            POST: 'post'
        },
        //请求地址
        WEBSERVICEURL: {
            //登录
            PHONE_LOGIN: 'http://192.168.3.128:8080/bzywd_new/phone_login.action'
        },
        //参数传递
        QUERYSTRING: {
            USERCODE: 'userCode' //用户code 
        },
        //图片地址配置
        IMAGES: {
            USERIMAGE: 'http://192.168.3.128:8080/jxtsncxx/user/'
        },
        //easyUI列表格式化项，主要用于formatter
        DATATYPE: {
            CODE: { typename: "code", width: 100, align: "center" }, //编号
            SHORTDATETIME: { typename: "shortime", width: 80, align: "center" },//yyyy-MM-dd
            LONGDATETIME: { typename: "longime", width: 120, align: "center" },//yyyy-MM-dd HH:mm:ss
            NUMBER: { type: "number", width: 90, align: "right" }, //整数类型
            DECMAIL: { type: "decmail", width: 110, align: "right" }, //浮点型
            ENUM: { typename: "enum", width: 80, align: "center"},//枚举或state
            SHORTNAME: { typename: "shortName", width: 80, align: "center" }, //名称
            LONGDNAME: { typename: "longdName", width: 150, align: "left" }, //名称
            TITLE: { typename: "title", width: 180, align: "left" }, //标题
            UNIT: { typename: "unit", width: 60, align: "center" }, //单位 台 把 件
            TEXT: { typename: "text", align: "left" }
        },
        //错误信息
        ERRORMESSAGE: {
            SUCCESS: "操作成功！",
            FAIL: "操作失败，请与管理员联系！",
            WAITING:"程序正在努力处理中..."
        }

    }
});