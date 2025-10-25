import { DataTypes } from "sequelize";

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         idCart:
 *           type: integer
 *           format: int32
 *           example: 12
 *         isActive:
 *           type: boolean
 *           description: Indica se il carrello è attivo (non ancora convertito in ordine)
 *           example: true
 *         userId:
 *           type: integer
 *           format: int32
 *           description: FK verso l'utente proprietario del carrello
 *           example: 3
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required: ["idCart", "isActive", "userId"]
 */

export function CartModel(database) {
    return database.define("Cart", {
        idCart: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
    });
}
