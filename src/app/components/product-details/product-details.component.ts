import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    this.product = new Product();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
    const theProductId: number = parseInt(
      this.route.snapshot.paramMap.get('id') || ''
    );
    this.productService.getProduct(theProductId).subscribe((data: any) => {
      this.product = data;
    });
  }

  addToCart() {
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }
}
