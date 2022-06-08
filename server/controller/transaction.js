const db = require("../model");
const Transaction = db.transaction;
const Account = require("./account")
const User = require("./user")


module.exports.createTransaction = async (reciever, amount, userId) => {
    let user = await User.getUserById(userId)
    let sender = user.accounts[0].accountNumber
    console.log(sender);
    let senderAccount = await Account.getAccountByAccountNumber(sender)
    let recieverAccount = await Account.getAccountByAccountNumber(reciever)

    if (!senderAccount) throw new Error()
    if (!recieverAccount) throw new Error()

    if (+senderAccount.balance < +amount) throw new Error()

    await Account.updateAccountBalance(senderAccount.id, senderAccount.balance - amount)
    await Account.updateAccountBalance(recieverAccount.id, +recieverAccount.balance + +amount)

    await Transaction.create({
        amount,
        senderId: senderAccount.id,
        recieverId: recieverAccount.id,
        createDate: new Date().getTime()
    })

}
