import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[]=[];
  currentCategoryId: number = 0;
  searchMode:boolean = false;

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    })
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
  }

  handleSearchProducts(){
    const theKeyword: string | null = this.route.snapshot.paramMap.get('keyword');

    this.productService.searchProducts(theKeyword).subscribe(
      (data:any)=>{
        this.products = data;
      }
    )
  }

  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.currentCategoryId = parseInt(this.route.snapshot.paramMap.get('id') || '');
    }
    else{
      this.currentCategoryId = 1;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe((data) => {
      this.products = data;
    });
  }
}
