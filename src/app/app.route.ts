import { Routes } from '@angular/router';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginComponent } from './pages/login/login.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

export const routes: Routes =
    [
        {
            path: '',
            component: MainPageComponent
        },   
        {
            path: 'Navigation',
            component: NavigationComponent,
            children:[
                {
                    path:'',
                    component:WelcomePageComponent
                },
                {
                    path:'MRL_HOME',
                    component:WelcomePageComponent
                },
                {
                    path: 'VEHICLE',
                    loadChildren: './pages/OwnerDetails/app.module#OwnerModule'
                },
                {
                    path: 'VILLAGE_HANDLER',
                    loadChildren: './pages/Village/app.module#AppModule'
                },
                {
                    path: 'LOADING',
                    loadChildren: './pages/Loading/app.module#LoadingModule'
                }
            ]

        },
         {
            path: 'Login',
            component: LoginComponent
        },
        { path: '**', redirectTo: '404' },
        { path: '404', component: PageNotFoundComponent },
    ];
