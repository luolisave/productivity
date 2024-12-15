import { Component } from '@angular/core';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NotesService } from '../notes.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note',
  imports: [CommonModule, FormsModule ], // , RouterLink
  providers: [NotesService, HttpClient],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {
  private notesService: NotesService;
  private route: ActivatedRoute;
  public key: string;
  public note: any = {};
  constructor() {
    this.notesService = inject(NotesService);
    this.route = inject(ActivatedRoute);
    this.key = this.route.snapshot.paramMap.get('key') || '';
    console.log('key = ', this.key);
  }

  ngOnInit(): void {
    this.notesService.getNote(this.key).subscribe( (data: any) => {
      this.note = (data && data.record) ? data.record : '';
      // this.notes = (data && data.records) ? data.records : [];
      console.log('this.note = ', this.note);
    });
  }

  save(): void {
    this.notesService.saveNote(this.key, this.note).subscribe( (data: any) => {
      console.log('data = ', data);
      if (data && data.record) {
        alert('Note saved successfully!');
      }
    });
  }

}
