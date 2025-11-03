import { AppErrorHttp } from "../AppError.js";

const BED_REQUEST = 400;
const CONFLICT = 409;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const NO_CONTENT = 204;
const INTERNAL_SERVER_ERROR = 500;
const SERVICE_UNAVAILABLE = 503
const FORBIDDEN = 403

//Codici 200

export class UserNotFoundError extends AppErrorHttp {
    constructor() {
        super(NO_CONTENT, "non ci sono utenti", "USER_NOT_EXISTS");
    }
}

export class ProductNotFoundError extends AppErrorHttp {
    constructor() {
        super(NO_CONTENT, "prodotto non trovato", "PRODUCT_NOT_EXISTS");
    }
}

export class IngredientNotFoundError extends AppErrorHttp {
    constructor() {
        super(NO_CONTENT, "non ci sono Ingredienti", "INGREDIENT_NOT_EXISTS");
    }
}

export class ResidenceNotFoundError extends AppErrorHttp {
    constructor() {
        super(NO_CONTENT, "non ci sono Residenze", "RESIDENCE_NOT_EXISTS");
    }
}

export class CartNotFoundError extends AppErrorHttp {
    constructor() {
        super(NO_CONTENT, "non ci sono cart", "CART_NOT_EXISTS");
    }
}

export class OrderNotFoundError extends AppErrorHttp {
    constructor() {
        super(NO_CONTENT, "non ci sono ordini", "ORDER_NOT_EXISTS");
    }
}

export class CartItemNotFoundError extends AppErrorHttp {
    constructor() {
        super(NO_CONTENT, "non ci sono cart item", "CART_ITEM_NOT_EXISTS");
    }
}




/* ****************************************************************** */
//Codici 400
export class MissingFieldError extends AppErrorHttp {
    constructor(fieldName) {
        super(BED_REQUEST, `Campo ${fieldName} mancante`, "MISSING_FIELD");
    }
}

export class WebBookErrorStripe extends AppErrorHttp {
    constructor(err) {
        super(BED_REQUEST, `Errore WebBook: ${err}`, "ERROR_WEB_BOOK");
    }
}


export class FieldError extends AppErrorHttp {

    constructor(errors) {
        super(BED_REQUEST, "Campo mancante o contenuto non valido", "ERROR_FIELD", errors);
    }
}

export class MissingFile extends AppErrorHttp {
    constructor() {
        super(BED_REQUEST, "Nessun file caricato", "MISSING_FILE");
    }
}

export class ExtensionFileNotValid extends AppErrorHttp {
    constructor() {
        super(BED_REQUEST, "Estensione File non valida", "EXTENSION_NOT_VALID");
    }
}

export class UserAlreadyExistsError extends AppErrorHttp {
    constructor() {
        super(CONFLICT, "Utente con questa email già registrato", "USER_EXISTS");
    }
}

export class UnauthorizedError extends AppErrorHttp {
    constructor() {
        super(UNAUTHORIZED, "Non autorizzato", "UNAUTHORIZED");
    }
}

export class ForbbidenError extends AppErrorHttp {
    constructor() {
        super(FORBIDDEN, "Non sei autorizzato ad accedere a questa risorsa", "FORBIDDEN");
    }
}

export class CredentialError extends AppErrorHttp {
    constructor() {
        super(UNAUTHORIZED, "Email o password sbagliate", "UNAUTHORIZED");
    }
}

export class TelephoneNumerPresentError extends AppErrorHttp {
    constructor() {
        super(CONFLICT, "numero di telefono già utilizato", "TELEPHONE_NUMBER_EXISTS");
    }
}

export class ToMnayResidenceError extends AppErrorHttp {
    constructor() {
        super(CONFLICT, "Hai troppe Residenze (max 1)", "MAX_RESIDENCE");
    }
}

/* ****************************************************************** */

//Codici 500
export class FailToUpdateUser extends AppErrorHttp {
    constructor() {
        super(INTERNAL_SERVER_ERROR, "errore in aspetato durate Update user, riprova più tardi", "PROCESSING_USER_UPDATE_ERROR");
    }
}

export class FailToSaveResidence extends AppErrorHttp {
    constructor() {
        super(INTERNAL_SERVER_ERROR, "Errore durante l'inserimeto Residence", "RESIDENCE_ERROR");
    }
}

export class FailToSaveCart extends AppErrorHttp {
    constructor() {
        super(INTERNAL_SERVER_ERROR, "Errore durante l'inserimeto del cart", "CART_ERROR");
    }
}

export class FailToSaveCartItem extends AppErrorHttp {
    constructor() {
        super(INTERNAL_SERVER_ERROR, "Errore durante l'inserimeto nel carello", "CART_ITEM_ERROR");
    }
}

export class FailToDeleteIngredientError extends AppErrorHttp {
    constructor() {
        super(INTERNAL_SERVER_ERROR, "Errore durante la cancellazione del Ingrediente", "INGREDIENT_DELETE_ERROR");
    }
}

export class FailToSaveIngredientError extends AppErrorHttp {
    constructor() {
        super(INTERNAL_SERVER_ERROR, "Errore durante l'inserimeto del Ingrediente", "INGREDIENT_SAVE_ERROR");
    }
}

export class FailToSaveProductError extends AppErrorHttp {
    constructor() {
        super(INTERNAL_SERVER_ERROR, "Errore durante l'inserimeto prodotto", "PRODUCT_ERROR");
    }
}


export class FailToUploadFile extends AppErrorHttp {
    constructor() {
        super(INTERNAL_SERVER_ERROR, "Errore durante l’upload", "PROCESSING_UPLOAD_FILE_ERROR");
    }
}

export class SignUpError extends AppErrorHttp {
    constructor() {
        super(SERVICE_UNAVAILABLE, "Al momento il signup non è disponibile", "SIGNUP_ERROR");
    }
}

