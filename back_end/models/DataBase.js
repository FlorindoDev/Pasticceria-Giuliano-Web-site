import { Sequelize } from "sequelize";
import { UserModel } from "./User.js";
import { ResidenzaModel } from "./Residenza.js";
import { OrdineModel } from "./Ordine.js";
import { ProdottoModel } from "./Prodotto.js";
import { IngredienteModel } from "./Ingrediente.js";
import { OrdineProdottoModel } from "./OridineProdotto.js";
import { ProdottoIngredienteModel } from "./ProdottoIngrediente.js";

import 'dotenv/config.js';

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
    dialect: process.env.DIALECT,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

UserModel(database);
ResidenzaModel(database);
OrdineModel(database);
ProdottoModel(database);
IngredienteModel(database);
OrdineProdottoModel(database);
ProdottoIngredienteModel(database);

export const {
    User,
    Residenza,
    Ordine,
    Prodotto,
    Ingrediente,
    OrdineProdotto,
    ProdottoIngrediente
} = database.models;


//Associazioni User
User.Residenza = User.hasMany(Residenza, { onDelete: 'CASCADE' });
User.Ordine = User.hasMany(Ordine, { onDelete: 'CASCADE' });

//Associazioni Residenza
Residenza.User = Residenza.belongsTo(User);

//Associazioni Ordine
Ordine.User = Ordine.belongsTo(User);
Ordine.Prodotto = Ordine.belongsToMany(Prodotto, { through: "OrdineProdotto", onDelete: 'CASCADE' });

//Associazioni Prodotto
Prodotto.Ordine = Prodotto.belongsToMany(Ordine, { through: "OrdineProdotto" });
Prodotto.Ingrediente = Prodotto.belongsToMany(Ingrediente, { through: "ProdottoIngrediente" });

//Associazioni ingredienti
Ingrediente.Prodotto = Ingrediente.belongsToMany(Prodotto, { through: "ProdottoIngrediente" });





database.sync({ /*alter: true*/ }).then(() => {
    console.log("Database synced correctly");
}).catch(err => {
    console.log("Error with database synchronization: " + err.message);
});



