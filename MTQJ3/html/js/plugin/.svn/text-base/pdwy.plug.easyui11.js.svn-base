/*
   *  脚本文件描述：基于EasyUI扩展的一些方法
   *  创建时间：2016-5-4
   *  作者： 李玲
   */

//判断空间是不是存在，不存在创建
if ($.pd == undefined) {
    $.extend({
        pd: {}
    });
}


//基于EasyUI重写列表
$.extend($.pd, {

    pageConfig: {
        data: null,//数据源
        url: null,//一个用以从远程站点请求数据的超链接地址。
        method: "post",//请求远程数据的方法类型。默认post 
        queryParams: null,//当请求远程数据时，发送的额外参数。
        striped: true,//设置为true将交替显示行背景。 默认
        nowrap: true,//设置为true，当数据长度超出列宽时将会自动截取。
        fitColumns: false,//设置为true将自动使列适应表格宽度以防止出现水平滚动。
        rownumbers: true,//设置为true将显示行数。默认false
        singleSelect: false,//设置为true，只可选择一行数据
        checkOnSelect: true, //如果设置为 true，当用户点击一行的时候 checkbox checked(选择)/unchecked(取消选择)。 如果为false，当用户点击刚好在checkbox的时候，
        //checkbox checked(选择)/unchecked(取消选择)。这个属性从1.3版本以后可用。
        selectOnCheck: true,//如果设置为true，点击checkbox将永远选择这行。如果设置为false，选择一个行将不会选择checkbox。这个属性从1.3版本以后可用。
        nowrap: true,//设置为true，当数据长度超出列宽时将会自动截取。
        border: false,//是否包括边框
        rowStyler: function (index, row) { },//返回样式，如：'background:red'，function有2个参数：index：行索引，从0开始.row：对应于该行记录的对象。
        sortName: "ID_PK",//当数据表格初始化时以哪一列来排序。
        sortOrder: "desc",//定义排序顺序，可以是'asc'或者'desc'（正序或者倒序）。
        remoteSort: true,//（远程排序）	boolean（布尔型）	定义是否通过远程服务器对数据排序。
        idField: "ID_PK",//表明该列是一个唯一列。
        loadMsg: "数据加载中...",//当从远程站点载入数据时，显示的一条快捷信息。
        showFooter: true,//定义是否显示行底（如果是做统计表格，这里可以显示总计等）。
        pagination: true,//设置true将在数据表格底部显示分页工具栏。默认false
        pagePosition: "bottom",//定义分页工具栏的位置.可用值有： 'top'，'bottom'，'both'。默认值bottom
        pagenumber: 1,//当设置分页属性时，初始化分页码。默认1
        pageSize: 15,//当设置分页属性时，初始化每页记录数。
        pageList: [10, 15, 20, 25, 30],//当设置分页属性时，初始化每页记录数列表。
        //loadFilter:function{},// 返回用以显示的已过滤数据，function有一个参数'data'表示原始数据，你可以将原始数据改变为规范的数据格式，该函数必须返回包含 'total'和'rows'属性的标准数据对象。
        //editors:{},//（编辑模式）	object（对象）	定义当编辑一行时的编辑模式。	predefined editors
        //view:{},//（视图）	object（对象）	定义数据表格的视图。
        columns: [[]],
        /*
        * 当数据载入成功时触发。
        * @param data
        */
        onLoadSuccess: function (data) { },
        /*
         * 当数据载入失败时触发。
         */
        onLoadError: function () { },
        /*
         * 在请求载入数据之前触发，如果返回false将取消载入。
         * @param param
         */
        onBeforeLoad: function (param) { },
        /*
         * 当用户点击行时触发
         * @param rowIndex：被点击的行索引，从0开始。
         * @param rowData：对应于被点击的行的记录。
         */
        onClickRow: function (rowIndex, rowData) { },
        /*
         * 当用户双击一行时触发
         * @param rowIndex：被点击的行索引，从0开始。
         * @param rowData：对应于被点击的行的记录。
         */
        onDblClickRow: function (rowIndex, rowData) { },
        /*
         * 当用户点击单元格时触发。
         * @param rowIndex：被点击的行索引，从0开始。
         * @param fiels：title。
         * @param value:单元格值
         */
        onClickCell: function (rowIndex, field, value) { },
        /*
         * 当用户点击单元格时触发。
         * @param rowIndex：被点击的行索引，从0开始。
         * @param fiels：title。
         * @param value:单元格值
         */
        onDblClickCell: function (rowIndex, field, value) { },
        /*
         * 当用户对列排序时触发。
         * @param sort：排序字段名称。
         * @param order：排序顺序。
         */
        onSortColumn: function (sort, order) { },
        /*
         * 当用户调整列宽时触发。
         * @param field：字段。
         * @param width：宽度。
         */
        onResizeColumn: function (field, width) { },
        /*
         * 当用户选择一行是触发
         * @param rowIndex：被点击的行索引，从0开始。
         * @param rowData：对应于被点击的行的记录。
         */
        onSelect: function (rowIndex, rowData) { },
        /*
         * 当用户取消选择一行时触发
         * @param rowIndex：被点击的行索引，从0开始。
         * @param rowData：对应于被点击的行的记录。
         */
        onUnselect: function (rowIndex, rowData) { },
        /*
         * 当用户选择所有行时触发
         * @param rows：数据集
         */
        onSelectAll: function (rows) { },
        /*
         * 当用户选择一行是触发 （这个事件从1.3版本以后可用。）
         * @param rowIndex：被点击的行索引，从0开始。
         * @param rowData：对应于被点击的行的记录。
         */
        onUnselectAll: function (rowIndex, rowData) { },
        /*
         * 当用户取消选中一行的时候触发（这个事件从1.3版本以后可用。）
         * @param rowIndex：被点击的行索引，从0开始。
         * @param rowData：对应于被点击的行的记录。
         */
        onUncheck: function (rowIndex, rowData) { },
        /*
         * 当用户选中所有行时触发（这个事件从1.3版本以后可用。）
         * @param rows:数据集。
         */
        onCheckAll: function (rows) { },
        /*
         * 当用户取消选中所有行时触发（这个事件从1.3版本以后可用。）
         * @param rows:数据集。
         */
        onUncheckAll: function (rows) { },
        /*
         * 选中一行（这个事件从1.3版本以后可用。）
         * @param index:选中一行，行的下标的起始值是0。
         */
        checkRow: function (index) { },
        /*
         * 取消选择一行（这个事件从1.3版本以后可用。）
         * @param index:取消选择一行，行的下标的起始值是0。
         */
        uncheckRow: function (index) { },
        /*
         * 当用户取消选择所有行时触发。
         * @param rows:数据集。
         */
        onCheck: function (rows) { },
        /*
         * 当用户开始编辑一行时触发
         * @param rowIndex：正在编辑的行索引，从0开始。
         * @param rowData：对应于正在编辑的行的记录。
         */
        onBeforeEdit: function (rowIndex, rowData) { },
        /*
         * 当用户开始编辑一行时触发
         * @param rowIndex：正在编辑的行索引，从0开始。
         * @param rowData：对应于正在编辑的行的记录。
         * @param changes：被改变的字段内容，对应方式为字段：值。
         */
        onAfterEdit: function (rowIndex, rowData, changes) { },
        /*
         * 当用户取消编辑行时触发
         * @param rowIndex：正在编辑的行索引，从0开始。
         * @param rowData：对应于正在编辑的行的记录。
         */
        onBeforeEdit: function (rowIndex, rowData) { },
        /*
         * 当数据表格的列标题被鼠标右键单击时触发。
         * @param e：
         * @param field
         */
        onHeaderContextMenu: function (e, field) { },
        /*
         * 当一行被鼠标右键单击时触发。
         * @param e：
         * @param rowIndex：正在编辑的行索引，从0开始。
         * @param rowData：对应于正在编辑的行的记录。
         */
        onRowContextMenu: function (e, rowIndex, rowData) { },

    },



    //右键菜单初始化 begin
    rowRightMenus: null,
    initRowRightMenus: function () {
        var _that = this;
        var result = "";

        if (_that.rowRightMenus != null) {

            var datas = _that.rowRightMenus;
            var divID = datas.DivID;
            var menus = datas.menus;
            var id = "";
            var menuName = "";
            var onClientClick = "";
            var iconCls = "";
            var disabled = false;
            var menuSep = false;

            if (menus != null) {

                var menusLen = menus.length;
                var menusStr = "";

                for (var i = 0; i < menusLen; i++) {

                    id = menus[i].ID;
                    menuName = menus[i].menuName;
                    onClientClick = menus[i].onClientClick;
                    iconCls = menus[i].iconCls;
                    disabled = menus[i].disabled;
                    menuSep = menus[i].menuSep;

                    if (disabled == true) {
                        menusStr = " <div data-options=\"iconCls:'" + iconCls + "'\" id=\"" + id + "\" onclick=\"" + onClientClick + ";\"disabled=\"disabled\">" + menuName + "</div>";
                    }
                    else {

                        menusStr = " <div data-options=\"iconCls:'" + iconCls + "'\" id=\"" + id + "\" onclick=\"" + onClientClick + ";$(this).parent().hide();$('.menu-shadow').hide();\">" + menuName + "</div>";
                    }

                    if (menuSep) {
                        menusStr += "<div class=\"menu-sep\"></div>";
                    }

                    result += menusStr;
                }

            }
        }

        return result;
    },

    /**
     *格式化列样式(数据类型控制)
     *数据类型：datatime，number，text（文本）
     *@param value 值(可以是任何数据类型)
     *@param index 行索引
     *@param rec 整行数据
     *@param datatypeObj  config 数据类型（DATATYPE）
     *@return 字符串
    **/
    formatter: function (value, rec, index, datatypeObj) {
        var _that = this;
        var result = value;
        var align = "center";
        align = datatypeObj != null && datatypeObj.align != null ? datatypeObj.align : "center";
        {
            result = "<div style=\"text-align:" + align + ";"

            result += "\">" + value + "</div>";
        }

        return result;
    },
    /**
     * 创建表头右键菜单(暂时不好使)
     * @param pagelistID 列表ID
    **/
    createColumnMenu: function (pagelistID) {
        cmenu = $('<div/>').appendTo('body');
        cmenu.menu({
            onClick: function (item) {
                if (item.iconCls == 'icon-ok') {
                    $('#' + pagelistID).datagrid('hideColumn', item.name);
                    cmenu.menu('setIcon', {
                        target: item.target,
                        iconCls: 'icon-empty'
                    });
                } else {
                    $('#' + pagelistID).datagrid('showColumn', item.name);
                    cmenu.menu('setIcon', {
                        target: item.target,
                        iconCls: 'icon-ok'
                    });
                }
            }
        });
        var fields = $('#' + pagelistID).datagrid('getColumnFields');
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            var col = $('#' + pagelistID).datagrid('getColumnOption', field);
            cmenu.menu('appendItem', {
                text: col.title,
                name: field,
                iconCls: 'icon-ok'
            });
        }
    },
    /**
     * 分页设置
     * @param pagelistID 列表ID
    **/
    paginationSet: function (pageListID) {
        if ($("#" + pageListID) != undefined) {
            var p = $("#" + pageListID).datagrid('getPager');
            $(p).pagination({
                beforePageText: '第',
                afterPageText: '页    共 {pages} 页',
                displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
            });
        }
        else {
            console.log("pagelistID不是当前页面已有项。");
        }
    },
    /**
      * 改变窗体大小
      * @param panelID pageListPanel面板ID
      * @param pagelistID 列表ID
      * @param panelHeight 调整panel高度值
      * @param pageListHeight 调整pagelist高度值
     **/
    windowsResize: function (panelID, pageListID, panelHeight, pageListHeight) {
        var _width = $(window).width();
        var _height = $(window).height();
        panelHeight = panelHeight == null || pageListHeight == undefined ? parseInt(panelHeight) : 94;
        pageListHeight = pageListHeight == null || pageListHeight == undefined ? parseInt(pageListHeight) : 140;


        if ($('#' + panelID) != undefined) {
            $('#' + panelID).panel("resize", {
                height: _height - panelHeight
            });
        }
        if ($("#" + pageListID) != undefined) {
            $("#" + pageListID).treegrid("resize", {
                height: _height - pageListHeight
            });
        }

    }

});
//判断用户是否已存在
$.extend($.fn.validatebox.defaults.rules, {
    txtName: {
        validator: function (value, param) {
            var data0 = false;
            if (value.length >= param[0] && param[1] >= value.length) {
                $.ajax({
                    type: "POST", async: false,
                    url: contextPath + "/json/valName.action",//根据不同项目进行重写
                    dataType: "json",
                    data: { "txtName": value },
                    async: false,
                    success: function (data) {
                        data0 = !data;
                    }
                });
            } else {
                param[2] = "请输入" + param[0] + "-" + param[1] + "位字符.";
                return false;
            }

            param[2] = "用户名称已存在.";
            return data0;
        },
        message: "{2}"
    }
});

//基于EasyUI验证规则重写
$.extend($.fn.validatebox.defaults.rules, {
    email: {
        validator: function (value) {
            return /^[a-zA-Z0-9_+.-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/i.test($.trim(value));
        },
        message: '电子邮箱格式错误.'
    },
    idcard: {// 验证身份证
        validator: function (value) {
            return /^\d{18}(\d{2}[A-Za-z0-9])?$/i.test(value);
        },
        message: '身份证号码格式不正确'
    },
    minLength: {
        validator: function (value, param) {
            return value.length >= param[0];
        },
        message: '请输入至少（2）个字符.'
    },
    maxLength: {
        validator: function (value, param) {
            return param[0] >= value.length;
        },
        message: '请输入最大{0}位字符.'
    },
    length: {
        validator: function (value, param) {
            var len = $.trim(value).length;
            return len >= param[0] && len <= param[1];
        },
        message: "请输入{0}-{1}位字符."
    },
    phone: {// 验证电话号码
        validator: function (value) {
            return /^((0\d{2,3})-)(\d{7,8})?$/i.test(value);
        },
        message: '格式不正确,请使用下面格式:020-88888888'
    },
    mobile: {// 验证手机号码
        validator: function (value) {
            return /^(13|15|18|14)\d{9}$/i.test(value);
        },
        message: '手机号码格式不正确'
    },
    phoneOrmobile: {//验证座机号或是手机号
        validator: function (value) {
            return /^[\d]{3}-[\d]{8}$|^[\d]{4}-[\d]{7}$|^[\d]{11}$|^[\s]*$/i.test(value);
        },
        message: '格式不正确,请使用下面格式:020-88888888或是xxxxxxxxxxx'
    },
    notletter: {//即验证手机号又验证座机号
        validator: function (value) {
            return /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/i.test(value);
        },
        message: '格式不正确,请输入正确的联系方式!'
    },
    intOrFloat: {// 验证整数或小数
        validator: function (value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message: '请输入数字，并确保格式正确'
    },
    currency: {// 验证货币
        validator: function (value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message: '货币格式不正确'
    },
    qq: {// 验证QQ,从10000开始
        validator: function (value) {
            return /^[1-9]\d{4,9}$/i.test(value);
        },
        message: 'QQ号码格式不正确'
    },
    integer: {// 验证整数 可正负数
        validator: function (value) {
            //return /^[+]?[1-9]+\d*$/i.test(value);

            return /^([+]?[0-9])|([-]?[0-9])+\d*$/i.test(value);
        },
        message: '请输入整数'
    },
    age: {// 验证年龄
        validator: function (value) {
            return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/i.test(value);
        },
        message: '年龄必须是0到120之间的整数'
    },
    fen: {
        validator: function (value) {
            return /^([1-9]\d?|100)$/i.test(value);
        },
        message: '分值必须是1到100之间的整数'

    },

    year: {
        validator: function (value) {
            return /^\d{4}$/.test(value);
        },
        message: '必须是年份的格式'

    },

    chinese: {// 验证中文
        validator: function (value) {
            return /^[\Α-\￥]+$/i.test(value);
        },
        message: '请输入中文'
    },
    english: {// 验证英语
        validator: function (value) {
            return /^[A-Za-z]+$/i.test(value);
        },
        message: '请输入英文'
    },
    unnormal: {// 验证是否包含空格和非法字符
        validator: function (value) {
            return /.+/i.test(value);
        },
        message: '输入值不能为空和包含其他非法字符'
    },
    username: {// 验证用户名
        validator: function (value) {
            return /^[A-Z]{0,7}$/i.test(value);
        },
        message: '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
    },
    faxno: {// 验证传真
        validator: function (value) {
            //            return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/i.test(value);
            return /^((\d2,3)|(\d{3}\-))?(0\d2,3|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '传真号码不正确'
    },
    zip: {// 验证邮政编码
        validator: function (value) {
            return /^[1-9][0-9]{5}$/i.test(value);
        },
        message: '邮政编码格式不正确'
    },
    ip: {// 验证IP地址
        validator: function (value) {
            return /d+.d+.d+.d+/i.test(value);
        },
        message: 'IP地址格式不正确'
    },
    web: {
        validator: function (value) {
            return /^(http[s]{0,1}|ftp):\/\//i.test($.trim(value));
        },
        message: '网址格式错误.'
    },
    name: {// 验证姓名，可以是中文或英文
        validator: function (value) {
            return /^[\Α-\￥]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);
        },
        message: '请输入姓名'
    },
    date: {// 验证姓名，可以是中文或英文
        validator: function (value) {
            //格式yyyy-MM-dd或yyyy-M-d
            return /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29))$/i.test(value);
        },
        message: '请输入合适的日期格式'
    },
    //date: {
    //    validator: function (value) {
    //        return /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/i.test($.trim(value));
    //    },
    //    message: '曰期格式错误,如2012-09-11.'
    //}
    msn: {
        validator: function (value) {
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        },
        message: '请输入有效的msn账号(例：abc@hotnail(msn/live).com)'
    },
    //same: {
    //    validator: function (value, param) {
    //        if ($("#" + param[0]).val() != "" && value != "") {
    //            return $("#" + param[0]).val() == value;
    //        } else {
    //            return true;
    //        }
    //    },
    //    message: '两次输入的密码不一致！'
    //},
    eqPassword: {/* 扩展验证两次密码 */
        validator: function (value, param) {
            return value == $(param[0]).val();
        },
        message: '密码不一致！'
    },

    mdNew: {
        validator: function (value, param) {
            startTime2 = $(param[0]).datebox('getValue');
            if (startTime2 == "") {
                return true;
            } else {
                var d1 = $.fn.datebox.defaults.parser(startTime2);
                var d2 = $.fn.datebox.defaults.parser(value);
                varify = d2 <= d1;
                return varify;
            }

        },
        message: '结束时间要小于开始时间！'
    }
});

/*
*	其他扩展
*/
$.parser.auto = false;
$(function () {
    $.messager.progress({
        text: '页面加载中....',
        interval: 100
    });
    $.parser.parse(window.document);
    window.setTimeout(function () {
        $.messager.progress('close');
        if (self != parent) {
            window.setTimeout(function () {
                parent.$.messager.progress('close');
            }, 500);
        }
    }, 1);
    $.parser.auto = true;
});

$.fn.panel.defaults.onBeforeDestroy = function () {/* tab关闭时回收内存 */
    var frame = $('iframe', this);
    try {
        if (frame.length > 0) {
            frame[0].contentWindow.document.write('');
            frame[0].contentWindow.close();
            frame.remove();
            if ($.browser.msie) {
                CollectGarbage();
            }
        } else {
            $(this).find('.combo-f').each(function () {
                var panel = $(this).data().combo.panel;
                panel.panel('destroy');
            });
        }
    } catch (e) {
    }
};

$.fn.panel.defaults.loadingMessage = '数据加载中，请稍候....';
$.fn.datagrid.defaults.loadMsg = '数据加载中，请稍候....';

var easyuiErrorFunction = function (XMLHttpRequest) {
    /* $.messager.progress('close'); */
    /* alert(XMLHttpRequest.responseText.split('<script')[0]); */
    $.messager.alert('错误', XMLHttpRequest.responseText.split('<script')[0]);
};
$.fn.datagrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.treegrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.combogrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.combobox.defaults.onLoadError = easyuiErrorFunction;
$.fn.form.defaults.onLoadError = easyuiErrorFunction;

//var easyuiPanelOnMove = function (left, top) {/* 防止超出浏览器边界 */
//	if (left < 0) {
//		$(this).window('move', {
//			left: 1
//		});
//	}
//	if (top < 0) {
//		$(this).window('move', {
//			top: 1
//		});
//	}
//};
//$.fn.panel.defaults.onMove = easyuiPanelOnMove;
//$.fn.window.defaults.onMove = easyuiPanelOnMove;
//$.fn.dialog.defaults.onMove = easyuiPanelOnMove;

//重写editors（做为demo，以后可以根据这个去重写）
$.extend($.fn.datagrid.defaults.editors, {
    combocheckboxtree: {
        init: function (container, options) {
            var editor = $('<input/>').appendTo(container);
            options.multiple = true;
            editor.combotree(options);
            return editor;
        },
        destroy: function (target) {
            $(target).combotree('destroy');
        },
        getValue: function (target) {
            return $(target).combotree('getValues').join(',');
        },
        setValue: function (target, value) {
            $(target).combotree('setValues', sy.getList(value));
        },
        resize: function (target, width) {
            $(target).combotree('resize', width);
        }
    }
});

