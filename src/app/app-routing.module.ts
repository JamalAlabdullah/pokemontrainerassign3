import { LoginPage } from './pages/login/login.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { TrainerPage } from './pages/trainer/trainer.page';


const routes: Routes =[
    {
        path:"",
        pathMatch:"full",
        redirectTo:"/login"
    },

    {
        path:"login",
        component:LoginPage
    },
    {
         path:"pokemon",
         component:PokemonCataloguePage
    },
    {
        path:"trainer",
        component:TrainerPage
    }
]
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]

})

export class AppRoutingModule{

}