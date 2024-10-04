import { type ComponentFixture, TestBed } from '@angular/core/testing'

import { FiltroExecucaoOrcamentariaComponent } from './filtro-execucao-orcamentaria.component'

describe('FiltroExecucaoOrcamentariaComponent', () => {
  let component: FiltroExecucaoOrcamentariaComponent
  let fixture: ComponentFixture<FiltroExecucaoOrcamentariaComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroExecucaoOrcamentariaComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FiltroExecucaoOrcamentariaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
