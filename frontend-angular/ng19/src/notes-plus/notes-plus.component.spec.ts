import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesPlusComponent } from './notes-plus.component';

describe('NotesPlusComponent', () => {
  let component: NotesPlusComponent;
  let fixture: ComponentFixture<NotesPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesPlusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
