import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:3000/api/notes';

  constructor(private http: HttpClient) { }

  getNotes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getNoteById(id: string): Observable<any> {
    return this.http.get<any>(\`\${this.apiUrl}/\${id}\`);
  }

  createNote(note: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, note);
  }

  updateNote(id: string, note: any): Observable<any> {
    return this.http.put<any>(\`\${this.apiUrl}/\${id}\`, note);
  }

  deleteNote(id: string): Observable<any> {
    return this.http.delete<any>(\`\${this.apiUrl}/\${id}\`);
  }
}