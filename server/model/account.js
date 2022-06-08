module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('account', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        accountNumber: {
            type: DataTypes.STRING,
            unique: true
        },
        balance: {
            type: DataTypes.BIGINT,
        },
    });

    return Account;
};