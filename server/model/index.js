const dbConfig = require('../config/dbConfig.js');

const Sequelize = require('sequelize');


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    define: {
        timestamps: false
    },
    logging: true,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.js')(sequelize, Sequelize);
db.account = require('./account.js')(sequelize, Sequelize);
db.transaction = require('./transaction.js')(sequelize, Sequelize);

db.user.hasMany(db.account, { as: 'accounts' });

db.account.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user',
});

db.transaction.belongsTo(db.account, {
    foreignKey: 'senderId',
    as: 'sender',
});

db.transaction.belongsTo(db.account, {
    foreignKey: 'recieverId',
    as: 'reciever',
});

module.exports = db;
