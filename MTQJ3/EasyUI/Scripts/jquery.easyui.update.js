/**
 * menu方法扩展
 * @param {Object} jq
 * @param {Object} itemEl
 */
$.extend($.fn.menu.methods, {
    /**
     * 激活选项（覆盖重写）
     * @param {Object} jq
     * @param {Object} itemEl
     */
    enableItem : function(jq, itemEl) {
        return jq.each(function(){
            var jqElements = $(itemEl);
            var state = $.data(this, 'menu');
            if (jqElements.length > 0) {
                jqElements.each(function(){
                    if ($(this).hasClass('menu-item-disabled')) {
                        for(var i=0; i<state._eventsStore.length; i++){
                            var itemData = state._eventsStore[i];
                            if(itemData.target == this){
                                //恢复超链接
                                if (itemData.href) {
                                    $(this).attr("href", itemData.href);
                                }
                                //回复点击事件
                                if (itemData.onclicks) {
                                    for (var j = 0; j < itemData.onclicks.length; j++) {
                                        $(this).bind('click', itemData.onclicks[j]);
                                    }
                                }
                                //设置target为null，清空存储的事件处理程序
                                itemData.target = null;
                                itemData.onclicks = [];
                                $(this).removeClass('menu-item-disabled');
                            }
                        }
                    }
                });
            }
        });
    },
    /**
     * 禁用选项（覆盖重写）
     * @param {Object} jq
     * @param {Object} itemEl
     */
    disableItem : function(jq, itemEl) {
        return jq.each(function() {
            var jqElements = $(itemEl);
            var state = $.data(this,'menu');
            if (jqElements.length > 0) {
                if (!state._eventsStore)
                    state._eventsStore = [];
                jqElements.each(function(){
                    if (!$(this).hasClass('menu-item-disabled')) {
                        var backStore = {};
                        backStore.target = this;
                        backStore.onclicks = [];
                        //处理超链接
                        var strHref = $(this).attr("href");
                        if (strHref) {
                            backStore.href = strHref;
                            $(this).attr("href", "javascript:void(0)");
                        }
                        //处理直接耦合绑定到onclick属性上的事件
                        var onclickStr = $(this).attr("onclick");
                        if (onclickStr && onclickStr != "") {
                            backStore.onclicks[backStore.onclicks.length] = new Function(onclickStr);
                            $(this).attr("onclick", "");
                        }
                        //处理使用jquery绑定的事件
                        var eventDatas = $(this).data("events") || $._data(this, 'events');
                        if (eventDatas["click"]) {
                            var eventData = eventDatas["click"];
                            for (var i = 0; i < eventData.length; i++) {
                                if (eventData[i].namespace != "menu") {
                                    backStore.onclicks[backStore.onclicks.length] = eventData[i]["handler"];
                                    $(this).unbind('click', eventData[i]["handler"]);
                                    i--;
                                }
                            }
                        }
                        //遍历_eventsStore数组，如果有target为null的元素，则利用起来
                        var isStored = false;
                        for(var j=0; j<state._eventsStore.length; j++){
                            var itemData = state._eventsStore[j];
                            if(itemData.target==null){
                                isStored = true;
                                state._eventsStore[j] = backStore;
                            }
                        }
                        //没有现成的，则push进去
                        if(isStored==false){
                            state._eventsStore[state._eventsStore.length] = backStore;
                        }
                        $(this).addClass('menu-item-disabled');
                    }
                });
            }
        });
    }
});