import { NgModule } from '@angular/core';
import { LoadingRouting } from './LoadingRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { HandlerComponent } from './handler/handler.component';
import { DisplayComponent } from './display/display.component';

@NgModule({
    declarations: [
        AddComponent,
        HandlerComponent,
        DisplayComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(LoadingRouting),

    ],
    providers: [],
    bootstrap: []
})
export class LoadingModule { }