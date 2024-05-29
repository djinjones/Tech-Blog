const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = requrie('bcrypt');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: {
                msg: 'Username can only contain letters and numbers.',
            },
            len: {
                args: [1,20],
                msg: 'Username can only be 1 to 20 characters in length.',
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Must be a valid email.',
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6,100],
                msg: 'Password must be at least 6 characters long.',
            },
        },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',

    hooks: {
        // hash the password before saving the user
        beforeCreate: async (newUserData) => {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
        // hash the password before updating the user
        beforeUpdate: async (updatedUserData) => {
          if (updatedUserData.password) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          }
          return updatedUserData;
        },
      },
    }
  );

module.exports = User;