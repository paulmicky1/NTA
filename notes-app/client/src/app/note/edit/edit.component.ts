import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../note.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  editNoteForm: FormGroup;
  noteId: string = ''; // To store the ID from the route

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService
  ) {
    // Initialize the form
    this.editNoteForm = this.fb.group({
      title: ['', Validators.required], // Title is required
      content: ['', Validators.required], // Content is required
    });
  }

  ngOnInit(): void {
    // Get the note ID from the route
    this.noteId = this.route.snapshot.paramMap.get('id') || '';

    // Fetch the note data from the backend
    this.noteService.getNoteById(this.noteId).subscribe((note) => {
      this.editNoteForm.patchValue({
        title: note.title,
        content: note.content,
      });
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.editNoteForm.valid) {
      const updatedNote = this.editNoteForm.value;

      // Save the updated note
      this.noteService.updateNote(this.noteId, updatedNote)
        .subscribe(() => {
          console.log('Note updated successfully');
          this.router.navigate(['/note']);
        });
    }
  }
}