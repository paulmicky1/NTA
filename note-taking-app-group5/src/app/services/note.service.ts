import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [];

  constructor() {}

  getNotes(): Note[] {
    return this.notes;
  }

  getNoteById(id: number): Note | undefined {
    return this.notes.find(note => note.id === id);
  }

  addNote(note: Note): void {
    this.notes.push(note);
  }

  deleteNoteById(id: number): void {
    this.notes = this.notes.filter(note => note.id !== id);
  }
}