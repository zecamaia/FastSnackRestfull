const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        defaultValue: "",
        unique: {
            msg: "Email já existe",
        },
        validate: {
            isEmail: {
                msg: "Email inválido",
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
    },
}, {
    timestamps: true
});

module.exports = User;