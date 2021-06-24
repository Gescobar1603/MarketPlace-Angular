import { HttpHandler } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriasService } from '../services/categorias.service';


describe('CategoriasService', () => {

  let _httpHandler: HttpHandler;
  let service: CategoriasService;

  beforeEach(() => { (1)
    service =  new CategoriasService(new HttpClient(_httpHandler));
  });

  afterEach(() => {
    service = null;
  });

  it('returns class not null and has any value inside', () => {
    expect(service.getDataCategoria()).toBeTrue();
  });

});
