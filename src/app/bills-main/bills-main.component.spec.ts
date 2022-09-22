import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsMainComponent } from './bills-main.component';

describe('BillsMainComponent', () => {
  let component: BillsMainComponent;
  let fixture: ComponentFixture<BillsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
