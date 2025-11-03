import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDolce } from './tag-dolce.component';

describe('TagDolce', () => {
  let component: TagDolce;
  let fixture: ComponentFixture<TagDolce>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagDolce]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TagDolce);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
