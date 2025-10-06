import { DataTypes } from "sequelize";
/**
 * @swagger
 * components:
 *   schemas:
 *     OrdineProdotto:
 *       type: object
 *       properties:
 *         ordineId:
 *           type: integer
 *           example: 101
 *         prodottoId:
 *           type: integer
 *           example: 200
 *         quantity:
 *           type: integer
 *           example: 2
 *         priceAtPurchase:
 *           type: number
 *           format: float
 *           example: 7.50
 *       required: ["ordineId", "prodottoId", "quantity", "priceAtPurchase"]
 */
export function OrdineProdottoModel(database) {
    return database.define("OrdineProdotto", {
        quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        priceAtPurchase: { type: DataTypes.FLOAT, allowNull: false }
    }, { timestamps: false });
}
