import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCoComponent } from './page-co.component';

describe('PageCoComponent', () => {
  let component: PageCoComponent;
  let fixture: ComponentFixture<PageCoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageCoComponent]
    });
    fixture = TestBed.createComponent(PageCoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
