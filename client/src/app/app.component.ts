import { Component, OnInit, Input }   from '@angular/core';
import { FormDataService } from './data/formData.service';
import { ProductService } from './_services/index';
import { vendorAuthService } from './services/vendorauth.service';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Multi-Step Wizard';
    @Input() formData;

    constructor(
      private formDataService: FormDataService,
      private productService: ProductService,
      private vendorAuthService: vendorAuthService
    ) {
      // add some initial products
        if (productService.getAll().length === 0) {
            // productService.save({ name: 'Boardies', price: '25.00' });
            // productService.save({ name: 'Singlet', price: '9.50' });
            // productService.save({ name: 'Thongs (Flip Flops)', price: '12.95' });
            // this.vendorAuthService.getRateCardData()
            //   .subscribe(res => {
            //     console.log('app Component res',res);
            //     if(res[0].data.length > 0){
            //       for (let i = 0; i < res[0].data.length; i++) {
            //           productService.save(res[0].data[i]);
            //       }
            //     }
            //   },err => {
            //     console.log('getRateCardData err',err);
            //   });
        }

    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        console.log(this.title + ' loaded!');
    }
}
