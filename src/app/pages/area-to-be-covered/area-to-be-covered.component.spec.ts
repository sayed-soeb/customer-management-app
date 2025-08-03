import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaToBeCoveredComponent } from './area-to-be-covered.component';

describe('AreaToBeCoveredComponent', () => {
  let component: AreaToBeCoveredComponent;
  let fixture: ComponentFixture<AreaToBeCoveredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaToBeCoveredComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaToBeCoveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
