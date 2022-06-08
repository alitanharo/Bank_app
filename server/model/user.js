
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },

        createDate: {
            type: DataTypes.BIGINT,
            get() {
                const dateVal = this.getDataValue('createDate');
                return dateVal ? new Date(Number(dateVal)).toISOString() : null;
            }
        },
    });

    return User;
};