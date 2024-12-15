import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';
import { NotesPlusComponent } from './notes-plus/notes-plus.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { SettingsComponent } from './settings/settings.component';
import { NoteComponent } from './notes/note/note.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'notes',
    component: NotesComponent,
    title: 'Notes page - should view list of titles here',
  },
  {
    path: 'note/:key',
    component: NoteComponent,
    title: 'Note page - should view/edit a single note here',
  },
  {
    path: 'notes-plus',
    component: NotesPlusComponent,
    title: 'Notes Plus page',
  },
  {
    path: 'bookmarks',
    component: BookmarksComponent,
    title: 'Bookmarks page',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: 'Settings page',
  }
];
