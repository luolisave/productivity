import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private httpClient: HttpClient;
  constructor() {
    this.httpClient = inject(HttpClient);
  }
  getNotes() {
    return this.httpClient.get("http://localhost:3000/atom/list?type=note");
  }

  getNote(key: string) {
    return this.httpClient.get("http://localhost:3000/atom?type=note&key="+key);
  }
}
