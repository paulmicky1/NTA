import { Routes } from '@angular/router';
import { NoteListComponent } from './note/note-list/note-list.component';

import { CreateNoteComponent } from './note/create-note/create-note.component';
import { EditComponent } from './note/edit/edit.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'note',
        pathMatch: 'full'
    },
  
    
    {
        path: 'note',
        component: NoteListComponent,
        // canActivate: [authGuard]
    }
    ,
    {
        path: 'create-note',
        component: CreateNoteComponent,
        // canActivate: [authGuard]
    },
    {
        path: 'edit/:id',
        component: EditComponent,
        // canActivate: [authGuard]
    }
];

