var datas = [{ Key: "103010100", Value: "(103010100)工业生产用池、罐_gyscycg" }, { Key: "103010200", Value: "(103010200)灌溉用池_ggyc" }, { Key: "103010300", Value: "(103010300)水生动物饲养池_ssdwsyc" }];

$(document).ready(function () {
    $("#Hid_AssetsCategoryName").val("");
    $('#Hid_AssetsCategoryId').val("");
    $('#search_assetsCateogryInfo').autocomplete(datas, {
        delay: 2,
        minChars: 0,
        width: 375,
        height: 300,
        matchContains: true,
        highlightItem: false,
        formatItem: function (row, i, max, term) {
            return row.Value.replace(new RegExp("(" + term + ")", "gi"), "<strong>$1</strong>");
        },
        formatResult: function (row) {
            var rowValue = row.Value.split("_")[0];

            return rowValue;
        }
    });
    $('#search_assetsCateogryInfo').result(function (event, data, formatted) {
        if (data != null) {
            $('#Hid_AssetsCategoryId').val(data.Key);
            var rowValue = data.Value.split(")")[1].split("_")[0];
            $("#Hid_AssetsCategoryName").val(rowValue);
            onChangeAssetsCategory();
        }
    });
});
