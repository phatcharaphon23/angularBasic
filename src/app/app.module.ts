import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutDashboardComponent } from './layout-dashboard/layout-dashboard.component';
import { LayoutLoginComponent } from './layout-login/layout-login.component';

import { HeaderComponent } from './layout-dashboard/header/header.component';
import { SidenavComponent } from './layout-dashboard/sidenav/sidenav.component';
import { ToggleComponent } from './layout-dashboard/toggle/toggle.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LogComponent } from './log/log.component';
import {
  PasswordDirective,
  UsernameDirective,
} from './_directive/global.directive';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';


import { MatTableModule } from '@angular/material/table';
import { Db01Component } from './db01/db01.component';
import { DeleteDialogComponent } from './dashboard/delete-dialog/delete-dialog.component';
import { EditComponent } from './dashboard/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutDashboardComponent,
    LayoutLoginComponent,
    HeaderComponent,
    SidenavComponent,
    ToggleComponent,
    DashboardComponent,
    LoginComponent,
    LogComponent,
    UsernameDirective,
    PasswordDirective,
    Db01Component,
    DeleteDialogComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
