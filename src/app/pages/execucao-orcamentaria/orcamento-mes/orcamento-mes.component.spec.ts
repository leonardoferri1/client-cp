import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoMesComponent } from './orcamento-mes.component';

describe('OrcamentoMesComponent', () => {
  let component: OrcamentoMesComponent;
  let fixture: ComponentFixture<OrcamentoMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcamentoMesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcamentoMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
