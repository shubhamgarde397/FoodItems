
import {  Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { HandlerComponent } from './handler/handler.component';
import { DisplayComponent } from './display/display.component';

export const LoadingRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'LOADING'
        },
        {
            path: 'LOADING',
            component: HandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: AddComponent
                    },
                    {
                        path: 'Display',
                        component: DisplayComponent
                    },
                    {
                        path: 'Add',
                        component: AddComponent
                    }
                ]
        }
    ]