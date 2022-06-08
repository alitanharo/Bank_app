const db = require("../model");
const Account = db.account;


module.exports.getAccountByAccountNumber = async (accountNumber) => {
    return await Account.findOne({ where: { accountNumber } })
}

module.exports.updateAccountBalance = async (id, balance) => {
    await Account.update({ balance }, { where: { id } })
}
