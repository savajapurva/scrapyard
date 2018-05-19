import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

	apiUrl = "http://localhost:8080/"; // Development Domain - Not Needed in Production
		vendorid:any;
  constructor(private http: Http) { }
		getvendorid(xyz){
		this.vendorid=xyz;
		}
  	// get date from database
	getReq(type) {

		return new Promise((resolve, reject) => {

			this.http.get(this.apiUrl+type).subscribe(res => {
				resolve(res.json());
			},err => {
				reject(err.json());
			});
		});
	}

	// post request fro database
	postReq(data,type){

		return new Promise((resolve, reject) => {

			let headers = new Headers();
	        headers.append('Content-Type', 'application/json');
            //headers.append('Referer', 'lcsapp.addwebprojects.com');

			this.http.post(this.apiUrl+type, JSON.stringify(data),{headers: headers})
			.subscribe(res => {
				resolve(res.json());
			},err => {
				reject(err.json());
			});
		});
	}

	// update user data
	putReq(data,type){
		return new Promise((resolve, reject) => {

			let headers = new Headers();
	        headers.append('Content-Type', 'application/json');

	        this.http.put(this.apiUrl+type, JSON.stringify(data),{headers: headers})
	        .subscribe(res => {
				resolve(res.json());
			},err => {
				reject(err.json());
			});
		});
	}

	// delete order services
	deleteReq(data,type){

		return new Promise((resolve, reject) => {

			let headers = new Headers();
					headers.append('Content-Type', 'application/json');
			this.http.post(this.apiUrl+type,data,{headers: headers})
			.subscribe(res => {
				resolve(res.json());
			},err => {
				reject(err.json());
			});
		});
	}


	insertacceptorder(data,type){

		return new Promise((resolve, reject) => {

			let headers = new Headers();
					headers.append('Content-Type', 'application/json');
			this.http.post(this.apiUrl+type,data,{headers: headers})
			.subscribe(res => {
				resolve(res.json());
			},err => {
				reject(err.json());
			});
		});
	}

	getacceptdata(type) {

		return new Promise((resolve, reject) => {

			this.http.get(this.apiUrl+type).subscribe(res => {
				resolve(res.json());
			},err => {
				reject(err.json());
			});
		});
	}

	getuserorder(type) {

		return new Promise((resolve, reject) => {

			this.http.get(this.apiUrl+type).subscribe(res => {
				resolve(res.json());
			},err => {
				reject(err.json());
			});
		});
	}


}
