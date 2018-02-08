(function ($) {
    var data = [];
    var _ssCheckBox = function (p_options) {
        var opt = this._setOptions(p_options);
        this.ClientID = opt.ClientID;
        this.ContainerID = opt.ContainerID;
        this.DataGridUniqueID = opt.DataGridUniqueID;
        this.TotalPriceColumnName = opt.TotalPriceColumnName;
        this.TotalCountColumnName = opt.TotalCountColumnName;
        this.ShowText = opt.ShowText;
        this.DataGridOptions = opt.DataGridOptions;
        this.Searcher = $("#" + opt.ClientID);
        this.DataGrid = $("#" + opt.DataGridUniqueID);
        this.SearcherContainer = $("#" + opt.ContainerID);
        this.Init();
    };
    _ssCheckBox.prototype = {
        _setOptions: function (options) {
            this.options = {
                ClientID: "searcher_onlyShowSelectedAssets",
                ContainerID: "",
                DataGridUniqueID: "pagelist",
                TotalPriceColumnName: "Price",
                TotalCountColumnName: "ServiceLife",
                ShowText: "只显示已选中资产",
                DataGridOptions: {}

            };
            return $.extend(this.options, options || {});
        },
        Init: function () {
            var _that = this;
            //向Container中注入HTML控件，绑定CheckBox框单击事件
            var _searcher = "<a class=\"easyui-linkbutton\" data-options=\"iconCls:'icon-checkboxon',plain:true\" href=\"javascript:void(0);return false;\" id=\"" + _that.ClientID + "\">" + _that.ShowText + "</a>";
            _that.SearcherContainer.append(_searcher);
            $.parser.parse(_that.SearcherContainer);
            _that.Searcher = _that.SearcherContainer.find(_that.Searcher.selector);
            _that.Searcher.bind({
                click: function () {
                    _that.onlyShowSelectedAssets();
                }
            });
            _that.DataGrid.data({
                ssCheckBox: _that
            });
            //向DataGrid中注入相对应的响应事件
            var _datagrid_options = $.extend(_that.DataGridOptions, {
                showFooter: true,
                onSelect: function (rowIndex, rowData) {
                    _that.reloadFooter(_that.DataGrid);
                },
                onUnselect: function (rows) {
                    _that.reloadFooter(_that.DataGrid);
                },
                onSelectAll: function (rows) {
                    _that.reloadFooter(_that.DataGrid);
                },
                onUnselectAll: function (rows) {
                    _that.reloadFooter(_that.DataGrid);
                },
                loader: function (param, success, error) {
                    var opts = $(this).datagrid("options");
                    if (!opts.url) {
                        return false;
                    }
                    var _onlyShowSelectedAssets = false;
                    var _that = $(this).data("ssCheckBox");
                    _onlyShowSelectedAssets = _that.Searcher.linkbutton("options").iconCls == "icon-checkbox";
                    if (_onlyShowSelectedAssets) {
                        var _selections = _that.DataGrid.data().datagrid.SelectedRows;
                        if (_selections) {
                            success(_that.bulidData({ total: _selections.length, rows: _selections }, param));
                        }
                    } else {
                        $.ajax({
                            type: opts.method, url: opts.url, data: param, dataType: "json", success: function (data) {
                                success(data);
                            }, error: function () {
                                error.apply(this, arguments);
                            }
                        });
                    }
                },
                onLoadSuccess: function (p_data) {
                    var _panel = $(this).datagrid('getPanel');
                    var _tr = _panel.find('.datagrid-view2 .datagrid-body tr');
                    _tr.each(function () {
                        $.parser.parse($(this).children("td:last"));
                    });
                    var p = $(this).datagrid('getPager');
                    $(p).pagination({
                        beforePageText: '第',
                        afterPageText: '页    共 {pages} 页',
                        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录。'
                    });
                    var _that = $(this).data("ssCheckBox");
                    _that.reloadFooter($(this));
                }
            });
            _that.DataGrid.datagrid(_datagrid_options);
            var p = _that.DataGrid.datagrid('getPager');
            $(p).pagination({
                beforePageText: '第',
                afterPageText: '页    共 {pages} 页',
                displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录。'
            });

        },
        bulidData: function (data, param) {
            var temp = $.extend({}, data);
            var tempRows = [];
            var start = (param.page - 1) * parseInt(param.rows);
            var end = start + parseInt(param.rows);
            var rows = data.rows;
            for (var i = start; i < end; i++) {
                if (rows[i]) {
                    tempRows.push(rows[i]);
                } else {
                    break;
                }
            }
            temp.rows = tempRows;
            return temp;
        },

        reloadFooter: function () {
            var _that = this;
            var _selections = _that.DataGrid.datagrid("getSelections");
            var _len = _selections.length || 0;
            var _totalPrice = 0;
            if (_len > 0) {
                for (var _i = 0; _i < _len; _i++) {
                    _totalPrice += parseFloat(_selections[_i].Price);
                }
            }
            var rows = _that.DataGrid.datagrid('getFooterRows');
            rows[0][_that.TotalPriceColumnName] = _totalPrice;
            rows[0][_that.TotalCountColumnName] = _len;
            _that.DataGrid.datagrid('reloadFooter');
            _that.DataGrid.datagrid("options").finder.getTr(_that.DataGrid[0], "", "allfooter", 2).css({
                "background-color": "#a6d1ef"
            }).find("div").css({ "font-weight": "bold" });
        },

        onlyShowSelectedAssets: function () {
            var _that = this;
            var _onlyShowSelectedAssets = false;
            _onlyShowSelectedAssets = _that.Searcher.linkbutton("options").iconCls == "icon-checkboxon";
            if (_onlyShowSelectedAssets) {
                var _selections = _that.DataGrid.datagrid("getSelections");
                var _len = _selections.length || 0;
                if (_len > 0) {
                    _that.DataGrid.data().datagrid.SelectedRows = $.map(_selections, function (item) { return item; });
                    _that.DataGrid.datagrid("load");
                    _that.Searcher.linkbutton("options").iconCls = "icon-checkbox";
                } else {
                    parent.sendTargetTips(parent, "没有选中任何资产信息.", 1);
                }

            } else {
                _that.DataGrid.datagrid("load");
                _that.Searcher.linkbutton("options").iconCls = "icon-checkboxon";
            }
            $.parser.parse(_that.SearcherContainer);
        }
    };


    $.fn.ssCheckBox = {
        init: function (p_options) {
            var _checkbox = new _ssCheckBox(p_options);
            data[p_options.ClientID] = _checkbox;
        },
        getSSCheckBox: function (p_clientId) {
            return data[p_clientId];
        }
    }
})(jQuery)