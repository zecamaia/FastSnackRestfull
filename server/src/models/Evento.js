const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Evento = sequelize.define('Evento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    data_fim: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('ativo', 'inativo'),
        allowNull: false,
        defaultValue: 'ativo'
    },
    organizador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    timestamps: true
});

module.exports = Evento;
