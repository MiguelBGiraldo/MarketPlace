import { Injectable } from '@angular/core';
import { ProductoGetDTO } from '../modelo/producto-get-dto';
import { ProductoDTO } from '../modelo/producto-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private productoUrl = "http://localhost:8080/api/productos";


  productos: ProductoGetDTO[];

  constructor(private http: HttpClient) {
    this.productos = [];
  
  }
  public listar(codigoVendedor: number) {

    return this.http.get<MensajeDTO>(`${this.productoUrl}/usuario/${codigoVendedor}`);

  }

  public listarAll(){

    return  this.http.get<MensajeDTO>(`${this.productoUrl}/listar/listar`);
  }

  public obtener(cod: number){
    
    return this.http.get<MensajeDTO>(`${this.productoUrl}/${cod}`);
  }

  public crear(producto: ProductoDTO): Observable<MensajeDTO> {

    return this.http.post<MensajeDTO>(`${this.productoUrl}/registro`, producto);

  }

  public editar(producto: ProductoDTO,codigo : number): Observable<MensajeDTO> {

    return this.http.put<MensajeDTO>(`${this.productoUrl}/${codigo}`, producto);

  }

  public eliminar(codigoVendedor: number) {

    return this.http.delete<MensajeDTO>(`${this.productoUrl}/${codigoVendedor}`);

  }

  public ponerFavorito(codigoUsuario : number, codigoProducto : number){


    return  this.http.get<MensajeDTO>(`${this.productoUrl}/guardarFavorito/${codigoUsuario}/${codigoProducto}`);
  }

  public listarFavoritos(codigoUsuario : number) {

    return this.http.get<MensajeDTO>(`${this.productoUrl}/favoritos/${codigoUsuario}`);
  }

  public eliminarFavorito(codigoProducto: number,codigoUsuario: number){
    
    return this.http.delete<MensajeDTO>(`${this.productoUrl}/eliminarFavorito/${codigoProducto}/${codigoUsuario}`);
  }
}
