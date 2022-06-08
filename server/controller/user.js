const db = require("../model");
const User = db.user;
const Account = db.account;
const { createError, exeption } = require("../util/Error");
const crypto = require("crypto");

module.exports.getUserById = async (userId) => {
  return await User.findByPk(userId, {
    include: [
      {
        model: Account,
        as: "accounts",
        separate: true,
      },
    ],
  });
};

module.exports.login = async (username, password) => {
  let user = await User.findOne({ where: { username } });
  if (!user) throw createError(exeption.Unauthorized);

  const hashedPassword = crypto
    .createHash("sha512")
    .update(password, "utf8")
    .digest("hex");

  if (user.password !== hashedPassword)
    throw createError(exeption.Unauthorized);
  return user;
};

const getUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};

const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

module.exports.createUser = async (username, email, password) => {
  let user = await getUserByUsername(username);
  if (user) throw new Error();

  user = await getUserByEmail(email);
  console.log(email);
  if (user) throw new Error();

  let createDate = new Date().getTime();

  const hashedPassword = crypto
    .createHash("sha512")
    .update(password, "utf8")
    .digest("hex");

  user = { username, email, password: hashedPassword, createDate };

  user = await User.create(user);
  await Account.create({
    userId: user.id,
    balance: 0,
    accountNumber: user.id * 100000,
  });

  return user;
};
