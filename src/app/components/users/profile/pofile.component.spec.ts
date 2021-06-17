import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PofileComponent } from './pofile.component';

describe('PofileComponent', () => {
  let component: PofileComponent;
  let fixture: ComponentFixture<PofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
