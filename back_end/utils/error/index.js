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

export class VoteNotFoundError extends AppErrorHttp {
    constructor() {
        super(NO_CONTENT, "non ci sono voti", "VOTE_NOT_EXISTS");
    }
}

export class MemeNotFoundError extends AppErrorHttp {
    constructor() {
        super(NO_CONTENT, "non ci sono memes", "MEME_NOT_EXISTS");
    }
}

export class CommentNotFoundError extends AppErrorHttp {
    constructor() {
        super(NO_CONTENT, "non ci sono comment", "COMMENT_NOT_EXISTS");
    }
}

export class TagsNotFoundError extends AppErrorHttp {
    constructor() {
        super(NO_CONTENT, "non ci sono tags per questo meme", "TAGS_NOT_EXISTS");
    }
}


/* ****************************************************************** */
//Codici 400
export class MissingFieldError extends AppErrorHttp {
    constructor(fieldName) {
        super(BED_REQUEST, `Campo ${fieldName} mancante`, "MISSING_FIELD");
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

export class VoteAlreadyExistsError extends AppErrorHttp {
    constructor() {
        super(CONFLICT, "Voto gia esistente", "VOTE_EXISTS");
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

export class toManyTags extends AppErrorHttp {
    constructor() {
        super(CONFLICT, "puoi mettere massimo 5 tags", "TO_MANY_TAGS");
    }
}

export class TelephoneNumerPresentError extends AppErrorHttp {
    constructor() {
        super(CONFLICT, "numero di telefono già utilizato", "TELEPHONE_NUMBER_EXISTS");
    }
}

/* ****************************************************************** */

//Codici 500
export class FailToUpdateUser extends AppErrorHttp {
    constructor() {
        super(INTERNAL_SERVER_ERROR, "errore in aspetato durate Update user, riprova più tardi", "PROCESSING_USER_UPDATE_ERROR");
    }
}

export class FailToSaveTags extends AppErrorHttp {
    constructor() {
        super(INTERNAL_SERVER_ERROR, "errore in aspetato durante save tags riprova più tardi", "PROCESSING_TAGS_SAVE_ERROR");
    }
}

export class FailToDeleteTags extends AppErrorHttp {
    constructor() {
        super(INTERNAL_SERVER_ERROR, "errore in aspetato durante Delete tags riprova più tardi", "PROCESSING_TAGS_DELETE_ERROR");
    }
}

export class FailToUploadFile extends AppErrorHttp {
    constructor() {
        super(INTERNAL_SERVER_ERROR, "Errore durante l’upload", "PROCESSING_UPLOAD_FILE_ERROR");
    }
}

export class FailToSaveVote extends AppErrorHttp {
    constructor() {
        super(INTERNAL_SERVER_ERROR, "Errore durante upload del voto", "PROCESSING_UPLOAD_VOTE_ERROR");
    }
}

export class FailToSaveComment extends AppErrorHttp {
    constructor() {
        super(INTERNAL_SERVER_ERROR, "Errore durante upload del Comment", "PROCESSING_UPLOAD_COMMENT_ERROR");
    }
}

export class SignUpError extends AppErrorHttp {
    constructor() {
        super(SERVICE_UNAVAILABLE, "Al momento il signup non è disponibile", "SIGNUP_ERROR");
    }
}

export class MemeUploadError extends AppErrorHttp {
    constructor() {
        super(SERVICE_UNAVAILABLE, "Al momento upload di meme non è disponibile", "MEME_UPLOAD_ERROR");
    }
}
