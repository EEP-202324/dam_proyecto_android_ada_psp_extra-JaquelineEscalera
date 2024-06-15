import { Injectable } from '@angular/core';
import { PolideportivoLocation } from './polideportivolocation';
@Injectable({
  providedIn: 'root'
})
export class PolideportivoService {

  url = 'http://localhost:3000/locations';

  async getAllPolideportivoLocations(): Promise<PolideportivoLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getPolideportivoLocationById(id: number): Promise<PolideportivoLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }
}

