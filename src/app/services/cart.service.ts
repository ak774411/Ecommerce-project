import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();

  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){
    console.log("t1");
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if(this.cartItems.length>0){

      existingCartItem = this.cartItems.find((item)=>{item.id===theCartItem.id});
      alreadyExistsInCart = (existingCartItem!=undefined);
    }
    if(alreadyExistsInCart){
      existingCartItem && existingCartItem.quantity++
    }
    else{
      console.log("t2");
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotal();
  }

  computeCartTotal(){

    console.log(this.cartItems);
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * (currentCartItem.unitPrice||0)
      totalQuantityValue += currentCartItem.quantity;
    }
    console.log(totalPriceValue+ '  '+ totalQuantityValue);
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
