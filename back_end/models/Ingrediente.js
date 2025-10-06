import { DataTypes } from "sequelize";
/**
 * @swagger
 * components:
 *   schemas:
 *     Ingrediente:
 *       type: object
 *       properties:
 *         idIngrediente:
 *           type: integer
 *           format: int32
 *           example: 300
 *         nome:
 *           type: string
 *           example: "Zucchero"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required: ["nome"]
 */
export function IngredienteModel(database) {
    return database.define("Ingrediente", {
        idIngrediente: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: { type: DataTypes.STRING, allowNull: false, unique: true }
    });
}
