function saveKeystoreNext() {
    $("#saveKeystoreFile").hide();
    $("#showPrivateKey").show();
}

//解锁成功后给账户设置数据
function refreshAccountInfo(data) {

    $("#account_address").text(data.address);
    $("#account_balance").text(data.balance + "ETH");

    $("#unlock_account").hide();
    $("#send-transaction").show();

    $("input[name=from_address]").val(data.address);
    $("input[name=privatekey]").val(data.privatekey);
}


//通过keystore文件解锁账户
function unlockAccountWithKeystore() {
    let password = $("#account_password").val();
    console.log(password);

    var fileData = $("#account_keystorefile").val();
    if (fileData.length <= 0) {
        alert("请选择文件！");
        return;
    }

    //文件上传
    var data = new FormData();
    data.append("file", $("#account_keystorefile")[0].files[0]);
    data.append("password", password);
    $.ajax({
        url: "/unlockAccountWithKeystore",
        type: "post",
        dataType: "json",
        contentType: false,
        data: data,
        processData: false,
        success: function (res, status) {
            if (res.code == 0) {
                refreshAccountInfo(res.data);
            }
        },
        error: function (res, status) {
            alert(JSON.stringify(res) + status);
        }
    })
}


//通过私钥解锁账户
function unlockAccountWithPrivateKey() {
    let privateKey = $("#input_privateKey").val();
    console.log(privateKey);

    $.post("/unlockAccountWithPrivateKey", `privatekey=${privateKey}`, function (res, status) {
        console.log(status + JSON.stringify(res))
        if (res.code == 0) {
            //将服务端返回的账户信息显示到页面
            refreshAccountInfo(res.data);
        }
    });

    //真正的转账交易,表单提交方法
    $("#send_transaction_form").validate({
        rules: {
            to_address: {
                required: true
            },
            to_number: {
                required: true
            }
        },
        messages: {
            to_address: {
                required: "请输入对方地址",
            },
            number: {
                required: "请输入转账金额",
            }
        },
        submitHandler: function (form) {
            var urlStr = "/sendtransaction";
            alert(urlStr);
            $(form).ajaxSubmit({
                url: urlStr,
                type: "POST",
                dataType: "json",
                success: function (res, status) {
                    console.log(status + JSON.stringify(res));
                    if (res.code == 0) {
                        $("#transaction_complete_hash").text(res.data.transactionHash);
                        $("#transaction_complete_blockhash").text(res.data.blockHash);
                        $("#transaction_show").show();
                    }
                },
                error: function (res, status) {
                    console.log(status + JSON.stringify(res));
                }
            });
        }
    })
}


$(document).ready(function () {

    $("input[name=unlocktype]").change(function () {
        if (this.value == 1) {
            $("#unlock-keystore").show();
            $("#unlock-privatekey").hide();
        } else {
            $("#unlock-keystore").hide();
            $("#unlock-privatekey").show();
        }
    })

    //transaction

});