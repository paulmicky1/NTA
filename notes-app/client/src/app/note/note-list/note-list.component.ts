import { Component, inject, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent implements OnInit {

  protected notes: any;
  private router: Router = inject(Router);

  constructor(private noteService: NoteService) {

  }

  ngOnInit(): void {
    this.noteService.getAllNotes()
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.notes = response;
        }
      })
  }

  deleteNote(id: any) {
    //logic to delete
    this.noteService.deleteNote(id)
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
        complete: () => {
          this.notes = this.notes.filter((note) => note.id !== id);
        }
      })
  }

  editNote(id: any) {
    this.router.navigate([`/edit/${id}`])
  }

}
