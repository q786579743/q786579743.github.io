var ERROR_MESSAGE = {
    REQUIRED: "必填",
    INT: "只能输入整数.",
    FLOAT: "只能输入浮点数.",
    ENGLISH: "只能输入英文",
    CHINESE: "只能输入中文",
    EMAIL: "EMail格式错误.",
    MOBILE: "手机格式错误",
    TELEPHONE: "电话格式错误.格式：010-55555555",
    SQL: "请不要输入系统敏感字符.",
    URL: "网址格式错误.",
    INTERPUNCTION: "不能包含标点符号"
}


$.extend({ pd: {} });
$.extend($.pd, {
    striped: true,//设置为true将交替显示行背景。
    fitColumns: false,//设置为true将自动使列适应表格宽度以防止出现水平滚动。
    nowrap: true,//设置为true，当数据长度超出列宽时将会自动截取。
    dataType: "datatime",
    //格式化列 begin
    align: "center",
    color: "",
    isFormatter: false,
    //格式化列 End

    //右键菜单初始化 begin
    rowRightMenus: {},
    initRowRightMenus: function () {
        var _that = this;
        var result = "";

        if (_that.rowRightMenus != null) {

            var datas = _that.rowRightMenus;
            var divID = datas.DivID;
            var menus = datas.Menus;
            var id = "";
            var menuName = "";
            var onClientClick = "";
            var iconCls = "";
            var disabled = false;
            var menuSep = false;

            if (menus != null) {
                // _result = "<div id=\"" + _divID + "\" style=\"width: 120px;\" class=\"easyui-menu\">";
                var menusLen = menus.length;
                var menusStr = "";

                for (var i = 0; i < menusLen; i++) {

                    id = menus[i].ID;
                    menuName = menus[i].MenuName;
                    onClientClick = menus[i].OnClientClick;
                    iconCls = menus[i].iconCls;
                    disabled = menus[i].Disabled;
                    menuSep = menus[i].MenuSep;
                    menusStr = " <div data-options=\"iconCls:'" + iconCls + "'\" id=\"" + id + "\" onclick=\"" + onClientClick + ";\" disabled=\"" + (disabled ? "disabled" : "") + "\">" + menuName + "</div>";
                    
                    if (menuSep) {
                        menusStr += "<div class=\"menu-sep\">&nbsp;</div>";
                    }

                    result += menusStr;
                }
                //_result += "</div>";
            }
        }
        //alert(_result);
        return result;
    },
    config: ERROR_MESSAGE,
    //右键菜单初始化 end
    init: function (p_datatype) {
        var that = this;
        width = "";
        switch (p_datatype.toLowerCase()) {
            case "datatime":
                width = 80;
                break;

            case "personname":
                width = 90;
                break;

            case "price":
                width = 80;
                break;

            case "content":
                width = 200;
                break;

            default:
                break;
        }
        return width;
    },
    /**
     *格式化列样式(数据类型控制)
     *数据类型：datatime，number，text（文本）
     *@param value 值(可以是任何数据类型)
     *@param index 行索引
     *@param rec 整行数据
     *@return 字符串
    **/
    formatter: function (value, rec, index) {
        var _that = this;
        var result = value;
        if (_that._isFormatter) {
            result = "<div style=\"text-align:" + _that.align + ";"
            if (_that.color != "") {
                result += "color:" + _that.color;
            }
            result += "\">" + value + "</div>";
        }
        _that.isFormatter = false;
        _that.align = "center";
        _that.color = "";
        return result;
    }
});


//调用服务返回数据（通用方法）
//function GetWebServiceData(data, serviceUrl, callBack, exchangeCallBack, errorCallBack) {
//    //alert(serviceUrl);
//    $.ajaxSetup({ scriptCharset: "gb2312", contentType: "application/json; charset=gb2312" });
//    $.ajax({
//        type: "GET",
//        dataType: "jsonp",
//        url: serviceUrl,
//        data: data,
//        jsonp: "callbackparam", //服务端用于接收callback调用的function名的参数
//        success: function (data) {
//            if (data != "" && data != null) {
//                var parseJSONData = jQuery.parseJSON(data);
//                if (parseJSONData != null) {
//                    var exchangeData = exchangeCallBack(parseJSONData);
//                    callBack(exchangeData);
//                }
//            }
//        },
//        error: function (data) {
//            errorCallBack(data);
//        }
//    });
//}

