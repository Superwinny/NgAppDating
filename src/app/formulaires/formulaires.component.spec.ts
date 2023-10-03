import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulairesComponent } from './formulaires.component';

describe('FormulairesComponent', () => {
  let component: FormulairesComponent;
  let fixture: ComponentFixture<FormulairesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormulairesComponent]
    });
    fixture = TestBed.createComponent(FormulairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
