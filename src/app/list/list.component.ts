import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  products: any = [];

  constructor(private api: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  // Fetch all products
  fetchProducts() {
    this.api.getAllProductsAPI().subscribe((result: any) => {
      this.products = result;
    });
  }

  // Delete a product by ID
  deleteProduct(id: number) {
    this.api.DeleteProductsAPI(id).subscribe(() => {
      alert("Product deleted successfully!");
      this.fetchProducts(); // Refresh the product list after deletion
    });
  }


}


