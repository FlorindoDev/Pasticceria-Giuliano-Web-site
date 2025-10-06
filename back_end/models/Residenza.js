import { DataTypes } from "sequelize";
/**
 * @swagger
 * components:
 *   schemas:
 *     Residenza:
 *       type: object
 *       properties:
 *         idResidenza:
 *           type: integer
 *           format: int32
 *           description: Identificativo univoco auto-incrementale della residenza
 *           example: 1
 *         regione:
 *           type: string
 *           example: Lombardia
 *         comune:
 *           type: string
 *           example: Milano
 *         cap:
 *           type: string
 *           example: "20100"
 *         via:
 *           type: string
 *           example: Via Roma
 *         numeroCivico:
 *           type: string
 *           example: "12B"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required: ["regione", "comune", "cap", "via", "numeroCivico"]
 */
export function ResidenzaModel(database) {
    return database.define("Residenza", {
        idResidenza: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        regione: { type: DataTypes.STRING, allowNull: false },
        comune: { type: DataTypes.STRING, allowNull: false },
        cap: { type: DataTypes.STRING, allowNull: false },
        via: { type: DataTypes.STRING, allowNull: false },
        numeroCivico: { type: DataTypes.STRING, allowNull: false }
    });
}
