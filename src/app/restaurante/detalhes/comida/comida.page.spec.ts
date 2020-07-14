import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComidaPage } from './comida.page';

describe('ComidaPage', () => {
  let component: ComidaPage;
  let fixture: ComponentFixture<ComidaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComidaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
