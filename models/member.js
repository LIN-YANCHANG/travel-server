'ues strict'

module.exports = (sequelize, DataTypes) => {
    const member = sequelize.define('member', {
        userId: {
            type: DataTypes.STRING,
            primaryKey: true,
            notNull: true,
        },
        userNo: { type: DataTypes.STRING, notNull: true },
        account: { type: DataTypes.STRING },
        password: { type: DataTypes.INTEGER },
        userName: { type: DataTypes.STRING },
        token: { type: DataTypes.STRING },
        createTime: { type: DataTypes.STRING },
        updateTime: { type: DataTypes.STRING }
    },
        { operatorsAliases: true, freezeTableName: true, timestamps: false });
    return member
}