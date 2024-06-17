import { Injectable } from '@angular/core';
import { Polideportivo } from './polideportivolocation';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PolideportivoService {

  url = 'http://localhost:8080/polideportivos';
  private polideportivoActualizadaSubject = new Subject<Polideportivo>();

  constructor(private http: HttpClient) {}

  updatePolideportivo(updatedPolideportivo: Polideportivo): Observable<Polideportivo> {
    return this.http.put<Polideportivo>(`${this.url}/${updatedPolideportivo.id}`, updatedPolideportivo);
  }

  getAllPolideportivoS() {
    return this.http.get<Polideportivo[]>(this.url);
  }

  getPolideportivoById(id: number) {
    return this.http.get<Polideportivo>(`${this.url}/${id}`);
  }

  agregarPolideportivo(polideportivoDatos: Omit<Polideportivo, 'id'>): Observable<Polideportivo> {
    return this.http.post<any>(this.url, polideportivoDatos);
  }
  getPolideportivoActualizadaObservable(): Observable<Polideportivo> {
    return this.polideportivoActualizadaSubject.asObservable();
  }

  emitirPolideportivoActualizada(polideportivo: Polideportivo | undefined) {
    if(polideportivo !== undefined) {
      this.polideportivoActualizadaSubject.next(polideportivo);
    }
  }
  eliminarPolideportivo(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
