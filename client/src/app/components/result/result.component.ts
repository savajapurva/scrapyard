import { Component, OnInit, Input }   from '@angular/core';
import { FormData }                   from '../../data/formData.model';
import { FormDataService }            from '../../data/formData.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component ({
    selector:     'mt-wizard-result'
    ,templateUrl: './result.component.html'
})

export class ResultComponent implements OnInit {
    title = 'Thanks for staying tuned!';
    @Input() formData: FormData;
    isFormValid: boolean = false;

    constructor(private orderService: OrderService, private formDataService: FormDataService,private authservice:AuthService) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        this.isFormValid = this.formDataService.isFormValid();
        console.log('Result feature loaded!');
    }

    submit(formData:any) {
        alert('Excellent Job!');

        var date=new Date();

        var userid=this.authservice.user.data._id;
          var mobile=this.authservice.user.data.mobile;
        console.log(this.authservice.user.data);
        let data = {
            name: formData.firstName+' '+formData.lastName,
            email: formData.email,
            work: formData.work,
            address: formData.street+' '+formData.city+' '+formData.state+' '+formData.zip,
            date:date,
            userid:userid,
            mobile:mobile,
            cityzip: formData.city+'-'+formData.zip,
        }

        this.orderService.postReq(data,'orderdata/ordereq')
        .then(res => {
            this.orderService.getReq('orderdata/allOrder');
            console.log('order res',res);
        },err => {
            console.log('order err',err);
        });
       this.formData = this.formDataService.resetFormData();
        // this.isFormValid = false;
    }
}
