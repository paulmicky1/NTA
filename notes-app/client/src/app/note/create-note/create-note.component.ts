import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../note.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.css'
})
export class CreateNoteComponent {

  private noteService: NoteService = inject(NoteService);
  private router: Router = inject(Router);

  noteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form
    this.noteForm = this.fb.group({
      title: ['', Validators.required], // Title is required
      content: ['', Validators.required], // Content is required
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.noteForm.valid) {
      const noteData = this.noteForm.value;
      console.log('Note Created:', noteData);

      this.noteService.createNote(noteData)
        .subscribe({
          next: (response: any) => {
            console.log(response);
          },
          error: (error: HttpErrorResponse) => {
            console.log("error");
          },
          complete: () => {
            this.router.navigate(['/note'])
          }
        })

      // Reset the form
      this.noteForm.reset();
    }
  }

}
