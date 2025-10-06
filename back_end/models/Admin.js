import { DataTypes } from "sequelize";

export function AdminModel(database) {
    database.define('Admin', {
        idAdmin: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        cognome: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },



        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                let hash = createHash("sha256");
                this.setDataValue('password', hash.update(value).digest("hex"));
            }
        }
    }, {
    });
}