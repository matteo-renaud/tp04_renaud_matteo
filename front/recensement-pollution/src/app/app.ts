import { Component, signal } from '@angular/core';
import { PollutionService } from './services/pollution-service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { Button } from "primeng/button";
import { MenubarModule } from 'primeng/menubar';
import { Utilisateur } from './model/utilisateur';
import { UtilisateurService } from './services/utilisateur-service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialog } from "primeng/confirmdialog";
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-root',
  imports: [HttpClientModule, RouterModule, Button, MenubarModule, SplitButtonModule, ConfirmDialog, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [PollutionService, MessageService, ConfirmationService]
})
export class App {
  protected readonly title = signal('recensement-pollution');

  constructor(private utilisateurService: UtilisateurService, private messageService: MessageService,
    private confirmationService: ConfirmationService) {
    this.items = [
      {
          label: 'Supprimer compte',
          icon: 'pi pi-trash',
          command: () =>  this.supprimerCompte(),
        }
    ];
  }

  items: MenuItem[];

  get utilisateurConnecte(): Utilisateur | undefined {
    return this.utilisateurService.utilisateurConnecte;
  }

  logout() {
    this.utilisateurService.logout();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Déconnexion' });
  }

  supprimerCompte() {
    this.confirmationService.confirm({
        message: 'Voulez-vous supprimer votre compte ?',
        header: 'Supprimer votre compte',
        icon: 'pi pi-info-circle',
        rejectButtonProps: { label: 'Annuler', severity: 'secondary'},
        acceptButtonProps: { label: 'Supprimer', severity: 'danger' },
        accept: () => {
          this.utilisateurService.delete(this.utilisateurConnecte!.id!).subscribe({
          next: () => {
            this.utilisateurService.logout();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Compte supprimé' });
          },
          error: (err) => {
            console.error("Erreur lors de la suppression :", err);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: "Erreur lors de la suppression" });
          }
        });
      }
    });
  }
}
