import { z } from "zod";

const checkPageSize = (val) => {
    const isPageSizeCorrect = val > 0 && val <= 10;
    return (val !== undefined && isPageSizeCorrect) ? val : 10;

}

const checkSize = (val) => {
    return (val !== undefined && val > 0) ? val : 1;
}


export let idRequired = {
    id: z.string().refine((val) => { return !isNaN(Number(val)) && Number(val) > 0; }, { message: "valore deve essere un numero" }),
}

export let idNotRequired = {
    id: z.string().optional()
        .refine((val) => val === undefined || (!isNaN(Number(val) && Number(val) > 0)), {
            message: "Il valore deve essere un numero (in stringa)",
        })
}

let page = z.object({
    page: z.coerce.number().default(1)  // coerce casta u tipi
        .transform(checkSize, { message: "valore deve essere un numero positivo" }),
});

let pageSize = z.object({
    pagesize: z.coerce.number().default(10)
        .transform(checkPageSize, { message: "valore deve essere un numero positivo <= 10" }),
});

export function unionChecks(checks = []) {

    return checks.reduce((acc, schema) => acc.and(schema));

}

export function orUnionChecks(checks = []) {

    return checks.reduce((acc, schema) => acc.or(schema));

}

export function addRefine(schema, callback, error = {}) {
    return schema.refine(callback, error);
}

export const pageNotRequiredQuery = z.object({
    query: page,
});

export const pageSizeNotRequiredQuery = z.object({
    query: pageSize,
});

/*
    Questo schema modifica i dati quindi quando usi validate mettere flag save = true
*/
export const schemaPage = unionChecks([pageNotRequiredQuery, pageSizeNotRequiredQuery]);
