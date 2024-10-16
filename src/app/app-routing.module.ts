import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormBuilderComponent } from './dynamic-form-builder/dynamic-form-builder.component';

const routes: Routes = [
  { path: '', redirectTo: '/form-builder', pathMatch: 'full' },
  { path: 'form-builder', component: DynamicFormBuilderComponent },
  { path: '**', redirectTo: '/form-builder' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
