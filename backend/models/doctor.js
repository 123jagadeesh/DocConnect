const { DataTypes, Model } = require('sequelize');

class Doctor extends Model {
  static initModel(sequelize) {
    Doctor.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      specialization: { type: DataTypes.STRING },
      phone: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING }
    }, {
      sequelize,
      tableName: 'doctors',
      timestamps: true
    });
    return Doctor;
  }

  static associate(models) {
    Doctor.belongsToMany(models.Patient, { through: models.Mapping, foreignKey: 'doctorId', otherKey: 'patientId', as: 'patients' });
  }
}

module.exports = Doctor;
