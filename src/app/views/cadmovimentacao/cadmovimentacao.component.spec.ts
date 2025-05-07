import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadmovimentacaoComponent } from './cadmovimentacao.component';

describe('CadmovimentacaoComponent', () => {
  let component: CadmovimentacaoComponent;
  let fixture: ComponentFixture<CadmovimentacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadmovimentacaoComponent]
    });
    fixture = TestBed.createComponent(CadmovimentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
