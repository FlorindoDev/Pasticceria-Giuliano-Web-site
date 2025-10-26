import { DataTypes } from "sequelize";

/**
 * @swagger
 * components:
 *   schemas:
 *     Prodotto:
 *       type: object
 *       properties:
 *         idProdotto:
 *           type: integer
 *           format: int32
 *           example: 200
 *         costo:
 *           type: number
 *           format: float
 *           example: 7.50
 *         peso:
 *           type: number
 *           format: float
 *           example: 500
 *         nome:
 *           type: string
 *           example: tiramisú
 *         isShippable:
 *           type: boolean
 *           example: true
 *         image:
 *           type: string
 *           example: bucket/dolce.png
 *         tag:
 *           type: string
 *           example: semi-freddo
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required: ["costo", "isShippable","nome","image", "idProdotto","tag"]
 */
export function ProdottoModel(database) {
    return database.define("Prodotto", {
        idProdotto: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descrizione: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        costo: { type: DataTypes.FLOAT, allowNull: false },
        peso: { type: DataTypes.FLOAT, allowNull: false },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isShippable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
    });
}
