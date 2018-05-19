import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ProductService, PubSubService } from '../_services/index';

import { vendorAuthService } from '../services/vendorauth.service';

// import fade in animation
import { fadeInAnimation } from '../_animations/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'product-list.component.html',

    // make fade in animation available to this component
    animations: [fadeInAnimation],

    // attach the fade in animation to the host (root) element of this component
    host: { '[@fadeInAnimation]': '' }
})

export class ProductListComponent implements OnInit, OnDestroy {
    products: any =[];
    subscription: Subscription;

    constructor(
        private productService: ProductService,
        private vendorAuthService: vendorAuthService,
        private pubSubService: PubSubService) { }

    deleteProduct(id: number) {
        this.productService.delete(id);
        this.loadProducts();
    }

    ngOnInit() {
        this.loadProducts();

        // reload products when updated
        this.subscription = this.pubSubService.on('products-updated').subscribe(() => this.loadProducts());
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    private loadProducts() {
      //this.getData();
        this.products = this.productService.getAll();
        console.log('loadProducts1',this.products,' ',this.products.length);
        if(this.products.length == 0){
          this.vendorAuthService.getRateCardData()
            .subscribe(res => {
              console.log('app Component res',res);
              if(res[0].data.length > 0){
                // this.products = res[0].data;
                // for (let i = 0; i < res[0].data.length; i++) {
                //     this.productService.save(res[0].data[i]);
                // }
                localStorage.setItem('products', JSON.stringify(res[0].data));
                this.products = this.productService.getAll();
              }
            },err => {
              console.log('getRateCardData err',err);
            });
        }
        console.log('loadProducts2',this.products);
        if(this.products.length > 0){
        this.vendorAuthService.loadRateCardData(this.products)
        .subscribe(res => {
          console.log('loadRateCardData res',res);
        },err => {
          console.log('loadRateCardData err',err);
        });
      }
    }

    getData(){
    this.vendorAuthService.getRateCardData()
      .subscribe(res => {
        console.log('getRateCardData res',res);
        this.products = res[0].data;
      },err => {
        console.log('getRateCardData err',err);
      });
    }
}
