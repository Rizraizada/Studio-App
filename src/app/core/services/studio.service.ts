import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Studio } from '../models/studio.model';

@Injectable({
  providedIn: 'root'
})
export class StudioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Fetch all studios
  getStudios(): Observable<Studio[]> {
    return this.http.get<Studio[]>(this.apiUrl);
  }

  // Mock or real API-based location suggestions
  getLocationSuggestions(query: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/locations?query=${query}`);
  }
}
