const {success, fail} = require("../utils/myUtils");
const web3 = require("../utils/myUtils").getweb3();
const fs = require("fs");

async function getAccountBalance(address) {
    let balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, "ether");
}

module.exports = {

    //通过keystore文件解锁账户
    unlockAccountWithKeystore: async (ctx) => {

        //账户密码
        const password = ctx.request.body.password;
        console.log(password);

        //keystore文件
        const keystore = ctx.request.files.file;
        console.log(keystore);

        //读取文件流数据
        const keystoreData = fs.readFileSync(keystore.path, "utf8");
        console.log(keystoreData);

        //1.通过密码和Keystore 调用eth的账户解锁方法解锁账户,返回账户信息
        const account = web3.eth.accounts.decrypt(JSON.parse(keystoreData), password);
        console.log(account);

        //2.获取账户余额
        const balance = await getAccountBalance(account.address);
        console.log(balance);

        //3.返回相应数据给前端
        ctx.body = success({
            balance: balance,
            address: account.address,
            privatekey: account.privateKey
        });
    },

    unlockAccountWithPrivateKey: async (ctx) => {
        //１．获取私钥
        let privatekey = ctx.request.body.privatekey;
        console.log(privatekey);

        //2.通过私钥解锁账户
        let account = web3.eth.accounts.privateKeyToAccount(privatekey);
        console.log(account);

        //3.获取账户余额
        let balance = await getAccountBalance(account.address);
        console.log(balance);

        //４．返回相应数据给前端
        ctx.body = success({
            balance: balance,
            address: account.address,
            privatekey: account.privateKey
        })
    }
};