import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Utilisateur } from '../model/utilisateur';

const apiUrl = environment.backendClient + "/api/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  // Utilisateur fictif (simulation)
  utilisateurConnecte?:Utilisateur;
  
  constructor(private http:HttpClient) { }

  public getAll() : Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(apiUrl);
  }

  public create(utilsiateur: Utilisateur) {
    return this.http.post<Utilisateur>(apiUrl, utilsiateur);
  }

  public login(login: string, password: string): Observable<Utilisateur> {
    const body = { login, password };
    return this.http.post<Utilisateur>(`${apiUrl}/login`, body);
  }

  public logout() {
    this.utilisateurConnecte = undefined;
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/${id}`);
  }
}
