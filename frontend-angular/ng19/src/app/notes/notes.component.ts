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
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.notesService.getNotes().subscribe( (data: any) => {
      this.notes = (data && data.records) ? data.records : [];
      console.log('this.notes = ', this.notes);
    });
  }
}
