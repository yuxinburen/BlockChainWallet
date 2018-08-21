const {success, fail} = require("../utils/myUtils");
const web3 = require("../utils/myUtils").getweb3();

module.exports = {

    transactionHtml: async (ctx) => {
        await ctx.render("Transaction.html");
    },

    //send_to : 0x1695edcb87D65DE4844bA9015267603Fa79BdFa0

    //发送转账交易
    sendTransaction: async (ctx) => {
        const {fromaddress, toaddress, number, privatekey} = ctx.request.body;

        var Tx = require("ethereumjs-tx");
        var privateKey = new Buffer(privateKey.slice(2), "hex");

        const nonce = await web3.eth.getTransactionCount(fromaddress);
        const gasPrice = await web3.eth.getGasPrice();
        const balance = web3.utils.toWei(number);

        var rawTx = {
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: '0x2710',
            to: toaddress,
            value: balance,
            data: '0x00'//转token会用到一个字段
        };

        //将交易的数据进行预估gas计算,然后将gas值设置到数据参数中
        const gas = await web3.eth.estimateGas(rawTx);
        rawTx.gas = gas;

        var tx = new Tx(rawTx);
        tx.sign(privateKey);

        var serializedTx = tx.serialize();

        let responseData;
        await web3.eth.sendTransaction("0x" + serializedTx.toString("hex"), function (err, data) {
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
        });
        ctx.body = responseData;
    }
};