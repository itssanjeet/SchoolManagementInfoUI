import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { ShowUsersComponent } from './dashboard/admin/show-users/show-users.component';
import { EditUserComponent } from './dashboard/admin/edit-user/edit-user.component';
import { StudentComponent } from './dashboard/student/student.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
        children: [
            {
                path: 'admin', component: AdminComponent,
                children: [
                    { path: 'show-users', component: ShowUsersComponent },
                    { path: 'edit-user', component: EditUserComponent },
                    { path: '', redirectTo: 'show-users', pathMatch: 'full' }
                ], canActivate: [AuthGuard]
            },
            { path: 'student', component: StudentComponent },
            { path: '', redirectTo: 'admin', pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }