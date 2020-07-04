module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define('user', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        addedBy: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null
        },
        businessTypeId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null
        },
         
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
         

        email: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null

        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            values: ['a', 'i', 'd'],
            defaultValue: 'a',
            comment: "a - Active, i - Inactive, d - Deleted"
        },
        type: {
            type: DataTypes.ENUM,
            values: ['0', '1', '2'],
            defaultValue: '2',
            comment: "0 - Admin, 1 - Manager, 2 - User"
        },
        newReg: {
            type: DataTypes.ENUM, 
            values: ['0', '1'],
            defaultValue: '1',
            comment: "0 - Account Activated, 1 - Account Newly Registered"
        },
         
        passRest: {
            type: DataTypes.ENUM,
            values: ['0', '1'],
            defaultValue: '0',
            comment: "0 , 1 - Password Reset Requested"
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
   


    return user;
}