import { DataTypes } from "sequelize";
/**
 * @swagger
 * components:
 *   schemas:
 *     ProdottoIngrediente:
 *       type: object
 *       properties:
 *         prodottoId:
 *           type: integer
 *           example: 200
 *         ingredienteId:
 *           type: integer
 *           example: 300
 *       required: ["prodottoId", "ingredienteId"]
 */
export function ProdottoIngredienteModel(database) {
    return database.define("ProdottoIngrediente", {}, { timestamps: false });
}
