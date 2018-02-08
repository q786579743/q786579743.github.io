function acTree(p_options) {
    var opt = this._setOptions(p_options);
    this.container = opt.container;
    this.url = opt.url;
    this.currentRoot = undefined;
    this.selectListener = opt.selectListener;
    this.selectSingle = opt.selectSingle;
    this.ClientID = opt.ClientID;
    this.Cascade = opt.Cascade;
}

acTree.prototype = {
    _setOptions: function(options) {
        this.options = {
            container: undefined,
            url: "?AJAXR=getassetcategoryinfos",
            selectListener: function(p_selectedEntity) { },
            selectSingle: true,
            ClientID: "_acTree",
            filter: true,
            //级联功能开关，默认为开，关闭时选中父级不会级联选中子级
            Cascade: true
        };
        return $.extend(this.options, options || {});
    },
    //返回子节点数据对象集合
    getChildren: function(p_uniqueId) {alert(p_uniqueId) },
    //查找指定标识的节点数据对象
    find: function(p_uniqueId) { },
    //查找当前所有选中的节点对象
    getSelections: function() { },
    //根据指定的条件进行筛选
    //2014-04-22 修改 添加p_filter字段，用以过滤掉当前资产卡片中不存在的资产分类
    search: function(p_uniqueId, p_txt, p_filter, p_callback) {
        var _that = this;
        _that.container.html("<div style=\"background: #fff url('../App_Themes/default/images/loading.gif') no-repeat center center;text-align: center; vertical-align: middle; width:100%;height:300px\" valign=\"middle\"></div>");
        setTimeout(function() {
            $.ajax({
                type: "POST", dataType: "html", url: _that.url, cache: true, data: { uniqueid: p_uniqueId, assetscategoryname: p_txt, filter: p_filter },
                success: function(data) {
                    _that.container.html(data).show(); //.fadeIn();
                    if (p_callback && $.isFunction(p_callback))
                        p_callback.call(_that);
                }, error: function(data) {
                    sendTips(data.responseText, 1);
                }
            });
        }, 0);
    },
    SwitchToggle: function(p_obj) {
        var _obj = $(p_obj);
        _obj.parent().next().toggle();
        var src = _obj.children().first().attr("class");
        switch (src) {
            case "minus":
                _obj.children().first().removeClass("minus").addClass("plus");
                break;
            case "plus":
                _obj.children().first().removeClass("plus").addClass("minus");
                break;
            case "minusbottom":
                _obj.children().first().removeClass("minusbottom").addClass("plusbottom");
                break;
            case "plusbottom":
                _obj.children().first().removeClass("plusbottom").addClass("minusbottom");
                break;
            default:
                break;
        }
    },
    expandAll: function() {
        $(".plus,.plusbottom").each(function() {
            $(this).parent().trigger('click');
        })
    },
    expandLocationToNode: function(p_uniqueId) {
        //当前的target为资产名称所在的A标签
        var _target = $("#" + this.ClientID + "_item_" + p_uniqueId);
        var _target_level = _target.attr("level");
        //_target.trigger("click");
        this.select(_target[0], _target.attr("HasChildren"), false);
        var _loop = function(__level, __target) {
            if (__level > 0) {
                //父级target为图标所在的A标签
                var _as = __target.parent().parent().prev().children("a");
                var _parentIcon = _as.eq(0);
                var _parentTarget = _as.eq(1);
                var _parentTarget_level = _parentTarget.attr("level");
                var _parentIcon_span = _parentIcon.children().eq(0);
                if (_parentIcon_span.hasClass("plusbottom") || _parentIcon_span.hasClass("plus")) {
                    _parentIcon.trigger("click");
                }
                _loop(_parentTarget_level, _parentTarget);
            }
        }
        _loop(_target_level, _target);
    },
    collapseAll: function() {
        $(".minus,.minusbottom").each(function() {
            $(this).parent().trigger('click');
        })
    },
    select: function(p_obj, p_hasChildren, p_trigger) {
        var _trigger = p_trigger || false;
        this.container.find(".entity-selected").removeClass("entity-selected");
        $(p_obj).addClass("entity-selected");
        if (this.selectSingle) {
            if (p_hasChildren == true) { return; }
            var _entity = $.evalJSON($(p_obj).attr("entity"));
            if (_trigger)
                this.selectListener(_entity);
        } else {
            var _checkBox = $(p_obj).prev("input:checkbox");
            var _checked = _checkBox.attr("checked");
            if (_checked && _checked == "checked") {
                _checkBox.removeAttr("checked");
            } else {
                _checkBox.attr("checked", "checked");
            }
            this.mutiSelect(_checkBox, p_hasChildren);
        }
    },
    mutiSelect: function(p_obj, p_hasChildren) {
        var _checkBox = $(p_obj);
        var _checked = _checkBox.attr("checked");
        if (this.Cascade) {
            if (_checked && _checked == "checked") {
                if (p_hasChildren) {
                    _checkBox.parent().next().find("input:checkbox").attr("checked", "checked");
                }
            } else {
                if (p_hasChildren) {
                    _checkBox.parent().next().find("input:checkbox").removeAttr("checked");
                }
            }
            this._mutiCheckListener(_checkBox);
        }
    },
    _mutiCheckListener: function(p_obj) {
        var _level = parseInt(p_obj.attr("level"));
        if (_level > 0) {
            var _parent = p_obj.parent().parent();
            var _chilrenCbx = _parent.children(".item").children("input:checkbox");
            var _parentCbx = _parent.prev(".item").children("input:checkbox");
            if (p_obj.attr("checked") == "checked") {
                var _fullSelected = true;
                _chilrenCbx.each(function() {
                    if (_fullSelected) {
                        if ($(this).attr("checked") != 'checked') {
                            _fullSelected = false;
                        }
                    }
                });
                if (_fullSelected == true) {
                    _parentCbx.attr("checked", "checked");
                } else {
                    _parentCbx.removeAttr("checked");
                }
            } else {
                _parentCbx.removeAttr("checked");
            }
            this._mutiCheckListener(_parentCbx);
        }
    },
    getSelection: function() {
        var _sections = this.container.find("input:checkbox[checked='checked'][hasChildren='false']").map(function() {
            return $.evalJSON($(this).attr("entity"));
        }).get();
        return _sections;
    },
    getAllSelection: function() {
        var _sections = this.container.find("input:checkbox[checked='checked']").map(function() {
            return $.evalJSON($(this).attr("entity"));
        }).get();
        return _sections;
    }
}