import { DataTypes } from "sequelize";

/**
 * @swagger
 * components:
 *   schemas:
 *     Ordine:
 *       type: object
 *       properties:
 *         idOrdine:
 *           type: integer
 *           format: int32
 *           example: 101
 *         numero_spedizione:
 *           type: string
 *           example: "SPED-2025-0001"
 *         stato:
 *           type: string
 *           description: Stato dell'ordine
 *           enum: ["CREATO", "PAGATO", "SPEDITO", "CONSEGNATO", "ANNULLATO"]
 *           example: "CREATO"
 *         costo:
 *           type: number
 *           format: float
 *           example: 49.99
 *         userId:
 *           type: integer
 *           format: int32
 *           description: FK verso utente
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required: ["stato", "costo", "userId","numero_spedizione", "idOrdine"]
 */
export function OrdineModel(database) {
    return database.define("Ordine", {
        idOrdine: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        numero_spedizione: { type: DataTypes.STRING, allowNull: true },
        id_pagamento: { type: DataTypes.STRING, allowNull: false },
        nota_spedizione: { type: DataTypes.STRING, allowNull: true },
        stato: {
            type: DataTypes.ENUM("IN PREPARAZIONE", "SPEDITO", "IN CONSEGNA", "CONSEGNATO", "ANNULLATO"),
            allowNull: false,
            defaultValue: "IN PREPARAZIONE"
        },
        costo: { type: DataTypes.FLOAT, allowNull: false }
    });
}
