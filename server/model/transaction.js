module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('transaction', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: DataTypes.BIGINT,
        },
        createDate: {
            type: DataTypes.BIGINT,
            get() {
                const dateVal = this.getDataValue('createDate');
                return dateVal ? new Date(Number(dateVal)).toISOString() : null;
            }
        },
    });

    return Transaction;
};