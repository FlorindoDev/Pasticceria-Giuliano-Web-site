import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMissingInfo } from './user-missing-info.component';

describe('UserMissingInfo', () => {
  let component: UserMissingInfo;
  let fixture: ComponentFixture<UserMissingInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMissingInfo]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserMissingInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
