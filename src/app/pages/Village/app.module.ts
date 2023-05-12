import { NgModule } from '@angular/core';
import { VillageRouting } from './VillageRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from './display/display.component';
import { AddComponent } from './add/add.component';
import { HandlerComponent } from './handler/handler.component';
@NgModule({
    declarations: [
        DisplayComponent,
        AddComponent,
        HandlerComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(VillageRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }