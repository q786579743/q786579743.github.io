


//图纸页面的js文件
var editIndex = undefined;

		function onClickRow(index) {
			if(editIndex != index) {
				if(endEditing()) {
					$('#dg').datagrid('selectRow', index)
						.datagrid('beginEdit', index);
					editIndex = index;
				} else {
					$('#dg').datagrid('selectRow', editIndex);
				}
			}
		}

		$(document).ready(function() {
		 $("#dg").datagrid({
            onRowContextMenu: function (e, rowIndex, rowData) { //右键时触发事件
                //三个参数：e里面的内容很多，真心不明白，rowIndex就是当前点击时所在行的索引，rowData当前行的数据
                e.preventDefault(); //阻止浏览器捕获右键事件
                $(this).datagrid("clearSelections"); //取消所有选中项
                $(this).datagrid("selectRow", rowIndex); //根据索引选中该行
                $('#mm2').menu('show', {
                    //显示右键菜单
                    left: e.pageX,//在鼠标点击处显示菜单
                    top: e.pageY
                });
                e.preventDefault();  //阻止浏览器自带的右键菜单弹出
            }
        });
     });
        
        
        
		function append() {
			if(endEditing()) {
				$('#dg').datagrid('appendRow', {
					status: 'P'
				});
				editIndex = $('#dg').datagrid('getRows').length - 1;
				$('#dg').datagrid('selectRow', editIndex)
					.datagrid('beginEdit', editIndex);
			}
		}

		function removeit() {
			if(editIndex == undefined) {
				return
			}
			$('#dg').datagrid('cancelEdit', editIndex)
				.datagrid('deleteRow', editIndex);
			editIndex = undefined;
		}

		function accept() {
			if(endEditing()) {
				$('#dg').datagrid('acceptChanges');
			}
		}

		function reject() {
			$('#dg').datagrid('rejectChanges');
			editIndex = undefined;
		}

		function getChanges() {
			var rows = $('#dg').datagrid('getChanges');
			alert(rows.length + ' 行被修改');
		}