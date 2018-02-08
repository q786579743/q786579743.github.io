/*
   *  脚本文件描述：搜索标记中的内容并改变颜色
   *  创建时间：2016-7-13
   *  作者： 李玲
   */


//判断空间是不是存在，不存在创建
if ($.pd == undefined) {
    $.extend({
        pd: {}
    });
}

$.extend($.pd, {
    searchCss: { "color": "red" },
    originalCss: { "color": "#666" },
    ctrlObj: null,
    search: function (obj) {
        var that = this;
        var searchValue = $(obj).val();
        var title = "";
        if (searchValue != "") {
            //将搜索到的结果改变字体颜色
            that.ctrlObj.each(function (i) {
                title = $(this).html();
                if (title.indexOf(searchValue) >= 0) {
                    $(this).css(that.searchCss);
                }
            });
        }
        else {
            //清空后恢复到之前的字体颜色
            that.ctrlObj.each(function (i) {
                $(this).css(that.originalCss);
            });
        }

    }
});