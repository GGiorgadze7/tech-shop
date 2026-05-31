import { ComponentFixture, TestBed } from '@angular/core/testing';

import { N8nChat } from './n8n-chat';

describe('N8nChat', () => {
  let component: N8nChat;
  let fixture: ComponentFixture<N8nChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [N8nChat],
    }).compileComponents();

    fixture = TestBed.createComponent(N8nChat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
