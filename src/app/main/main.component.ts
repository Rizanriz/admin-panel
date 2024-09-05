import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder, 
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.productForm = this.fb.group({
      imgLink: ['', Validators.required],
      productName: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = {
        title: this.productForm.value.productName,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
        image: this.productForm.value.imgLink
      };

      // Call the DataService to send data to API
      this.dataService.addProductAPI(productData).subscribe({
        next: (response) => {
          alert('Product added successfully!');
          this.productForm.reset();
        },
        error: (error) => {
          alert('Error adding product: ' + error.message);
        }
      });
    } else {
      alert('Please fill out all fields correctly.');
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.subscription.unsubscribe();
  }
}
