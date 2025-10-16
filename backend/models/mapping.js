const { DataTypes, Model } = require('sequelize');

class Mapping extends Model {
  static initModel(sequelize) {
    Mapping.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      patientId: { type: DataTypes.INTEGER, allowNull: false },
      doctorId: { type: DataTypes.INTEGER, allowNull: false }
    }, {
      sequelize,
      tableName: 'mappings',
      timestamps: true
    });
    return Mapping;
  }

  static associate(models) {
    Mapping.belongsTo(models.Patient, { foreignKey: 'patientId' });
    Mapping.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
  }
}

module.exports = Mapping;
