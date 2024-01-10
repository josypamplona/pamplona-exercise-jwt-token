
/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
const modelUserCreater = (sequelize, DataTypes)=> {
  const UserModel = sequelize.define('User',  {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    }, { timestamps: false, tableName: 'users' });

    return UserModel
};

module.exports = modelUserCreater;