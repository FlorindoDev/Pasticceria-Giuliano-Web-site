import express from "express";
import { enforceAuthentication, isOwnProfile } from "../middleware/authorization.js"
import { UsersController } from "../controllers/UsersController.js";
import { upLoad as upLoadOnGoogle } from "../middleware/GoogleStorage.js"
import { idUserRequredParams, schemaUserPut } from "../schemas/user.schema.js";
import { validate } from "../middleware/Middlewares.js";
import { schemaPage } from "../schemas/utils.schema.js";

//multer
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
const imageParser = upload.fields([{ name: 'image', maxCount: 1 }])


export const router = express.Router();


/**
 * @swagger
 * {
 *   "/users": {
 *     "get": {
 *       "tags": ["Users"],
 *       "summary": "Recupera la lista degli utenti",
 *       "description": "Restituisce una paginazione di utenti; i parametri `pagesize` e `page` sono opzionali.",
 *       "parameters": [
 *         {
 *           "name": "pagesize",
 *           "in": "query",
 *           "description": "Numero di utenti per pagina (1–10). Default: 10",
 *           "required": false,
 *           "schema": {
 *             "type": "integer",
 *             "minimum": 1,
 *             "maximum": 10,
 *             "default": 10
 *           }
 *         },
 *         {
 *           "name": "page",
 *           "in": "query",
 *           "description": "Numero di pagina da visualizzare (>=1). Default: 1",
 *           "required": false,
 *           "schema": {
 *             "type": "integer",
 *             "minimum": 1,
 *             "default": 1
 *           }
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Lista di utenti trovati",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "type": "array",
 *                 "items": { "$ref": "#/components/schemas/User" }
 *               },
 *                "example": {
 *                      "idUser": 1,
 *                      "nickName": "johnDoe",
 *                       "email": "john@example.com",
 *                       "profilePic": null,
 *                       "createdAt": "2025-05-17T16:18:36.773Z",
 *                       "updatedAt": "2025-05-17T16:18:36.773Z"
 *               }
 *             }
 *           }
 *         },
 *         "404": {
 *           "description": "Nessun utente trovato",
 *           "content": {
 *             "application/json": {
 *               "schema": { "$ref": "#/components/schemas/Error" }
 *             }
 *           }
 *         },
 *       }
 *     }
 *   }
 * }
 */
router.get('/', validate(schemaPage, true), (req, res, next) => {


    UsersController.getAllUsers(req.checked.query.pagesize, req.checked.query.page).then((result) => {

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
 *     "get": {
 *       "tags": ["Users"],
 *       "summary": "Recupera un utente tramite ID",
 *       "description": "Restituisce le informazioni dettagliate di un utente in base all'ID specificato",
 *       "operationId": "getUserById",
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
 *                      "idUser": 1,
 *                      "nickName": "johnDoe",
 *                       "email": "john@example.com",
 *                       "profilePic": null,
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
router.get('/:id', validate(idUserRequredParams), (req, res, next) => {

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
 *               "nickName": "johnDoe",
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
        res.status(200)
        res.send();
    }).catch(err => {
        next(err);
    });

});


/**
 * @swagger
 * {
 *   
 *   "/users/{id}/upload-profile-pic": {
 *     "post": {
 *       "tags": ["Users"],
 *       "summary": "Upload user profile picture",
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "required": true,
 *           "schema": { "type": "string" },
 *           "description": "Deve essere id del tuo profilo"
 *         }
 *       ],
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "multipart/form-data": {
 *             "schema": {
 *               "type": "object",
 *               "properties": {
 *                 "image": {
 *                   "type": "string",
 *                   "format": "binary",
 *                   "description": "Image file to set as the user's profile picture"
 *                 }
 *               },
 *               "required": ["image"]
 *             }
 *           }
 *         }
 *       },
 *       "responses": {
 *         "200": {
 *           "description": "Profile picture updated successfully"
 *         },
 *         "401": {
 *           "description": "Unauthorized , il profilo non è tuo"
 *         },
 *          "404": {
 *           "description": "utente non esiste"
 *         },
 *         "500": {
 *           "description": "Something went wrong, please try again later"
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.post('/:id/upload-profile-pic', [enforceAuthentication, validate(idUserRequredParams), isOwnProfile, imageParser, upLoadOnGoogle], (req, res, next) => {
    UsersController.updateProfilePic(req.params.id, req.profilepicUrl).then(() => {

        res.status(200);
        res.send({ url: req.profilepicUrl });
        return;

    }).catch((err) => {
        next(err)
    });

});



