import express from "express";
import { enforceAuthentication, isOwnProfile } from "../middleware/authorization.js"
import { UsersController } from "../controllers/UsersController.js";
import { idUserRequiredParams, schemaUserPut } from "../schemas/user.schema.js";
import { validate } from "../middleware/Middlewares.js";

export const router = express.Router();


/**
 * @swagger
 * {
 *   "/users/{id}": {
 *     "get": {
 *       "tags": ["Users"],
 *       "summary": "Recupera un utente tramite ID",
 *       "description": "Restituisce le informazioni dettagliate di un utente in base all'ID specificato",
 *       "operationId": "getUserById",
 *         "security": [
 *          {
 *              "bearerAuth": []
 *          }
 *        ],
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "description": "ID dell'utente da recuperare",
 *           "required": true,
 *           "schema": {
 *             "type": "string"
 *           }
 *         }
 *       ],
 *       "produces": ["application/json"],
 *       "responses": {
 *         "200": {
 *           "description": "Lista di utenti trovati",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "type": "object",
 *                 "items": { "$ref": "#/components/schemas/User" }
 *               },
 *                "example": {
 *                      "idUser": "018fa0fc-3e68-7ccd-9e85-5b3950397aad",
 *                      "nome": "johnDoe",
 *                      "cognome": "johnDoe",
 *                       "email": "john@example.com",
 *                       "telefono": null,
 *                       "createdAt": "2025-05-17T16:18:36.773Z",
 *                       "updatedAt": "2025-05-17T16:18:36.773Z"
 *               }
 *             }
 *           }
 *         },
 *         "404": {
 *           "description": "Utente non trovato",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           },
 *           "examples": {
 *             "application/json": {
 *               "code": 404,
 *               "message": "non ci sono utenti"
 *             }
 *           }
 *         },
 *         "500": {
 *           "description": "Errore del server",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.get('/:id', [enforceAuthentication, validate(idUserRequiredParams), isOwnProfile], (req, res, next) => {

    UsersController.getUserFromId(req.params.id).then((result) => {

        res.status(200);
        res.json(result);

    }).catch((err) => {
        next(err)
    });
});

/**
 * @swagger
 * {
 *   "/users/{id}": {
 *     "put": {
 *       "tags": ["Users"],
 *       "summary": "Aggiorna un utente tramite ID",
 *       "description": "Aggiorna un utente in base all'ID specificato",
 *       "operationId": "putUserById",
 *       "security": [
 *          {
 *              "bearerAuth": []
 *          }
 *        ],
 *        "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/User"
 *             },
 *             "example": {
 *               "nome": "johnDoe",
 *               "cognome": "johnDoe",
 *               "telefono": "3391382168",
 *               "email": "john@example.com",
 *               "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd6"
 *             }
 *           }
 *         }
 *       },
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "description": "ID dell'utente da recuperare",
 *           "required": true,
 *           "schema": {
 *             "type": "string"
 *           }
 *         }
 *       ],
 *       "produces": ["application/json"],
 *       "responses": {
 *         "200": {
 *           "description": "Lista di utenti trovati",
 *         },
 *         "404": {
 *           "description": "Utente non trovato",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           },
 *           "examples": {
 *             "application/json": {
 *               "code": 404,
 *               "message": "non ci sono utenti"
 *             }
 *           }
 *         },
 *         "500": {
 *           "description": "Errore del server",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.put('/:id', enforceAuthentication, validate(schemaUserPut), isOwnProfile, (req, res, next) => {

    let changes = UsersController.changesObject(req);

    UsersController.updateUser(req.idUser, changes).then(() => {

        res.status(200);
        res.send();

    }).catch((err) => {
        next(err)
    });
});

/**
 * @swagger
 * {
 *   "/users/{id}": {
 *     "delete": {
 *       "tags": ["Users"],
 *       "summary": "Cancella un utente tramite ID",
 *       "description": "",
 *       "operationId": "deleteUserById",
 *       "security": [
 *          {
 *              "bearerAuth": []
 *          }
 *        ],
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "description": "ID dell'utente da recuperare",
 *           "required": true,
 *           "schema": {
 *             "type": "string"
 *           }
 *         }
 *       ],
 *       "produces": ["application/json"],
 *       "responses": {
 *         "200": {
 *           "description": "Lista di utenti trovati",
 *          },
 *         "404": {
 *           "description": "Utente non trovato",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           },
 *           "examples": {
 *             "application/json": {
 *               "code": 404,
 *               "message": "non ci sono utenti"
 *             }
 *           }
 *         },
 *         "500": {
 *           "description": "Errore del server",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.delete('/:id', enforceAuthentication, isOwnProfile, (req, res, next) => {
    UsersController.deleteUser(req.idUser).then(() => {
        res.status(200);
        res.send();
    }).catch(err => {
        next(err);
    });

});





