const { DataTypes, Model } = require('sequelize');

class Patient extends Model {
  static initModel(sequelize) {
    Patient.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      age: { type: DataTypes.INTEGER },
      gender: { type: DataTypes.ENUM('male','female','other') },
      phone: { type: DataTypes.STRING },
      address: { type: DataTypes.TEXT },
      createdBy: { type: DataTypes.INTEGER, allowNull: false } // reference to User.id
    }, {
      sequelize,
      tableName: 'patients',
      timestamps: true
    });
    return Patient;
  }

  static associate(models) {
    Patient.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
    Patient.belongsToMany(models.Doctor, { through: models.Mapping, foreignKey: 'patientId', otherKey: 'doctorId', as: 'doctors' });
  }
}

module.exports = Patient;
