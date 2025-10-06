import { MissingFieldError, FieldError } from "../utils/error/index.js";


export let queryParamsToList = (listParams = [], required = false, separeitor = ',') => (req, res, next) => {

    if (required) {
        listParams.forEach((value) => {
            if (req.query[value] === undefined) return next(new MissingFieldError(value));
        });
    }


    listParams.forEach((value) => {
        if (req.query[value] !== undefined) req[value] = req.query[value].split(separeitor).map(item => item.toLowerCase().trim());
    })
    next();

}


export const validate = (schema, save = false, saveLocation = "checked") => (req, res, next) => {
    try {
        let result = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        if (save) req[saveLocation] = result;
        next();

    } catch (e) {
        return next(new FieldError(e.errors));
    }
};