/*
   *  脚本文件描述：包括一些常用方法
   *  创建时间：2016-5-4
   *  作者： 李玲
   *  暂时包括
      getQueryString	根据URL地址获取传参值
      urlFileExist	判断远程文件是否存在（404）
      getProjectRootPath	获得项目根路径
      formatString	增加formatString功能（使用方法：sy.fs('字符串{0}字符串{1}字符串','第一个变量','第二个变量')）
      createUUID	生成UUID（UUID含义是通用唯一识别码 (Universally Unique Identifier)）
      getListByString	将字符串分割成数组
      log	日志
      messageEntity	返回操作信息（基于Jquery）
      getUserInfo	获得用户信息

   */


//判断空间是不是存在，不存在创建
if ($.pd == undefined) {
    $.extend({
        pd: {}
    });
}

$.extend(
	$.pd, {
	    /*
         * 写日志consloe 脚本调试可用
         * @param msg 提示信息
        */
	    writeLog: function (msg) {
	        console.log(msg);
	    },
	    /*
        * 数据操作处理后返回对象包括 状态，返回信息，处理的标识
        * @param message json结果
        */
	    MessageEntity: function (message) {
	        var messageEntity = $.evalJSON(message);
	        this.state = messageEntity.State;
	        this.message = messageEntity.Message;
	        this.uniqueid = messageEntity.UniqueID;
	        return this;
	    },

	    /*
        * 根据URL地址获取传参值
        * @param name 参数
        */
	    getQueryString: function (name) {
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	        var r = window.location.search.substr(1).match(reg);
	        if (r != null) return unescape(r[2]);
	        return null;
	    },

	    /*
        * 判断远程文件是否存在（404）
        * @param url 路径
        */
	    urlFileExist: function (url) {
	        var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	        xmlhttp.open("GET", url, false);
	        xmlhttp.send();
	        if (xmlhttp.readyState == 4) {
	            if (xmlhttp.status == 200) {
	                console.log(x + 'url存在');
	                return true;
	            } else if (xmlhttp.status == 404) {
	                console.log(x + 'url不存在');
	                return false;
	            } else {
	                console.log(x + '其他状态');
	                return false;
	            }
	        }
	    },
	    /*
         * 判断本地文件是否存在
         * @param url 路径
        */
	    localFileExist: function (url) {
	        var fso, s = url; // filespec="C:/path/myfile.txt"
	        fso = new ActiveXObject("Scripting.FileSystemObject");
	        if (fso.FileExists(url)) {
	            console.log(s + ' 文件存在');
	            return true;
	        }

	        else {
	            console.log(s + ' 文件不存在');
	            return false;
	        }
	    },
	    /*
        * 获得项目根路径
        * 
        */
	    getProjectRootPath: function () {
	        var curWwwPath = window.document.location.href;
	        var pathName = window.document.location.pathname;
	        var pos = curWwwPath.indexOf(pathName);
	        var localhostPaht = curWwwPath.substring(0, pos);
	        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	        return (localhostPaht + projectName);
	    },
	    /**
         * 增加formatString功能
         * 
         * 使用方法：('字符串{0}字符串{1}字符串','第一个变量','第二个变量');
         */
	    formatString: function (str) {
	        for (var i = 0; i < arguments.length - 1; i++) {
	            str = str.replace("{" + i + "}", arguments[i + 1]);
	        }
	        return str;
	    },
	    /**
         * 将字符串分割成数组
         * 
         * 使用方法：('1,2,3');
         */
	    getListByString: function (value) {
	        if (value) {
	            var values = [];
	            var t = value.split(',');
	            for (var i = 0; i < t.length; i++) {
	                values.push('' + t[i]);/* 避免他将ID当成数字 */
	            }
	            return values;
	        } else {
	            return [];
	        }
	    },

	    /**
         * 生成UUID：UUID含义是通用唯一识别码 (Universally Unique Identifier)（整理时进行调整）
         */
	    /*生成随机数(用于生成UUID子方法)*/

	    random4: function () {
	        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	    },
	    createUUID: function () {
	        var that = this;
	        return (that.random4() + that.random4() + "-" + that.random4() +
                "-" + that.random4() + "-" + that.random4() + "-" +
                that.random4() + that.random4() + that.random4());
	    },
	    /**
         * 
         * 将form表单元素的值序列化成对象
         * @param from from ID
         * 
         * @returns object
         */
	    serializeForm: function (form) {
	        var obj = {};
	        $.each(form.serializeArray(), function (index) {
	            if (obj[this['name']]) {
	                obj[this['name']] = obj[this['name']] + ',' + this['value'];
	            } else {
	                obj[this['name']] = this['value'];
	            }
	        });
	        return obj;
	    }


	});
/**********************以下暂时用不到，先注释掉了***********************/
//var _imitateIndex = 0;
//function ImitateAnchorClick(p_target, p_href) {
//    var id = 'imitateAnchor' + _imitateIndex;
//    var a = $("<a href='" + p_href + "' target='" + p_target + "'><span id='" + id + "'></span></a>");
//    $(document.body).append(a);
//    $("#" + id).trigger("click")
//    $("#" + id).parent().remove();
//    _imitateIndex++;
//}
/**
       //* 增加命名空间功能
       //* 
       //* 使用方法：sy.ns('jQuery.bbb.ccc','jQuery.eee.fff');
       //*/
//       sy.ns = function () {
//           var o = {}, d;
//           for (var i = 0; i < arguments.length; i++) {
//               d = arguments[i].split(".");
//               o = window[d[0]] = window[d[0]] || {};
//               for (var k = 0; k < d.slice(1).length; k++) {
//                   o = o[d[k + 1]] = o[d[k + 1]] || {};
//               }
//           }
//           return o;
//       };

// R:new Date().getTime()


//sy.png = function () {
//	var imgArr = document.getElementsByTagName("IMG");
//	for (var i = 0; i < imgArr.length; i++) {
//		if (imgArr[i].src.toLowerCase().lastIndexOf(".png") != -1) {
//			imgArr[i].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + imgArr[i].src + "', sizingMethod='auto')";
//			imgArr[i].src = "images/blank.gif";
//		}
//		if (imgArr[i].currentStyle.backgroundImage.lastIndexOf(".png") != -1) {
//			var img = imgArr[i].currentStyle.backgroundImage.substring(5, imgArr[i].currentStyle.backgroundImage.length - 2);
//			imgArr[i].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + img + "', sizingMethod='crop')";
//			imgArr[i].style.backgroundImage = "url('images/blank.gif')";
//		}
//	}
//};
//sy.bgPng = function (bgElements) {
//	for (var i = 0; i < bgElements.length; i++) {
//		if (bgElements[i].currentStyle.backgroundImage.lastIndexOf(".png") != -1) {
//			var img = bgElements[i].currentStyle.backgroundImage.substring(5, bgElements[i].currentStyle.backgroundImage.length - 2);
//			bgElements[i].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + img + "', sizingMethod='crop')";
//			bgElements[i].style.backgroundImage = "url('images/blank.gif')";
//		}
//	}
//};

//sy.isLessThanIe8 = function () {/* 判断浏览器是否是IE并且版本小于8 */
//    return ($.browser.msie && $.browser.version < 8);
//};
//这个需要涉及到EasyUI，不适合封装在这里
//$.ajaxSetup({
//	type: 'POST',
//	error: function (XMLHttpRequest, textStatus, errorThrown) {/* 扩展AJAX出现错误的提示 */
//		$.messager.progress('close');
//		$.messager.alert('错误', XMLHttpRequest.responseText.split('<script')[0]);
//	}
//});