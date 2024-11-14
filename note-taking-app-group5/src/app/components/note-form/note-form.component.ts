import { Component } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent {
  title = '';
  content = '';

  constructor(private noteService: NoteService) {}

  addNote(): void {
    const newNote = new Note(Date.now(), this.title, this.content);
    this.noteService.addNote(newNote);
    this.title = '';
    this.content = '';
  }
}