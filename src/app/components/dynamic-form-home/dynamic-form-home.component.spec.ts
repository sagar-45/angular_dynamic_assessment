import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormHomeComponent } from './dynamic-form-home.component';

describe('DynamicFormHomeComponent', () => {
  let component: DynamicFormHomeComponent;
  let fixture: ComponentFixture<DynamicFormHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
