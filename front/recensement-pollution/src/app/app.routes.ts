import { Routes } from '@angular/router';
import { FormulairePollution } from './formulaire-pollution/formulaire-pollution';
import { ListePollution } from './liste-pollution/liste-pollution';
import { DetailsPollution } from './details-pollution/details-pollution';
import { Signin } from './signin/signin';
import { Signup } from './signup/signup';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ListePollution,
    },
    {
        path: 'pollution/create',
        component: FormulairePollution,
    },
    {
        path: 'pollution/read/:id',
        component: DetailsPollution,
    },
    {
        path: 'pollution/edit/:id',
        component: FormulairePollution,
    },
    {
        path: 'signin',
        component: Signin,
    },
    {
        path: 'signup',
        component: Signup,
    },
];
