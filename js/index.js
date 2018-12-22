window.onload = function() {
    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("=");
            result = strs[1];
        }
    }

    //生成二维码
    function createCode(url) {
        $('.codeurl').empty();
        $('.codeurl').qrcode({
            // 渲染的方式 : 'canvas', 'image' or 'div'
            render: 'canvas',
            // 容错率 L-H 递增 level: 'L', 'M', 'Q' or 'H'
            ecLevel: 'H',
            // 大小
            size: 120,
            // 圆角
            radius: 0.5,
            // 背景色
            background: '#ffffff',
            // 内容
            text: url,
        });
    }

    //二维码下载函数

    var Url = "http://block.xxsh.com/do_invite.php";

    $(".product-btn").click(function() {
        var invited = $('.active-invited').val();

        if (invited.length != 12) {
            alert('请输入正确的被邀请者账号');
        } else {
            createCode(`http://block.xxsh.com/?invite=${invited}`);
        }
        var $data = {
            "account_invite": GetRequest() ? GetRequest() : null,
            "account_invited": invited
        };
        $.post(Url, $data, function(result) {
            result = JSON.parse(result);

            if (result.status == 200) {
                alert('提交成功,您的二维码已经生成');
            } else {
                alert('提交出错,请您重新提交');
            }
        });
    })
}