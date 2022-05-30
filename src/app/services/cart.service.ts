import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject, BehaviorSubject } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);

  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  storage: Storage = sessionStorage;

  constructor() {
    let data = JSON.parse(this.storage.getItem('cartItems') || JSON.stringify({}));
    console.log('fuck');
    console.log(data.length);
    if(data.length >0){
      this.cartItems = data;
      this.computeCartTotal;

    }
   }

  addToCart(theCartItem: CartItem){
    console.log("t1");
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if(this.cartItems.length>0){

      existingCartItem = this.cartItems.find((item)=>{return item.id===theCartItem.id});
      console.log('t8');
      console.log(existingCartItem);
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

  persistCartItems(){
    this.storage.setItem('cartItems',JSON.stringify(this.cartItems));
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

    this.persistCartItems();
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if(theCartItem.quantity === 0){
      this.remove(theCartItem);
    }else{
      this.computeCartTotal();
    }
  }
  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);

    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotal();
    }
  }
}
