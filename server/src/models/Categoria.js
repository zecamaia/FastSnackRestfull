const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Categoria = sequelize.define('Categoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    evento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Eventos',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    timestamps: true
});

module.exports = Categoria;