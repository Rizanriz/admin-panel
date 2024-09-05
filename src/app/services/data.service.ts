import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  serverURL = "http://localhost:3000"

  getAllProductsAPI() {
    return this.http.get(`${this.serverURL}/all-products`)
  }
  DeleteProductsAPI(id:number) {
    return this.http.delete(`${this.serverURL}/${id}/delete`)
  }
  addProductAPI(product:any){
    return this.http.post(`${this.serverURL}/newproduct`,product)
  }
}
