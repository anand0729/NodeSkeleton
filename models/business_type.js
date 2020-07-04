module.exports = (sequelize, DataTypes) => {
    var business_type = sequelize.define('business_type', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
         
        status: {
            type: DataTypes.ENUM,
            values: ['a', 'i', 'd'],
            defaultValue: 'a',
            comment: "a - Active, i - Inactive, d - Deleted"
        },
        
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),

        },
        updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),

        }
    });
   


    return business_type;
}