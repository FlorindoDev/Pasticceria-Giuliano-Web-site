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
 *         isShippable:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required: ["costo", "isShippable"]
 */
export function ProdottoModel(database) {
    return database.define("Prodotto", {
        idProdotto: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        costo: { type: DataTypes.FLOAT, allowNull: false },
        isShippable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
    });
}
