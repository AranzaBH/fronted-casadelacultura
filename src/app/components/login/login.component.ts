import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    MatListModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    MatDividerModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    "username" : '',
    "password" : '',
  }

  constructor(private snack:MatSnackBar,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.loginData.username.trim() == '' || this.loginData.username.trim() == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }

    if(this.loginData.password.trim() == '' || this.loginData.password.trim() == null){
      this.snack.open('La contraseña es requerida !!','Aceptar',{
        duration:3000
      })
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user:any) => {
          this.loginService.setUser(user);
          console.log(user);

          if(this.loginService.getUserRole() == 'ROLE_ADMINISTRADOR'){
            //dashboard admin
            //window.location.href = '/admin';
            this.router.navigate(['admin/dash']);
            this.loginService.loginStatusSubjec.next(true);
            console.log(this.loginService.getCurrentUser());
          }
          else if(this.loginService.getUserRole() == 'ROLE_NORMAL'){
            //user dashboard
            //window.location.href = '/user-dashboard';
            this.router.navigate(['user-dashboard']);
            this.loginService.loginStatusSubjec.next(true);
            console.log(this.loginService.getCurrentUser());
          }
          else if(this.loginService.getUserRole() == 'ROLE_TALLERISTA'){
            //user dashboard
            //window.location.href = '/user-dashboard';
            this.router.navigate(['admin/dash-tallerista']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else if(this.loginService.getUserRole() == 'ROLE_GALERISTA'){
            //user dashboard
            //window.location.href = '/user-dashboard';
            this.router.navigate(['admin/dash-galerista']);
            this.loginService.loginStatusSubjec.next(true);
          }
          
         else{
            this.loginService.logout();
          }
        })
      },(error) => {
        console.log(error);
        this.snack.open('Detalles inválidos , vuelva a intentar !!','Aceptar',{
          duration:3000
        })
      }
    )
  }
}
