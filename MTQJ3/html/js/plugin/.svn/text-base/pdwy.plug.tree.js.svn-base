(function ($) {
	var pdTree = function (p_options) {
		var opt = this.setOptions(p_options);
		this.isFold = opt.isFold;;
		this.url = opt.url;
		this.container = opt.container;
		this.init();
	};
	pdTree.prototype = {
		setOptions: function (options) {
			this.options = {
				isFold: false,
				url: "",
				container: undefined
			};
			return $.extend(this.options, options || {});
		},
		bindTree: function () {
			var _that = this;
			this.container.html($("#ul_tree").html());

			/*$.ajax({
				type: "POST",
				dataType: "html",
				url: _that.url,
				success: function (data) {
	
					_that.container.html(data);
				}
			})*/


		},
		init: function () {
			var that = this;
			alert(that.isFold);
			if (that.isFold) {
				$("#" + that.continer + " ul").show();
			}
			else {
				$("#" + that.continer + " ul").hide();
			}


		}
	}
})(jQuery);