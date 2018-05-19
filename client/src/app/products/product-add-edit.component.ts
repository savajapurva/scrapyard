import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService, PubSubService } from '../_services/index';

import { vendorAuthService } from '../services/vendorauth.service';

// import slide in/out animation
import { slideInOutAnimation } from '../_animations/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'product-add-edit.component.html',

    // make slide in/out animation available to this component
    animations: [slideInOutAnimation],

    // attach the slide in/out animation to the host (root) element of this component
    host: { '[@slideInOutAnimation]': '' }
})

export class ProductAddEditComponent implements OnInit {

    PicturePath;
    filesToUpload: Array<File> = [];
    title = 'Add Product';
    product: any = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private vendorAuthService: vendorAuthService,
        private productService: ProductService,
        private pubSubService: PubSubService) { }

    ngOnInit() {
        let productId = Number(this.route.snapshot.params['id']);
        if (productId) {
            this.title = 'Edit Product';
            this.product = this.productService.getById(productId);
        }
    }
//Open Dialog Box and save the name of the file-
//-------------------------------------------
    openFileBrowser(event:any){
      event.preventDefault();

      let element: HTMLElement = document.getElementById('uploadpicture') as HTMLElement;
      element.click();
    }

    onFileChange(event:any){
      //let files= event.target.files;
      this.filesToUpload = <Array<File>>event.target.files;
      this.PicturePath = event.target.files[0]['name'];
      console.log('this.PicturePath',this.PicturePath)
      console.log(this.filesToUpload);
    }
//---------------------------------------
    saveProduct(product) {
      this.product.picture = this.PicturePath;
      console.log('saveProduct',this.product);
        // save product
        this.productService.save(this.product);

        const formData: any = new FormData();
        const files: Array<File> = this.filesToUpload;

        formData.append("uploads[]", files[0], files[0]['name']);

        this.vendorAuthService.uploadImage(formData)
        .subscribe(res => {
          console.log('uploadImage res',res);
        },err => {
          console.log('uploadImage err',err);
        })

        // redirect to users view
        this.router.navigate(['products']);

        // publish event so list controller can refresh
        this.pubSubService.publish('products-updated');
    }
}
