import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css'],
})
export class CartStatusComponent implements OnInit {
  totalPrice: number = 0.0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {
    console.log('t4');
    this.cartService.totalPrice.subscribe((data: any) => {
      console.log('t5'+' '+data);
      this.totalPrice = data;
    });

    this.cartService.totalQuantity.subscribe((data: any) => {
      this.totalQuantity = data;
    });
  }
}
