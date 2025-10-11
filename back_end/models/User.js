import { DataTypes } from "sequelize";
import { createHash } from "crypto";


/**
 * @swagger
 * {
 *   "components": {
 *     "schemas": {
 *       "User": {
 *         "type": "object",
 *         "properties": {
 *           "idUser": {
 *             "type": "integer",
 *             "format": "int32",
 *             "description": "Identificativo univoco auto-incrementale dell'utente",
 *             "example": 1
 *           },
 *           "Nome": {
 *             "type": "string",
 *             "description": "Nome dell'utente",
 *             "example": "Mario"
 *           },
 *           "Cognome": {
 *             "type": "string",
 *             "description": "Cognome dell'utente",
 *             "example": "Rossi"
 *           },
 *           "email": {
 *             "type": "string",
 *             "format": "email",
 *             "description": "Email dell'utente (deve essere univoca)",
 *             "example": "mario.rossi@example.com"
 *           },
 *           "telefono": {
 *             "type": "string",
 *             "description": "Numero di telefono (deve essere univoco)",
 *             "example": "+39 333 1234567"
 *           },
 *           "password": {
 *             "type": "string",
 *             "description": "Password in chiaro (verrà automaticamente hashata con SHA-256)",
 *             "example": "mypassword123"
 *           },
 *           "createdAt": {
 *             "type": "string",
 *             "format": "date-time",
 *             "description": "Campo generato automaticamente dal sistema (ignorato in input)",
 *             "example": "2025-05-17T16:22:54.589Z"
 *           },
 *           "updatedAt": {
 *             "type": "string",
 *             "format": "date-time",
 *             "description": "Campo aggiornato automaticamente dal sistema (ignorato in input)",
 *             "example": "2025-05-17T16:22:54.589Z"
 *           }
 *         },
 *         "required": ["Nome", "Cognome", "email", "telefono", "password"],
 *         "example": {
 *           "idUser": 1,
 *           "Nome": "Mario",
 *           "Cognome": "Rossi",
 *           "email": "mario.rossi@example.com",
 *           "telefono": "+39 333 1234567",
 *           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd6",
 *           "createdAt": "2025-05-17T16:18:36.773Z",
 *           "updatedAt": "2025-05-17T16:18:36.773Z"
 *         }
 *       }
 *     }
 *   }
 * }
 */
export function UserModel(database) {
    database.define('User', {
        idUser: {
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

        telefono: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },

        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
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

