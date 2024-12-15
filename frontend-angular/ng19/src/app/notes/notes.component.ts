import { Component } from '@angular/core';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NotesService } from './notes.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notes',
  imports: [CommonModule, RouterLink],
  providers: [NotesService, HttpClient],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  private notesService: NotesService;
  public notes: any[] = [];
  constructor() {
    this.notesService = inject(NotesService);
  }
  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.notesService.getNotes().subscribe( (data: any) => {
      this.notes = (data && data.records) ? data.records : [];
      console.log('this.notes = ', this.notes);
    });
  }

  deleteNote(key: string) {
    const question = confirm('Are you sure you want to delete this note?');
    if (!question) {
      return;
    }
    this.notesService.delNote(key).subscribe( (data: any) => {
      console.log('!!!!data = ', data);
      if (data && data.status == 1) {
        this.getNotes()
      }
    });
  }
}
