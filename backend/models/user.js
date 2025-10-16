const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  static initModel(sequelize) {
    User.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true }},
      password: { type: DataTypes.STRING, allowNull: false }
    }, {
      sequelize,
      tableName: 'users',
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          const rounds = parseInt(process.env.BCRYPT_ROUNDS || '10', 10);
          user.password = await bcrypt.hash(user.password, rounds);
        }
      }
    });
    return User;
  }

  static associate(models) {
    User.hasMany(models.Patient, { foreignKey: 'createdBy', as: 'patients' });
  }

  // instance method to compare password
  async validatePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

module.exports = User;
