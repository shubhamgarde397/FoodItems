
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { HandlerComponent } from './handler/handler.component';
import { DisplayComponent } from './display/display.component';
import { AddComponent } from './add/add.component';

export const VillageRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'VILLAGE_HANDLER'
        },
        {
            path: 'VILLAGE_HANDLER',
            component: HandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: AddComponent
                    },
                    {
                        path: 'VillageAdd',
                        component: AddComponent
                    },
                    {
                        path: 'VillageDisp',
                        component: DisplayComponent
                    }
                ]
        }
    ]