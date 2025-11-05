import { Component, OnInit } from '@angular/core';
import { Pollution } from '../model/pollution';
import { PollutionService } from '../services/pollution-service';
import { map, Observable } from 'rxjs';
import { Card } from "primeng/card";
import { CommonModule } from '@angular/common';
import { Fieldset } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { Toast } from "primeng/toast";
import { ConfirmationService, MessageService } from 'primeng/api';
import { Image } from "primeng/image";
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProgressSpinner } from 'primeng/progressspinner';
import { TypePollution } from '../model/type-pollution';
import { Select } from 'primeng/select';
import { TypePollutionLabelPipe } from '../pipes/type-pollution-label.pipe';

@Component({
  selector: 'app-liste-pollution',
  imports: [Card, CommonModule, Fieldset, ButtonModule, Toast, Image, Select,
    ConfirmDialog, InputText, FormsModule, RouterModule, ProgressSpinner, TypePollutionLabelPipe],
  templateUrl: './liste-pollution.html',
  styleUrl: './liste-pollution.css',
  providers: [MessageService, ConfirmationService]
})
export class ListePollution implements OnInit {

  listePollution$?: Observable<Pollution[]>;
  filtreTitre: string = '';
  filtreType: string = '';
  filtreLieu: string = '';
  typePollutionOptions = Object.entries(TypePollution).map(([key, value]) => ({
    label: value,
    value: key
  }));

  constructor(private pollutionService : PollutionService, private messageService: MessageService, 
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.loadAllPollutions();
  }

  loadAllPollutions() {
    this.listePollution$ = this.pollutionService.getAll().pipe(
      map(pollutions => pollutions.sort((a, b) => a.titre.localeCompare(b.titre))));
  }

  filtrer() {
    this.listePollution$ = this.pollutionService.getAll({
      titre: this.filtreTitre,
      typePollution: this.filtreType,
      lieu: this.filtreLieu
    });
  }

  resetFiltres() {
    this.filtreTitre = '';
    this.filtreType = '';
    this.filtreLieu = '';
    this.loadAllPollutions();
  }

  deletePollution(event: Event, id: string) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Voulez-vous supprimer cette pollution ?',
        header: 'Supprimer une pollution',
        icon: 'pi pi-info-circle',
        rejectButtonProps: {
          label: 'Annuler',
          severity: 'secondary',
        },
        acceptButtonProps: {
          label: 'Supprimer',
          severity: 'danger',
        },
        accept: () => {
          this.pollutionService.deleteById(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'info', detail: 'Pollution supprimée' });
            window.location.href = '/';
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
