const web3 = require("../utils/myUtils").getweb3();
const fs = require("fs");
const path = require("path");

module.exports = {

    createAccountHtml: async (ctx) => {
        await ctx.render("createAccount.html")
    },

    createAccountAction: async (ctx) => {
        console.log(ctx.request.body.password);

        //1.创建钱包账户
        const account = web3.eth.accounts.create(ctx.request.body.password);
        console.log(account);

        //2.根据账号和密码生成keystore配置文件
        const keystore = account.encrypt(ctx.request.body.password);
        console.log(keystore);

        //3.将keystore文件保存到文件目录
        const keystoreString = JSON.stringify(keystore);
        const time = new Date();
        const fileName = "UTC--" + time.toISOString() + "--" + account.address.slice(2);
        console.log(fileName);

        const filePath = path.join(__dirname, "../static/keystore", fileName);
        fs.writeFileSync(filePath, keystoreString);

        await
            ctx.render("downloadkeystore.html", {
                "downloadurl": "keystore/" + fileName,
                "privateKey": account.privateKey
            });
    }
};