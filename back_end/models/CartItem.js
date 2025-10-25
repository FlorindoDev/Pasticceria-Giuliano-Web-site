import { DataTypes } from "sequelize";

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         idCartItem:
 *           type: integer
 *           format: int32
 *           example: 45
 *         quantity:
 *           type: integer
 *           description: Quantità del prodotto nel carrello
 *           example: 2
 *         cartId:
 *           type: integer
 *           format: int32
 *           description: FK verso il carrello a cui appartiene la riga
 *           example: 12
 *         prodottoId:
 *           type: integer
 *           format: int32
 *           description: FK verso il prodotto inserito nel carrello
 *           example: 8
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required: ["idCartItem", "quantity", "cartId", "prodottoId"]
 */

export function CartItemModel(database) {
    return database.define("CartItem", {
        idCartItem: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    });
}
