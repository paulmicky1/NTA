
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  notes: any[] = [];
  newNoteContent: string = '';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.loadNotes();
  }

  loadNotes() {
    this.http.get('/api/notes').subscribe((data: any) => (this.notes = data));
  }

  addNote() {
    if (this.newNoteContent.trim()) {
      this.http
        .post('/api/notes', { content: this.newNoteContent })
        .subscribe(() => {
          this.loadNotes();
          this.newNoteContent = '';
        });
    }
  }

  deleteNote(id: number) {
    this.http.delete(`/api/notes/${id}`).subscribe(() => this.loadNotes());
  }

  parseMarkdown(content: string) {
    return this.sanitizer.bypassSecurityTrustHtml(marked(content));
  }
}
