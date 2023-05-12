
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { OwnerhandlerComponent } from './ownerhandler/ownerhandler.component';
import { OddispComponent } from './oddisp/oddisp.component';
import { AddComponent } from './add/add.component';

export const OwnerRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'VEHICLE'
        },
        {
            path: 'VEHICLE',
            component: OwnerhandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: OddispComponent
                    },
                    {
                        path: 'Display',
                        component: OddispComponent
                    },
                    {
                        path: 'Add',
                        component: AddComponent
                    }
                ]
        }
    ]