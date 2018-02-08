
//查询扩展
(function ($) {
    var advancedQueryButtonCache = {}, advancedExportButtonCache = {};
    var advancedQueryButton = function (p_options) {
        var opt = this._setOptions(p_options);
        this.ClientID = opt.ClientID;
        this.PanelWidth = opt.PanelWidth;
        this.PanelHeight = opt.PanelHeight;
        this.QueryDataGrid = $(opt.QueryDataGridSelector);
      
        this.QueryButtonContainer = $("#" + this.ClientID + "_btn_query_container");
        this.QuickQueryButton = $("#" + this.ClientID + "_btn_quick_query");
        this.AdvancedQueryButton = $("#" + this.ClientID + "_btn_advanced_query");
        this.AdvancedQueryDownNarrowButton = $("#" + this.ClientID + "_btn_advanced_query_downarrow");
        this.AdvancedQueryPanel = $("#" + this.ClientID + "_panel_advanced_search");
        this.AdvancedQueryShadow = $("#" + this.ClientID + "_menu_shadow");
        this.AdvancedQueryPanelCloseButton = $("#" + this.ClientID + "_btn_close");
        this.AdvancedQueryItemsContainer = $("#" + this.ClientID + "_query_items");
        this.AdvancedQueryResetButton = $("#" + this.ClientID + "_btn_advanced_clear");
        this.Toolbar = $("#" + this.ClientID + "_toolbar");
        this.QueryDataGridRowMenusContainer = $("#" + this.ClientID + "_DataGridRowMenusContainer");
      
        this.Init();
    };

    advancedQueryButton.prototype = {
        _setOptions: function (options) {
            this.options = {
                ClientID: "AdvancedQueryButton1",
                QueryDataGridSelector: "#pagelist",
                PanelWidth: 300,
                PanelHeight: 283
            };
            return $.extend(this.options, options || {});
        },
        Init: function () {
            var _that = this;
            //高级查询按钮点击事件
            _that.AdvancedQueryDownNarrowButton.bind("click", function (event) {
                _that.ToggleAdvancedQueryPanel(true);
                event.stopPropagation();
            });
            //高级查询面板关闭按钮单击事件
            _that.AdvancedQueryPanelCloseButton.bind("click", function (event) {
                _that.ToggleAdvancedQueryPanel(false);
            });
            //高级查询面板重置（清空）按钮单击事件
            _that.AdvancedQueryResetButton.bind("click", function (event) {
                //置空所有高级查询框
                _that.ResetAdvancedQueryItems();
                //置空所有快速查询框，需要我们根据自己的页面填写。
                _that.ResetQuickQueryItems();
                //执行高级查询
                _that.AdvancedQuery();
            });
            //高级检索
            _that.AdvancedQueryButton.bind("click", function (event) {
                _that.AdvancedQuery();
            });
            //快速检索
            _that.QuickQueryButton.bind("click", function (event) {
                _that.ToggleAdvancedQueryPanel(false, "fade");
                _that.QuickQuery();
            });
            //--jiangf,2014-08-20,取消左键弹出功能菜单操作，改为右键弹出
            //对DataGrid初始化行单击展示菜单事件
            //var _datagird_onRowClick = _that.QueryDataGrid.datagrid("options").onClickRow;
            //_that.QueryDataGrid.datagrid("options").onClickRow = function(p_rowIndex, p_rowData) {
            //    var e = event || window.event;
            //    $(this).datagrid("selectRow", p_rowIndex);

            //    _that.QueryDataGridRowMenusContainer.menu('show', {
            //        left: e.clientX,
            //        top: e.clientY
            //    });
            //    _datagird_onRowClick(p_rowIndex, p_rowData);
            //}
            //-----------------end------------------
            var _menus = _that.QueryDataGridRowMenusContainer.find(".menu-item") || [];
            if (_menus.length > 0) {
                var _datagird_onRowContextMenu = _that.QueryDataGrid.datagrid("options").onRowContextMenu;
                _that.QueryDataGrid.datagrid("options").onRowContextMenu = function (e, p_rowIndex, p_rowData) {
                    $(this).datagrid("selectRow", p_rowIndex);
                    _datagird_onRowContextMenu(e, p_rowIndex, p_rowData);
                    _that.QueryDataGridRowMenusContainer.menu('show', {
                        left: e.clientX,
                        top: e.clientY
                    });

                    //停止DOM冒泡
                    e.stopPropagation();
                    //阻止右键默认事件
                    e.preventDefault();
                }
            }
           
            //对DataGrid的Footer填充样式
          /* if (_that.QueryDataGrid.datagrid("options").showFooter == true) {
                var _datagrid_onLoadSuccess = _that.QueryDataGrid.datagrid("options").onLoadSuccess;
                _that.QueryDataGrid.datagrid("options").onLoadSuccess = function (p_data) {
                    _datagrid_onLoadSuccess(p_data);
                    _that.QueryDataGrid.datagrid("getPanel").find('.datagrid-view2 .datagrid-footer').addClass("datagrid-footer-extention");
                }
            }*/
          
            //填充快速查询框的回车触发事件
            _that.Toolbar.find("input[name='quickly_query_item']").bind("keypress.enterKey", function (e) {
                var key = e.which;
                if (key == 13) {
                    _that.QuickQueryButton.trigger("click");
                }
                e.stopPropagation();
                //return false;
            });
          
            //填充高级查询框的回车触发事件
            _that.AdvancedQueryItemsContainer.find("input[name='advanced_query_item']").bind("keypress.enterKey", function (e) {
                var key = e.which;
                if (key == 13) {
                    _that.AdvancedQueryButton.trigger("click");
                }
                e.stopPropagation();
            });

        },
        //快速查询
        QuickQuery: function () {
            var _that = this;
            var _query_items = _that.Toolbar.find("input[name='quickly_query_item']");
            _that._query(_query_items);
        },
        //清除快速查询框数据
        ResetQuickQueryItems: function () {
            var _that = this;
            var _items = _that.Toolbar.find("input[name='quickly_query_item']");
            _that._reset(_items);
        },
        //重置高级查询框数据
        ResetAdvancedQueryItems: function () {
            var _that = this;
            //重置高级查询框内数据
            var _items = _that.AdvancedQueryItemsContainer.find("input[name='advanced_query_item']");
            _that._reset(_items);
        },
        //高级查询
        AdvancedQuery: function () {
            var _that = this;
            var _query_items = _that.AdvancedQueryItemsContainer.find("input[name='advanced_query_item']");
            _that._query(_query_items);
        },
        _query: function (p_queryitems) {
            var _that = this;
            var _requestQueryItems = {};
            //JSON实体传递格式：{ QueryItem: { Name: _columnname, Title: "", ItemType: _columntype }, CurrentValue: "", MaxValue: "", MinValue: "" }
            p_queryitems.each(function () {
                //---------检索规则：String-DateTime||Int-Decimal||DropDownList
                var _columnname = $(this).attr("columnname") || $(this).prev().attr("columnname") || $(this).parent().prev().attr("columnname");
                var _columntype = $(this).attr("columntype") || $(this).prev().attr("columntype") || $(this).parent().prev().attr("columntype");
                var _value = $.trim($(this).val());
                switch (_columntype) {
                    //对于Decimal、Int、DateTime类型的数据，都是存在Begin和End的，分别存储在MinValue和MaxValue中。                                                                                                                                                                                                                                                                                                                                                                                                        
                    case "Decimal":
                    case "Int":
                    case "DateTime":
                        var _tag = _columntype == "DateTime" ? $(this).attr("tag") : $(this).prev().attr("tag");
                        var _requestQueryItemsLength = _requestQueryItems.length;
                        var minMaxValue = {};
                        if (_tag == "begin") {
                            minMaxValue.MinValue = _value;
                            if (_columntype == "DateTime" && _value.length > 0) {
                                minMaxValue.MinValue = minMaxValue.MinValue + " 00:00:00";
                            }
                        } else if (_tag == "end") {
                            minMaxValue.MaxValue = _value;
                            if (_columntype == "DateTime" && _value.length > 0) {
                                minMaxValue.MaxValue = minMaxValue.MaxValue + " 23:59:59";
                            }
                        }
                        var _requestItem = _requestQueryItems[_columnname] || { Name: _columnname, Title: "", ItemType: _columntype, CurrentValue: "", MinValue: "", MinValue: "" };
                        _requestQueryItems[_columnname] = $.extend(_requestItem, minMaxValue);
                        _requestQueryItems[_columnname].CurrentValue = _requestQueryItems[_columnname].MinValue + _requestQueryItems[_columnname].MaxValue;
                        break;
                    case "DropDownList":
                        var _reqeustItem = { Name: _columnname, Title: "", ItemType: _columntype, CurrentValue: _value, MaxValue: "", MinValue: "" };
                        _requestQueryItems[_columnname] = _reqeustItem;
                        break;
                    case "CheckBoxList":
                        var _requestItem = _requestQueryItems[_columnname] || { Name: _columnname, Title: "", ItemType: _columntype, CurrentValue: "", MinValue: "", MinValue: "" };
                        var _checked = $(this).attr("checked") == "checked" ? true : false;
                        if (_checked) {
                            var _tag = $(this).attr("tag");
                            var _checkBoxList = _requestItem.CurrentValue.length > 0 ? _requestItem.CurrentValue.split(",") : [];
                            _checkBoxList.push(_tag);
                            _requestItem.CurrentValue = _checkBoxList.join(",");

                        }
                        _requestQueryItems[_columnname] = _requestItem;
                        break;
                    default:
                        var _reqeustItem = { Name: _columnname, Title: "", ItemType: _columntype, CurrentValue: _value, MaxValue: "", MinValue: "" };
                        _requestQueryItems[_columnname] = _reqeustItem;
                        break;
                }
            });
            var _jsonObj = [];
            for (var i in _requestQueryItems) {
                _jsonObj.push(_requestQueryItems[i]);
            }
            _that.QueryDataGrid.datagrid("options").queryParams.RequestQueryItems = $.toJSON(_jsonObj);
            _that.QueryDataGrid.datagrid("load");
        },
        _reset: function (p_items) {
            p_items.each(function () {
                var _columnname = $(this).attr("columnname") || $(this).prev().attr("columnname");
                var _columntype = $(this).attr("columntype") || $(this).prev().attr("columntype");
                switch (_columntype) {
                    case "Int":
                    case "Decimal":
                        $(this).prev().numberbox("clear");
                        break;
                    case "CheckBoxList":
                        $(this).removeAttr("checked");
                        break;
                    default:
                        $(this).val("");
                        break;
                }
            });
        },
        //切换面板开关状态，p_open:true/false：开/关
        ToggleAdvancedQueryPanel: function (p_open, p_animate) {
            var _that = this;
            var _animate = p_animate || "slide";
            if (p_open) {
                var _left = _that.QueryButtonContainer.offset().left;
                var _top = _that.QueryButtonContainer.offset().top;
                var _width = _that.QueryButtonContainer.width();
                var _height = _that.QueryButtonContainer.height();
                _that.AdvancedQueryPanel.css({ position: "absolute", width: _that.PanelWidth + "px", height: _that.PanelHeight + "px", left: (_left - (_that.PanelWidth - _width) - 14) + "px", top: (_top + _height) + "px", zIndex: "8000" })
                _that.AdvancedQueryShadow.css({ position: "absolute", width: (_that.PanelWidth + 22) + "px", height: (_that.PanelHeight + 22) + "px", left: (_left - (_that.PanelWidth - _width) - 14) + "px", top: (_top + _height) + "px", zIndex: "7999" });
                if (_animate == "slide") {
                    _that.AdvancedQueryPanel.slideDown();
                    _that.AdvancedQueryShadow.slideDown();
                }
                else if (_animate == "fade") {
                    _that.AdvancedQueryPanel.fadeIn();
                    _that.AdvancedQueryShadow.fadeIn();
                }
                $("body").bind("mousedown.toggleadvancedquerypanel_" + _that.ClientID, { View: _that }, _that.OnToggleAdvancedQueryPanel);
            } else {
                if (_animate == "slide") {
                    _that.AdvancedQueryPanel.slideUp();
                    _that.AdvancedQueryShadow.slideUp();
                }
                else if (_animate == "fade") {
                    _that.AdvancedQueryPanel.fadeOut();
                    _that.AdvancedQueryShadow.fadeOut();
                }
                $("body").unbind("mousedown.toggleadvancedquerypanel_" + _that.ClientID, _that.OnToggleAdvancedQueryPanel);
            }
        },
        OnToggleAdvancedQueryPanel: function (event) {
            var _that = event.data.View;
            if (!(event.target.id == _that.AdvancedQueryPanelCloseButton.attr("id")
            || event.target.id == _that.AdvancedQueryButton.attr("id")
            || event.target.id == _that.AdvancedQueryResetButton.attr("id")
            || $(event.target).parents(".combo-panel").length > 0
                //|| $(event.target).parents(_that.CategorySearchMenus.selector).length > 0
            || $(event.target).parents(_that.AdvancedQueryPanel.selector).length > 0)) {
                _that.ToggleAdvancedQueryPanel(false);
            }
        }
    };

    //导出扩展
    var exportExtention = function (p_options) {
        var opt = this._setOptions(p_options);
        this.SelectItemsPanel = opt.SelectItemsPanel;
        this.SelectItemsContentPanel = opt.SelectItemsContentPanel;
        this.PageList = opt.PageList;
        this.CallBackItems = opt.CallBackItems;
        this.HidExportBtn = opt.HidExportBtn;
        this.ExportBtn = opt.ExportBtn;
        this.BtnExportSubmit = opt.BtnExportSubmit;
        this.HidDataGridRequestQueryItemTextBox = opt.HidDataGridRequestQueryItemTextBox;
        this.HidDataGridPageParameterTextBox = opt.HidDataGridPageParameterTextBox;
        //this.SelectItemsPanel.window("close");
        var _that = this;
        if (_that.ExportBtn != null) {
            _that.ExportBtn.bind('click', function () {
                _that.openSelectItemsPanel();
            });
        }

        if (_that.BtnExportSubmit != null) {
            _that.BtnExportSubmit.bind("click", function () {
                _that.Export();
            })
        }
        this.ExportTitle = this.SelectItemsContentPanel.find("fieldset>legend").text();
    };
    exportExtention.prototype = {
        _setOptions: function (options) {
            this.options = {
                SelectItemsPanel: null,
                SelectItemsContentPanel: null,
                PageList: null,
                CallBackItems: null,
                HidExportBtn: null,
                ExportBtn: null,
                BtnExportSubmit: null,
                HidDataGridRequestQueryItemTextBox: null,
                HidDataGridPageParameterTextBox: null
            };
            return $.extend(this.options, options || {});
        },
        openSelectItemsPanel: function () {
            var _that = this;
            if (_that.PageList.datagrid("getData").rows == 0) {
                sendTips("记录为空，不可导出！", 2);
                return;
            }
            $.dialog({
                id: 'exportExtention'+Math.random(),
                content: _that.SelectItemsPanel.show(),
                title: '请选择 ' + _that.ExportTitle + ' 导出项',
                lock: true,
                min: false,
                max: false,
                button:
                [
                    {
                        name: '导出',
                        focus: true,
                        callback: function () {
                            _that.Export();
                        }
                    }, {
                        name: '取消',
                        callback: function () {
                            this.content
                        }
                    }
                ],
                close: function () {
                    this.hide();
                    return false;
                }
            });
        },
        Export: function () {
            if (this.PageList.datagrid("getData").rows == 0) {
                sendTips("记录为空，不可导出！", 2);
                return;
            }
            var _RequestQueryItems = this.PageList.datagrid("options").queryParams.RequestQueryItems;
            this.HidDataGridRequestQueryItemTextBox.val(_RequestQueryItems);
            var pageParameter = {
                PageSize: this.PageList.datagrid("options").pageSize && parseInt(this.PageList.datagrid("options").pageSize) > 0 ? parseInt(this.PageList.datagrid("options").pageSize) : 15,
                PageIndex: this.PageList.datagrid("options").pageNumber && parseInt(this.PageList.datagrid("options").pageNumber) > 0 ? parseInt(this.PageList.datagrid("options").pageNumber) : 1,
                OrderMode: this.PageList.datagrid("options").sortOrder == "asc" ? 0 : 1,
                OrderField: this.PageList.datagrid("options").sortName && this.PageList.datagrid("options").sortName.length > 0 ? this.PageList.datagrid("options").sortName : ""
            }
            this.HidDataGridPageParameterTextBox.val($.toJSON(pageParameter));
            var key = "";
            var value = "";
            var items;
            this.SelectItemsContentPanel.find("input:checked").each(function () {
                key = $(this).val();
                value = $(this).attr("title");
                items = items != undefined && items != "" ? items + "," + key + ":" + value : key + ":" + value;
            });
            this.CallBackItems.val(items);
            this.HidExportBtn.trigger('click');
        }
    };
    $.fn.advanceExtention = {
        QueryButton: {
            init: function (p_setting) {
            	
                var _advancedQueryButton = new advancedQueryButton(p_setting);
                advancedQueryButtonCache[p_setting.ClientID] = _advancedQueryButton;
            	
            },
            get: function (p_clientId) {
                return advancedQueryButtonCache[p_clientId];
            }
        },
        ExportButton: {
            init: function (p_setting) {
                var _advancedExportButton = new exportExtention(p_setting);
                advancedExportButtonCache[p_setting.ClientID] = _advancedExportButton;
            },
            get: function (p_clientId) {
                return advancedExportButtonCache[p_clientId];
            }
        }
    };
})(jQuery);
