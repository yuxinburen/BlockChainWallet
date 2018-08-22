const Router = require("koa-router");
const router = new Router();

const createAccountController = require("../controllers/createAccount");
const transactionController = require("../controllers/transaction");
const accountController = require("../controllers/account");

//获取创建钱包的html page
router.get("/createAccount", createAccountController.createAccountHtml);
//创建钱包页面的submit button 事件
router.post("/createAccount", createAccountController.createAccountAction);

//根据keystore文件解锁账户
router.post("/unlockAccountWithKeystore", accountController.unlockAccountWithKeystore);
//根据私钥解锁账户
router.post("/unlockAccountWithPrivateKey", accountController.unlockAccountWithPrivateKey);

//获取转账的html页面
router.get("/transaction", transactionController.transactionHtml);
router.post("/sendtransaction", transactionController.sendTransaction);

//查询交易的的html页面及查询业务
router.get("/query", transactionController.queryHtml);
router.post("/querytransaction", transactionController.queryTransaction);


module.exports = router;