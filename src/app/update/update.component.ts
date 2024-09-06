import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService, Product } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      imgLink: ['', Validators.required],
      productName: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;

    this.dataService.viewProductAPI(productId).subscribe(
      (product: Product) => {
        this.productForm.patchValue({
          imgLink: product.image,
          productName: product.title,
          price: product.price,
          description: product.description
        });
      },
      error => {
        console.error('Error fetching product details', error);
      }
    );
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const updatedProduct: Product = {
        id: +this.route.snapshot.paramMap.get('id')!,
        ...this.productForm.value
      };

      this.dataService.updateProductAPI(updatedProduct.id, updatedProduct).subscribe(
        response => {
          console.log('Product updated successfully', response);
          this.router.navigate(['/list']);
        },
        error => {
          console.error('Error updating product', error);
        }
      );
    }
  }
}
