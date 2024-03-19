import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MaincontentComponent } from './maincontent.component';
import { ProgressComponent } from './progress/progress.component';
import { ProgressStepComponent } from './progress/progress-step/progress-step.component';
import { ProgressStepDirective } from './progress/progress-step.directive';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MaincontentComponent,
    ProgressComponent,
    ProgressStepComponent,
    ProgressStepDirective,
  ],
  exports: [MaincontentComponent],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,CommonModule
  ]

})
export class MaincontentModule {}