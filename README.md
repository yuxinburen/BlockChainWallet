# BlockChainWallet

Blockchain wallet is a simple wallet by Ethereum. This project aim to show how to use web3's api and methods. In this project, I show the four functions: CreateWallet, UnlockWallet, SendTransaction and QueryTransaction.

Learn this project, you need to master：

1. How to deploy a ethereum chain in local pc.
2. You can read the Html, JavaScript, Node.js code，if you can program use Node.js, that are better.
3. You should knowledge some web3.js api, you can get it in https://web3js.readthedocs.io/en/1.0/web3-eth.html.

If you have any question want to question me, this is my WeChat：

![WeChat](https://img-blog.csdn.net/20180822164429430?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Nkanp5dXhpbmJ1cmVu/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

#### Installation：

1. You need to run a local Ethereal node. This is the library use :https://github.com/ethereum/wiki/wiki/JavaScript-API.
2. You should install the node and npm.
3. git clone git@github.com:yuxinburen/BlockChainWallet.git
4. cd BlockChainWallet
5. node index.js
6. input `http://localhost:3000/createAccount` and access in your browser.

#### CreateWalletAccount

create wallet page in `createAccount.html`, the server function are `createAccountHtml`   and    `createAccountAction`

- `createAccountHtml` function is render the `createAccout.html` page.
- `createAccountAction` function is used to deal the password and use the web3 api to createAccount and return the account entity.

#### UnlockWalletAccount

UnlockWallet is a step before you send a transaction，if you don't the step，it will throw a error when you want to send a transaction from one address to another address.

You can unlock your wallet account according muliple ways，in this project, there are two ways archive this step：Keystore File and PriavateKey。

##### Keystore File：

The function `unlockAccountWithKeystore` support you upload a keystone file and password, the method use the web3 api `web3.eth.accounts.decrypt(JSON.parse(keystoreData), password)` to get the account object.

In this project, there is a page named `downloadkeystore.html`, you can download the keystore file to local disk.

##### PrivateKey：

The function `unlockAccountWithPrivateKey` support you post a privatekey data, the method use the web3 api `web3.eth.accounts.privateKeyToAccount(privatekey)` to get the account object.

#### SendTransaction

If you are already unlock wallet account ,now you can try to send some eth from one address to another address.

The method `sendTransaction` is used to archive the sendTransaction function. In this method, you should post a form data ,including : fromaddress, toaddress, value.

The sendTransaction function is in `transaction.html`

#### QueryTransaction

If you want to query one transaction,  you need to know the transactionHash first. So the method `queryTransaction` in transaction.js file is used to query the transaction detail info.