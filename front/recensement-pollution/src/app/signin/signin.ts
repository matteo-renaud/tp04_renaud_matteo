import { Component, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Button } from "primeng/button";
import { Card } from "primeng/card";
import { InputText } from 'primeng/inputtext';
import { Message } from "primeng/message";
import { UtilisateurService } from '../services/utilisateur-service';

@Component({
  selector: 'app-signin',
  imports: [Button, Card, RouterModule, Message, ReactiveFormsModule, InputText],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class Signin {

  isLoading:boolean = false;

  constructor(private messageService:MessageService, private utilisateurService: UtilisateurService,
    private router: Router) { }

  submitted: boolean = false; 
  formSignin = new FormGroup({
    login: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [ Validators.required ]),
  });

  signin() {
    
    this.submitted = true;
    if (this.formSignin.invalid) {
      return;
    }
    
    this.isLoading = true;
    const formData = this.formSignin.value;

    this.utilisateurService.login(formData.login!, formData.password!).subscribe({
      next: (utilisateur) => {
          this.messageService.add({ severity: 'info', detail: 'Connexion réussie' });
          this.utilisateurService.utilisateurConnecte = utilisateur;
          this.isLoading = false;
          this.router.navigate(['/']);
        }, 
      error: (err) => {
        console.error("Erreur lors de la connexion :", err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: "Login ou mot de passe incorrect" });
        this.isLoading = false;
      }
    });
  }
}
