import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoIncripcionesComponent } from './listado-incripciones.component';

describe('ListadoIncripcionesComponent', () => {
  let component: ListadoIncripcionesComponent;
  let fixture: ComponentFixture<ListadoIncripcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoIncripcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoIncripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
