import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit {

  title = 'Unimarket';

  
 public myForm!:FormGroup;

constructor(private fb:FormBuilder, private loginPrd:AuthService,
  private routerprd:Router){

}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
ngOnInit(): void {
  this.myForm = this.createMyForm();
}
private createMyForm():FormGroup{
  return this.fb.group({
    usuario:['',[Validators.required]],
    password:['',Validators.required]

  });

}
public visualizarMenu():boolean{
  return this.loginPrd.habilitarlogeo();
}

public submitFormulario(){
if(this.myForm.invalid){
  Object.values(this.myForm.controls).forEach(control=>{
    control.markAllAsTouched();
  });
  return;
}
if(!this.loginPrd.ingresarAplicativo(this.myForm.value)){
  alert("Usuario o contraseña invalido");
}else{
this.routerprd.navigateByUrl("/sesion/principal");
}
}

public get f():any{
  return this.myForm.controls;
}


 tokenService : any;
 authService : any;
  alerta!: Alerta;
  loginUser: any;

  public login(){
    const objeto = this;
    this.authService.login(this.loginUser).subscribe({
    next: (data: { respuesta: { token: any; }; }) => {
    objeto.tokenService.login(data.respuesta.token);
    },
    error: (error: { error: { respuesta: string; }; }) => {
    objeto.alerta = new Alerta(error.error.respuesta, "danger");
    }
    });
}
}