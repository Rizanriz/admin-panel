import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  serverURL = "http://localhost:3000"

  getAllProductsAPI() {
    return this.http.get(`${this.serverURL}/all-products`);
  }

  DeleteProductsAPI(id: number) {
    return this.http.delete(`${this.serverURL}/${id}/delete`);
  }

  addProductAPI(product: any) {
    return this.http.post(`${this.serverURL}/newproduct`, product);
  }

  viewProductAPI(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.serverURL}/${id}/viewproduct`); 
  }

  updateProductAPI(id: number, product: Product) {
    return this.http.put(`${this.serverURL}/${id}/update`, product);
  }
}
