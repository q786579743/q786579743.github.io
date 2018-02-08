(function ($) {
    var settings = {}, controls = {}, datas = {},
    _const = {
        selectTab: {
            category: 0,
            commonUse: 1
        },
        viewMode: {
            SelectBox: 0,
            PanelTree: 1
        }
    },
    _setting = {
        ClientID: "",
        FilterSource: 0, //Default
        SearchMode: 0, //UniqueID
        LowValueAssetCategoryInfoFilter: true,
        MultipleSelect: false,
        SourceFiltted: false,
        PanelWidth: 272,
        PanelHeight: 300,
        SelectBoxWidth: 270,
        SelectTab: _const.selectTab.category,
        ViewMode: _const.viewMode.SelectBox,
        TreeNodeOnClick: function (_view, event, treeId, treeNode) { return true; }
    },
    _controls = {
        init: function (p_setting) {
            var _control = {};
            _control.ClientID = p_setting.ClientID;
            _control.SelectBox = $("#" + _control.ClientID + "_AssetCategorySelectBox");
            _control.SelectTabs = $("#" + _control.ClientID + "_AssetsCategory_SelectTabs");
            _control.CategorySearchBox = $("#" + _control.ClientID + "_Category_SearchBox");
            _control.CategorySearchMenus = $("#" + _control.ClientID + "_Category_Search_Menus");
            _control.CategoryTreeContainer = $("#" + _control.ClientID + "_AssetsCategory_Category_TreeContainer");
            _control.CommonUseTreeContainer = $("#" + _control.ClientID + "_AssetsCategory_CommonUse_TreeContainer");
            _control.CategoryTab = $("#" + _control.ClientID + "_Tab_Category");
            _control.CommonUseTab = $("#" + _control.ClientID + "_Tab_CommonUse");
            _control.BtnFilterHasExsits = $("#" + _control.ClientID + "_btnFilter");
            _control.BtnExpandAllNodes = $("#" + _control.ClientID + "_btnExpandAll");
            _control.ContextMenu = $("#" + _control.ClientID + "_contextmenu");
            _control.BtnSelectValueClear = $("#" + _control.ClientID + "_clearValue");
            return _control;
        },
        getClientId: function (p_jQueryControl) {
            return p_jQueryControl.selector.replace("#", "");
        }
    },
    //工具
	tools = {
	    clone: function (obj) {
	        if (obj === null) return null;
	        var o = tools.isArray(obj) ? [] : {};
	        for (var i in obj) {
	            o[i] = (obj[i] instanceof Date) ? new Date(obj[i].getTime()) : (typeof obj[i] === "object" ? arguments.callee(obj[i]) : obj[i]);
	        }
	        return o;
	    },
	    isArray: function (arr) {
	        return Object.prototype.toString.apply(arr) === "[object Array]";
	    }
	},
    data = {
        getData: function (p_clientId) {
            var tmpData = datas[p_clientId] || [];
            return tmpData;
        },
        setData: function (p_clientId, p_value) {
            datas[p_clientId] = p_value;
        },
        cloneTreeNode: function (p_treeNode) {
            return {
                ClassCode: p_treeNode.ClassCode,
                ClassName: p_treeNode.ClassName,
                UniqueID: p_treeNode.UniqueID,
                AssetsCategoryName: p_treeNode.AssetsCategoryName,
                ParentAssetsCategoryUniqueID: p_treeNode.ParentAssetsCategoryUniqueID,
                Level: p_treeNode.Level,
                FormatterCategoryName: p_treeNode.FormatterCategoryName,
                ServiceLife: p_treeNode.ServiceLife,
                Unit: p_treeNode.Unit,
                LabelTypeCode: p_treeNode.LabelTypeCode,
                LabelTypeValue: p_treeNode.LabelTypeValue,
                LabelCount: p_treeNode.LabelCount,
                MaintenanceCycle: p_treeNode.MaintenanceCycle,
                DepreciationMethodCode: p_treeNode.DepreciationMethodCode,
                DepreciationMethodValue: p_treeNode.DepreciationMethodValue,
                Config: p_treeNode.Config,
                Remark: p_treeNode.Remark,
                HasChildren: p_treeNode.HasChildren,
                ParentAssetsCategoryUniqueIDs: p_treeNode.ParentAssetsCategoryUniqueIDs,
                AssetsCategoryUniqueIDLinkPath: p_treeNode.AssetsCategoryUniqueIDLinkPath
            };
        }
    },
    _zTree = {
        beforeClick: function (_view, tabIndex, treeId, treeNode, clickFlag) {
            if (!_view.setting.MultipleSelect && treeNode.children == undefined) {
                var _tree = tabIndex == _const.selectTab.category ? $.fn.zTree.getZTreeObj(_controls.getClientId(_view.controls.CategoryTreeContainer)) : $.fn.zTree.getZTreeObj(_controls.getClientId(_view.controls.CommonUseTreeContainer));
                var _selectedNode = _tree.getSelectedNodes();
                if (_selectedNode && _selectedNode.length > 0 && _selectedNode[0].UniqueID == treeNode.UniqueID) {
                    _tree.cancelSelectedNode(treeNode);
                    _view.controls.SelectBox.val("");
                    data.setData(_view.setting.ClientID, []);
                    _view.SelectBoxValueChangedHandler();
                    return false;
                }
            }
            return true;
        },
        onClick: function (_view, event, treeId, treeNode) {
            if (!_view.setting.MultipleSelect && treeNode.children == undefined) {
                _view.controls.SelectBox.val(treeNode.FormatterCategoryName);
                data.setData(_view.setting.ClientID, [data.cloneTreeNode(treeNode)]);
            }
            _view.SelectBoxValueChangedHandler();
        },
        onCheck: function (_view, tabIndex, e, treeId, treeNode) {
            if (_view.setting.MultipleSelect) {
                var _tree = tabIndex == _const.selectTab.category ? $.fn.zTree.getZTreeObj(_controls.getClientId(_view.controls.CategoryTreeContainer)) : $.fn.zTree.getZTreeObj(_controls.getClientId(_view.controls.CommonUseTreeContainer));
                var nodes = _tree.getCheckedNodes(true);
                var v = [];
                var _tmpData = [];
                for (var i = 0, l = nodes.length; i < l; i++) {
                    var _node = nodes[i];
                    if (_node.children == undefined) {
                        v.push(_node.FormatterCategoryName);
                        _tmpData.push(data.cloneTreeNode(_node));
                    }
                }
                if (v.length > 0) {
                    _view.controls.SelectBox.val(v.join(","));
                } else {
                    _view.controls.SelectBox.val("");
                }
                data.setData(_view.setting.ClientID, _tmpData);
            }
            _view.SelectBoxValueChangedHandler();
        },
        onRightClick: function (_view, tabIndex, event, treeId, treeNode) {
            if (treeNode != undefined && treeNode.children == undefined) {
                var _tree = tabIndex == _const.selectTab.category ? $.fn.zTree.getZTreeObj(_controls.getClientId(_view.controls.CategoryTreeContainer)) : $.fn.zTree.getZTreeObj(_controls.getClientId(_view.controls.CommonUseTreeContainer));
                _tree.selectNode(treeNode, false);
                _view.controls.ContextMenu.menu('show', {
                    left: event.pageX,
                    top: event.pageY
                });
            }
        }
    },
    view = function () {
        this.controls = {};
        this.setting = {};
    };
    view.prototype = {
        //Init
        init: function (p_setting, p_controls) {
            this.controls = p_controls;
            this.setting = p_setting;
            //初始化SelectBox
            this.initSelectBox();
            //初始化Tabs
            this.initTabs();
            switch (this.setting.ViewMode) {
                case _const.viewMode.SelectBox:
                    //隐藏Tabs
                    this.hideTabs();
                    break;
                case _const.viewMode.PanelTree:
                    //初始化Tabs
                    this.showTabs();
                    this.initTabsResize();
                    break;
            }

            //判断首先显示的Tab页签，首先显示哪个页签就会首先加载哪个页签的数据
            if (this.setting.SelectTab == _const.selectTab.category) {
                this.initCategoryTab();
                this.initCommonUseTab();
            } else {
                this.initCommonUseTab();
                this.initCategoryTab();
            }
        },
        //InitTabs
        initTabs: function () {
            var _view = this;
            var _selectedTabIndex = _view.setting.SelectTab;
            _view.controls.SelectTabs.tabs({
                width: _view.setting.PanelWidth,
                tabPosition: "bottom",
                onSelect: function (title, index) {
                    var _toolbar = $(this).find(".tabs-header>.tabs-wrap>.tabs");
                    if (_toolbar.find("li").length < 3) {
                        var _toolbars = [];
                        _toolbars.push("<li style=\"padding-top:2px;\">");
                        _toolbars.push("<a id=\"" + _controls.getClientId(_view.controls.BtnFilterHasExsits) + "\" href='javascript:void(0);return false;' class='easyui-linkbutton' data-options=\"iconCls:'icon-checkbox',plain:true\">仅显示已有分类</a>");
                        _toolbars.push("<a id=\"" + _controls.getClientId(_view.controls.BtnExpandAllNodes) + "\" href='javascript:void(0);return false;' class='easyui-linkbutton' data-options=\"iconCls:'icon-checkboxon',plain:true\">展开节点</a>");
                        _toolbars.push("</li>");
                        _toolbar.append(_toolbars.join(""));

                        $.parser.parse(_toolbar.find("li:eq(2)"));
                        _view.controls.BtnFilterHasExsits = $(_view.controls.BtnFilterHasExsits.selector);
                        _view.controls.BtnExpandAllNodes = $(_view.controls.BtnExpandAllNodes.selector);
                    }
                    var _li2 = _toolbar.find("li:eq(2)>a");
                    if (index == 0) {
                        _li2.eq(1).hide();
                        _li2.eq(0).show();
                        _view.initCategoryTreeContainer();
                    }
                    if (index == 1) {
                        _li2.eq(0).hide();
                        _li2.eq(1).show();
                        _view.initCommonUseTreeContainer();
                    }
                }
            });
            _view.controls.SelectTabs.tabs("select", _selectedTabIndex);
        },
        //显示Tabs
        showTabs: function () {
            var _view = this;
            switch (_view.setting.ViewMode) {
                case _const.viewMode.SelectBox:
                    {
                        var _offset = _view.controls.SelectBox.offset();
                        var _outerHeight = _view.controls.SelectBox.outerHeight();
                        var _maxZIndex = 10000;
                        _view.controls.SelectTabs.css({
                            position: "absolute",
                            left: _offset.left + "px",
                            top: (_offset.top + _outerHeight) + "px",
                            //height: _view.setting.PanelHeight,//不能添加Height，让其自动适应高度
                            visibility: "hidden", //"visible",
                            zIndex: _maxZIndex,
                            display: "block"
                        });
                        _view.initCategoryTreeContainer();
                        _view.initCommonUseTreeContainer();
                        _view.controls.SelectTabs.css({
                            visibility: "visible"
                        }).show();
                        $("body").bind("mousedown.selecttabs_" + _view.setting.ClientID, { View: _view }, _view.onBodyDown);
                    }
                    break;
                case _const.viewMode.PanelTree:
                    {
                        _view.controls.SelectTabs.css({
                            position: "static",
                            visibility: "visible",
                            display: "block"
                        });
                        _view.initCategoryTreeContainer();
                        _view.initCommonUseTreeContainer();
                    }
                    break;
            }

        },
        //隐藏Tabs
        hideTabs: function () {
            this.controls.SelectTabs.hide();
            $("body").unbind("mousedown.selecttabs_" + this.setting.ClientID, this.onBodyDown);
        },
        initTabsResize: function () {
            var _view = this;
            var _container = _view.controls.SelectTabs.parent();//获取SelectTabs的所在容器
            //var _resize = function (event) {
            //    var _height = _container.innerHeight();//获取容器的内部高度
            //    var _tabToolPanelHeight = _view.controls.SelectTabs.find(".tabs-header").outerHeight();//获取Tabs底部Header的外部高度
            //    _view.setting.PanelHeight = _height - _tabToolPanelHeight - 1;//此处减1是因为Tab的外框的Border-top=1
            //    _view.initCategoryTreeContainer();//重新初始化CategoryTreeTab的高度
            //    _view.initCommonUseTreeContainer();//重新初始化CommonUseTreeTab的高度
            //};
            //_resize();
            var _height = _container.innerHeight();//获取容器的内部高度
            var _tabToolPanelHeight = _view.controls.SelectTabs.find(".tabs-header").outerHeight();//获取Tabs底部Header的外部高度
            _view.setting.PanelHeight = _height - _tabToolPanelHeight - 1;//此处减1是因为Tab的外框的Border-top=1
            _view.initCategoryTreeContainer();//重新初始化CategoryTreeTab的高度
            _view.initCommonUseTreeContainer();//重新初始化CommonUseTreeTab的高度
            //$(_container).bind("resize.onSelectTabsResize_" + _view.setting.ClientID, _resize);
        },
        //初始化SelectBox点击事件
        initSelectBox: function () {
            var _view = this;
            switch (_view.setting.ViewMode) {
                case _const.viewMode.SelectBox:
                    {
                        _view.controls.SelectBox.css({
                            width: _view.setting.SelectBoxWidth + "px"
                        }).bind({
                            click: function () {
                                //显示Tabs
                                _view.showTabs();
                            }
                        });
                        _view.controls.BtnSelectValueClear.bind({
                            click: function (event) {
                                _view.clearSelectedValue();
                                $(this).hide();
                            }
                        });
                    }
                    break;
                case _const.viewMode.PanelTree:
                    {
                        _view.controls.SelectBox.hide();
                    }
                    break;
            }

        },
        initCategoryTab: function () {
            var _view = this;
            //初始化CategorySearchBox
            _view.initCategorySearchBox();
            _view.initCategoryTreeContainer();
            //第一次执行查询
            _view.categoryTreeQuery();
        },
        //初始化CategorySearchBox
        initCategorySearchBox: function () {
            var _view = this;
            //查询框绑定事件
            _view.controls.CategorySearchBox.searchbox({
                width: _view.setting.PanelWidth - 2,
                noborder: true,
                searcher: function (val, name) {
                    var m = _view.controls.CategorySearchBox.searchbox('menu');
                    var item = m.menu('findItem', name);
                    var id = item.id.replace(_view.setting.ClientID + "_menu_", "");
                    var _filter = _view.controls.BtnFilterHasExsits.linkbutton("options").iconCls == "icon-checkbox";
                    _view.search(id, val, _filter, function () { });
                },
                prompt: '资产分类名称'
            });
            //更新SearchBox的边框样式，去除左上右的边框，只留下部的边框
            _view.controls.CategorySearchBox.next().css({
                border: "none",
                "border-bottom": "solid 1px #95B8E7"
            })
            //仅显示已选资产分类绑定单击事件
            _view.controls.BtnFilterHasExsits.bind("click", function () {
                var _filter = $(this).linkbutton("options").iconCls == "icon-checkbox";
                if (_filter == true) {
                    $(this).linkbutton("options").iconCls = "icon-checkboxon";
                } else {
                    $(this).linkbutton("options").iconCls = "icon-checkbox";
                }
                $.parser.parse($(this).parent());
                _view.categoryTreeQuery();
            })
        },
        initCommonUseTab: function () {
            this.initCommonUseTree();
            this.initCommonUseTreeContainer();
        },
        initCommonUseTree: function () {
            var _view = this;
            var _data = {};
            _data[_view.setting.ClientID + "_AJAXR"] = "GetCommonUseTreeNodes";
            $.ajax({
                type: "POST",
                url: "?",
                data: _data,
                dataType: "json",
                success: function (nodes) {
                    var setting = {
                        check: {
                            enable: _view.setting.MultipleSelect
                        },
                        view: {
                            showIcon: false,
                            selectedMulti: false
                        },
                        data: {
                            key: {
                                name: "FormatterCategoryName"
                            },
                            simpleData: {
                                enable: true,
                                idKey: "UniqueID",
                                pIdKey: "ParentAssetsCategoryUniqueID",
                                rootPId: 0
                            }
                        },
                        callback: {
                            beforeClick: function (treeId, treeNode, clickFlag) {
                                return _zTree.beforeClick(_view, 1, treeId, treeNode, clickFlag);
                            },
                            onClick: function (event, treeId, treeNode) {
                                var _flag = true;
                                if ($.isFunction(_view.setting.TreeNodeOnClick)) {
                                    _flag = _view.setting.TreeNodeOnClick(event, treeId, treeNode);
                                }
                                if (_flag)
                                    _zTree.onClick(_view, event, treeId, treeNode);
                            },
                            onCheck: function (e, treeId, treeNode) {
                                _zTree.onCheck(_view, 1, e, treeId, treeNode);
                            }//,
                            //onRightClick: function (event, treeId, treeNode) {
                            //    _zTree.onRightClick(_view, 1, event, treeId, treeNode);
                            //}
                        }
                    };
                    $.fn.zTree.init(_view.controls.CommonUseTreeContainer, setting, nodes);
                }
            });
            //仅显示已选资产分类绑定单击事件
            _view.controls.BtnExpandAllNodes.bind("click", function () {
                var _filter = $(this).linkbutton("options").iconCls == "icon-checkbox";
                var zTree = $.fn.zTree.getZTreeObj(_controls.getClientId(_view.controls.CommonUseTreeContainer));
                var _nodes = zTree.getSelectedNodes();
                if (_filter == true) {
                    $(this).linkbutton("options").iconCls = "icon-checkboxon";
                    if (_nodes.length > 0) {
                        setTimeout(function () {
                            zTree.expandNode(_nodes[0], false, true, true);
                        }, 0);
                    } else {
                        setTimeout(function () {
                            zTree.expandAll(false);
                        }, 0);
                    }
                } else {
                    $(this).linkbutton("options").iconCls = "icon-checkbox";
                    if (_nodes.length > 0) {
                        setTimeout(function () {
                            zTree.expandNode(_nodes[0], true, true, true);
                        }, 0);
                    } else {
                        setTimeout(function () {
                            zTree.expandAll(true);
                        }, 0);
                    }
                }
                $.parser.parse($(this).parent());
            })
        },
        initCommonUseTreeContainer: function () {
            var _view = this;
            _view.controls.CommonUseTreeContainer.css({
                height: _view.setting.PanelHeight,
                "overflow": "auto"
            });
        },
        //查询
        categoryTreeQuery: function () {
            //自动触发查询事件，初始化资产分类树形结构
            this.controls.SelectTabs.find(".searchbox-button").trigger("click");
        },
        //初始化Tree所在容器的高度
        initCategoryTreeContainer: function () {
            var _view = this;
            var _height = _view.setting.PanelHeight - _view.controls.CategoryTreeContainer.prev().outerHeight();
            _view.controls.CategoryTreeContainer.css({
                height: _height,
                "overflow": "auto"
            });
        },
        //Body>mouseDown监控
        onBodyDown: function (event) {
            var _view = event.data.View;
            if (!(event.target.id == _controls.getClientId(_view.controls.SelectBox)
            || event.target.id == _view.controls.SelectTabs[0].id
            || $(event.target).parents(_view.controls.SelectTabs.selector).length > 0
            || $(event.target).parents(_view.controls.CategorySearchMenus.selector).length > 0
            || $(event.target).parents(_view.controls.ContextMenu.selector).length > 0)) {
                _view.hideTabs();
            }
        },
        SelectBoxValueChangedHandler: function () {
            var _view = this;
            if (data.getData(_view.setting.ClientID).length > 0) {
                var _offSet = _view.controls.SelectBox.offset();
                _view.controls.BtnSelectValueClear.css({
                    left: (_offSet.left + _view.controls.SelectBox.width() - 14) + "px",
                    top: _offSet.top + "px"
                }).show();
            } else {
                _view.controls.BtnSelectValueClear.hide();
            }
        },
        //执行查询
        search: function (p_uniqueId, p_assetsCategoryName, p_filter, p_callBack) {
            var _view = this;
            var _data = {};
            _data.UniqueID = p_uniqueId;
            _data.AssetsCategoryName = p_assetsCategoryName;
            _data.SourceFiltted = p_filter;
            _data[_view.setting.ClientID + "_AJAXR"] = "GetCategoryTreeNodes";
            var _search = function (p_callback) {
                $.ajax({
                    type: "POST",
                    url: "?",
                    data: _data,
                    dataType: "json",
                    success: function (nodes) {
                        var setting = {
                            check: {
                                enable: _view.setting.MultipleSelect
                            },
                            view: {
                                showIcon: false,
                                selectedMulti: false
                            },
                            data: {
                                key: {
                                    name: "FormatterCategoryName"
                                },
                                simpleData: {
                                    enable: true,
                                    idKey: "UniqueID",
                                    pIdKey: "ParentAssetsCategoryUniqueID",
                                    rootPId: 0
                                }
                            },
                            callback: {
                                beforeClick: function (treeId, treeNode, clickFlag) {
                                    return _zTree.beforeClick(_view, 0, treeId, treeNode, clickFlag);
                                },
                                onClick: function (event, treeId, treeNode) {
                                    var _flag = true;
                                    if ($.isFunction(_view.setting.TreeNodeOnClick)) {
                                        _flag = _view.setting.TreeNodeOnClick(event, treeId, treeNode);
                                    }
                                    if (_flag)
                                        _zTree.onClick(_view, event, treeId, treeNode);
                                },
                                onCheck: function (e, treeId, treeNode) {
                                    _zTree.onCheck(_view, 0, e, treeId, treeNode);
                                }//,
                                //onRightClick: function (event, treeId, treeNode) {
                                //    _zTree.onRightClick(_view, 0, event, treeId, treeNode);
                                //} 
                            }
                        };
                        $.fn.zTree.init(_view.controls.CategoryTreeContainer, setting, nodes);
                        if (p_callback != undefined && $.isFunction(p_callBack))
                            p_callback();
                    }
                });
            };
            setTimeout(function () {
                _search(p_callBack);
            }, 0);
        },
        //清空查询结果
        clearSelectedValue: function () {
            var _view = this;
            var zTree = $.fn.zTree.getZTreeObj(_controls.getClientId(_view.controls.CategoryTreeContainer));
            if (_view.setting.MultipleSelect) {
                setTimeout(function () {
                    zTree.checkAllNodes(false);
                }, 0);
            } else {
                setTimeout(function () {
                    zTree.cancelSelectedNode(zTree.getSelectedNodes()[0]);
                }, 0);
            }
            var zTree1 = $.fn.zTree.getZTreeObj(_controls.getClientId(_view.controls.CommonUseTreeContainer));
            if (_view.setting.MultipleSelect) {
                setTimeout(function () {
                    zTree1.checkAllNodes(false);
                }, 0);
            } else {
                setTimeout(function () {
                    zTree1.cancelSelectedNode(zTree.getSelectedNodes()[0]);
                }, 0);
            }
            _view.controls.SelectBox.val("");
            data.setData(_view.setting.ClientID, []);
        }
    };


    $.fn.acSelectBox = {
        init: function (p_setting) {
            var setting = tools.clone(_setting);
            $.extend(true, setting, p_setting);
            var _control = _controls.init(setting);
            var _acSelectBox = new view();
            _acSelectBox.init(setting, _control);
            controls[setting.ClientID] = _acSelectBox;
            settings[setting.ClientID] = setting;
        },
        getSelectBox: function (p_clientId) {
            return controls[p_clientId];
        },
        clearSelectBoxValue: function (p_clientId) {
            var _acSelectBox = controls[p_clientId];
            if (_acSelectBox) {
                //_acSelectBox.clearSelectedValue();
                _acSelectBox.controls.BtnSelectValueClear.trigger("click");
            }
        },
        getSelectBoxValue: function (p_clientId) {
            return data.getData(p_clientId);
        },
        setSelectBoxValue: function (p_clientId,p_value)
        {
            data.setData(p_clientId, p_value);
        }
    }
})(jQuery)