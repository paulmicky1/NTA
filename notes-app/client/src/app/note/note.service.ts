import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Note {
  id: string;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private baseURL = 'http://localhost:3000/notes';

  constructor(private http:HttpClient) { }

  // Fetch all notes
  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseURL);
  }

  // Fetch a single note by ID
  getNoteById(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.baseURL}/${id}`);
  }

  // Create a new note
  createNote(note: Partial<Note>): Observable<Note> {
    return this.http.post<Note>(this.baseURL, note);
  }

  // Update an existing note by ID
  updateNote(id: string, note: Partial<Note>): Observable<Note> {
    return this.http.put<Note>(`${this.baseURL}/${id}`, note);
  }

  // Delete a note by ID
  deleteNote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }

}
