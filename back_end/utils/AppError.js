
/**
 * @swagger
 * {
 *   "components": {
 *     "schemas": {
 *       "Error": {
 *         "type": "object",
 *         "properties": {
 *           "status": {
 *             "type": "integer",
 *             "description": "Codice numerico dello status dell'errore",
 *             "example": 404
 *           },
 *           "code": {
 *             "type": "string",
 *             "description": "Codice interno di errore",
 *             "example": "USER_NOT_EXISTS"
 *           },
 *           "message": {
 *             "type": "string",
 *             "description": "Descrizione testuale dell'errore",
 *             "example": "Non ci sono utenti"
 *           },
 *           "errorfield": {
 *             "type": "array",
 *             "description": "Dettagli dell'errore relativi ai campi (opzionale)",
 *             "items": {
 *               "type": "object",
 *               "properties": {
 *                 "code": {
 *                   "type": "string",
 *                   "example": "too_small"
 *                 },
 *                 "minimum": {
 *                   "type": "integer",
 *                   "example": 8
 *                 },
 *                 "type": {
 *                   "type": "string",
 *                   "example": "string"
 *                 },
 *                 "inclusive": {
 *                   "type": "boolean",
 *                   "example": true
 *                 },
 *                 "exact": {
 *                   "type": "boolean",
 *                   "example": false
 *                 },
 *                 "message": {
 *                   "type": "string",
 *                   "example": "La stringa deve contenere almeno 8 caratteri"
 *                 },
 *                 "path": {
 *                   "type": "array",
 *                   "items": {
 *                     "type": "string"
 *                   },
 *                   "example": ["body", "password"]
 *                 }
 *               }
 *             }
 *           }
 *         },
 *         "required": ["status", "message"]
 *       }
 *     }
 *   }
 * }
 */
export class AppErrorHttp extends Error {
  constructor(statusCode, message, code = null, errors = null) {
    super(message);
    this.status = statusCode;
    this.code = code                                  // per codici interni     
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);  // si salva lo stackTrace
  }
}


export class AppError extends Error {
  constructor(message, code = null) {
    super(message);
    this.code = code                                  // per codici interni                               
    Error.captureStackTrace(this, this.constructor);  // si salva lo stackTrace
  }
}