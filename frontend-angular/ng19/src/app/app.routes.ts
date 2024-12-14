import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';
import { NotesPlusComponent } from './notes-plus/notes-plus.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { SettingsComponent } from './settings/settings.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'notes',
    component: NotesComponent,
    title: 'Notes page',
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
