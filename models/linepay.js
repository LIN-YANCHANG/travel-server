'ues strict'

module.exports = (sequelize, DataTypes) => {
    const linepay = sequelize.define('linepay', {
        orderId: {
            type: DataTypes.STRING,
            primaryKey: true,
            notNull: true,
        },
        transactionId: { type: DataTypes.STRING, notNull: true },
        userId: { type: DataTypes.STRING },
        productName: { type: DataTypes.STRING },
        amount: { type: DataTypes.INTEGER },
        StartTime: { type: DataTypes.STRING },
        payType: { type: DataTypes.STRING },
        maturity: { type: DataTypes.STRING },
        CreateTime: { type: DataTypes.STRING },
        RefundTime: { type: DataTypes.STRING },
    }, { operatorsAliases: true, freezeTableName: true, timestamps: false });

    return linepay
}