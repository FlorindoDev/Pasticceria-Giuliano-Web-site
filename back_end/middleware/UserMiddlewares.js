import { User } from "../models/DataBase.js"



export let isUserPrsent = (err) => async (req, res, next) => {

    let where = { email: req.body.email }

    let user = await User.findOne({
        where,
    }
    );

    user !== null ? next(err) : next();

}

export let isTelephoneNumerPresent = (err) => async (req, res, next) => {

    if (req.body.telefono) {

        let user = await User.findOne({
            where: { telefono: req.body.telefono },
        }
        );

        user !== null ? next(err) : next();
        return;
    }
    next();

}
