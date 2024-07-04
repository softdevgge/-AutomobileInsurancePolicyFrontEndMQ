import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuoteComponent } from './quote/quote.component';
import { AuthGuard } from './auth.guard';
import { QuoteFormComponent } from './quote-form/quote-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'quote', component: QuoteComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'quoteform', component: QuoteFormComponent, canActivate: [AuthGuard] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
