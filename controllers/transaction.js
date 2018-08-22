const {success, fail} = require("../utils/myUtils");
const web3 = require("../utils/myUtils").getweb3();

module.exports = {

    //渲染发送交易页面
    transactionHtml: async (ctx) => {
        await ctx.render("transaction.html");
    },

    //send_to : 0x1695edcb87D65DE4844bA9015267603Fa79BdFa0

    //发送转账交易
    sendTransaction: async (ctx) => {
        const {fromaddress, toaddress, number, privatekey} = ctx.request.body;

        console.log(fromaddress);
        console.log(toaddress);
        console.log(number);
        console.log(privatekey);

        var Tx = require('ethereumjs-tx');
        var privateKey = new Buffer(privatekey.slice(2), 'hex');

        const nonce = await web3.eth.getTransactionCount(fromaddress);
        const gasPrice = await web3.eth.getGasPrice();
        const balance = web3.utils.toWei(number);

        var rawTx = {
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: '0x2710',
            to: toaddress,
            value: balance,
            data: '0x00'//转ｔｏｋｅｎ会用到的一个字段
        };

        //将交易的数据进行预估gas计算,然后将gas值设置到数据参数中
        rawTx.gas = await web3.eth.estimateGas(rawTx);

        var tx = new Tx(rawTx);
        tx.sign(privateKey);

        var serializedTx = tx.serialize();

        let responseData;
        await web3.eth.sendSignedTransaction("0x" + serializedTx.toString("hex"), function (err, data) {
            console.log(err);
            console.log(data);
            if (err) {
                responseData = fail(err);
            }
        }).then(function (data) {
            console.log(data);
            if (data) {
                responseData = success({
                    "blockHash": data.blockHash,
                    "transactionHash": data.transactionHash
                })
            } else {
                responseData = fail("交易失败")
            }
            ctx.body = responseData;
        });
    },

    //渲染查询交易页面
    queryHtml: async (ctx) => {
        await ctx.render("querytransaction.html");
    },

    //transactionHash:0xb207f9c3d6838bacc24b1f8ba4dd3c822e42a7e78f0dcab275a111cbc912dac3
    //blockHash:0x580b5970faf731b271d346b0ea59310dffcea2fa146cec7c865a41745fd236aa

    //查询交易
    queryTransaction: async (ctx) => {
        const transactionHash = ctx.request.body.hash;
        console.log(transactionHash);

        const transactionData = await web3.eth.getTransaction(transactionHash);
        console.log(transactionData);

        ctx.body = success(transactionData);
    }
};