import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage.component';
import { Assortimento } from './assortimento/assortimento.component';

export const routes: Routes = [

    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "home",
        title: "Home Page",
        component: Homepage
    },
    {
        path: "assortimento",
        title: "Assortimento",
        component: Assortimento
    }

];

