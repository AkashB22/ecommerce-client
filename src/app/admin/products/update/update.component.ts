import { Component, OnInit } from '@angular/core';
import {Input, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {ProductService} from './../../../services/product.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  productId : string;
  product: {};
  productError: string;
  @ViewChild('images', {static: false}) imagesDom : ElementRef;
  createProductForm : FormGroup;
  imagesUrl: Array<any> = [];
  images: Array<any> = [];
  ImagesErrorMessage : string = '';
  imageCheck: boolean = false;
  isServerError: boolean = false;
  serverMessage: string;
  productErrorSubscription: Subscription;
  productSuccessSubscription: Subscription;
  closeResult = '';
  imageNames = [];

  errors_message = {
    'email' : [
      {type:'email', message: 'Not a valid emal.'},
      {type: 'required', message: 'email is required.'},
      {type: 'minlength', message: 'email should be minimum of 6 character.'},
      {type: 'maxlength', message: 'email could be maximum of 255 character.'},
    ],
    'password' : [
      {type: 'required', message: 'password is required.'},
      {type: 'minlength', message: 'password must be minimum of 6 characters.'},
      {type: 'maxlength', message: 'password could be a maximum of 30 characters.'}
    ],
    'name': [
      {type: 'required', message: 'name is required.'},
      {type: 'minlength', message: 'name should be minimum of 6 character.'},
      {type: 'maxlength', message: 'name could be maximum of 255 character.'},
    ],
    'description': [
      {type: 'required', message: 'name is required.'},
      {type: 'minlength', message: 'name should be minimum of 6 character.'},
      {type: 'maxlength', message: 'name could be maximum of 255 character.'},
    ],
    'availableQuantity': [
      {type: 'required', message: 'availableQuantity is required.'},
      {type: 'min', message: 'availableQuantity should be minimum of 1 character.'},
      {type: 'pattern', message: 'availableQuantity should be a valid number.'},
    ],
    'price': [
      {type: 'required', message: 'price is required.'},
      {type: 'min', message: 'price should be minimum of 1 character.'},
      {type: 'pattern', message: 'price should be a valid number.'},
    ],
    'category': [
      {type: 'required', message: 'category is required.'},
      {type: 'minlength', message: 'category should be minimum of 6 character.'},
      {type: 'maxlength', message: 'category could be maximum of 255 character.'},
    ],
    'seller': [
      {type: 'required', message: 'seller is required.'},
      {type: 'minlength', message: 'seller should be minimum of 6 character.'},
      {type: 'maxlength', message: 'seller could be maximum of 255 character.'},
    ],
    'isTrending': [
      {type: 'required', message: 'isTrending is required.'}
    ],
    'isDiscounted': [
      {type: 'required', message: 'isDiscounted is required.'}
    ],
    'discountPercent': [
      {type: 'required', message: 'availableQuantity is required.'},
      {type: 'min', message: 'availableQuantity should be minimum of 1 character.'},
      {type: 'pattern', message: 'availableQuantity should be a valid number.'},
    ],
    'offers': [
      {type: 'required', message: 'offers is required.'},
      {type: 'minlength', message: 'offers should be minimum of 6 character.'},
      {type: 'maxlength', message: 'offers could be maximum of 255 character.'},
    ],
    'sizes': [
      {type: 'required', message: 'sizes is required.'},
      {type: 'minlength', message: 'sizes should be minimum of 6 character.'},
      {type: 'maxlength', message: 'sizes could be maximum of 255 character.'},
    ],
    'colors': [
      {type: 'required', message: 'colors is required.'},
      {type: 'minlength', message: 'colors should be minimum of 6 character.'},
      {type: 'maxlength', message: 'colors could be maximum of 255 character.'},
    ],
    'averageRating': [
      {type: 'required', message: 'availableQuantity is required.'},
      {type: 'min', message: 'availableQuantity should be minimum of 1 character.'},
      {type: 'pattern', message: 'availableQuantity should be a valid number.'},
    ] 
  };

  get offers(){
    return this.createProductForm.get('offers') as FormArray;
  }

  addOffers(){
    this.offers.push(this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]));
  }

  deleteOffers(index){
    this.offers.removeAt(index);
  }

  get sizes(){
    return this.createProductForm.get('sizes') as FormArray;
  }
  
  addSizes(){
    this.sizes.push(this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]));
  }

  deleteSizes(index){
    this.sizes.removeAt(index);
  }

  get colors(){
    return this.createProductForm.get('colors') as FormArray;
  }

  addColors(){
    this.colors.push(this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]));
  }

  deleteColors(index){
    this.colors.removeAt(index);
  }

  constructor(private route : ActivatedRoute, private productService : ProductService, private fb : FormBuilder, private router : Router, private modalService: NgbModal) { 
    this.route.params.subscribe(
      (data)=>{
        // console.log(data);
        this.productId = data.id;
      }
    )
    this.createProductForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
      description: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
      availableQuantity: new FormControl(0, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)]),
      price: new FormControl(0, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)]),
      category: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
      seller: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
      isTrending: new FormControl('', [Validators.required]),
      isDiscounted: new FormControl('', [Validators.required]),
      discountPercent: new FormControl(0),
      offers: this.fb.array([
        this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)])
      ]),
      sizes: this.fb.array([
        this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)])
      ]),
      colors: this.fb.array([
        this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)])
      ]),
      averageRating: new FormControl(0, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)])  
    });
  }

  ngOnInit() {
    this.productService.getProductById(this.productId).subscribe(
      response=>{
        this.product = response["product"];
        // console.log(this.product);
        this.product["isDiscounted"] = (this.product["isDiscounted"]) ? 'yes' : 'no';
        this.product["isTrending"] = (this.product["isTrending"]) ? 'yes' : 'no';
        this.createProductForm.patchValue(this.product);

        this.imageNames = this.product["imagePath"];

        this.imagesUrl = response["imageBase64Path"];
        this.images = this.imagesUrl;
        this.imageCheck = this.imagesUrl.length < 5 || this.imagesUrl.length > 2 ? true : false;
      }, 
      error=>{
        this.productError = error.message;
      }
    )

    this.productService.getUpdatedStatus().subscribe(
      data=>{
        this.isServerError = false;
        this.serverMessage = "Product has been Updated created";
      }
    )
  }

  onIsDiscountChange(e){
    let isDiscounted = this.createProductForm.get('isDiscounted').value;

    if(isDiscounted === 'yes'){
      this.createProductForm.get('discountPercent').setValidators([Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)]);  
    }
  }
  
  onChange(event){
    if(event.target.files && event.target.files.length){
      const files = event.target.files,
        maxImages = 5,
        minImages = 2;
      this.imagesUrl = [];
      this.images = [];

      if(event.target.files.length > maxImages || event.target.files.length < minImages){
        this.ImagesErrorMessage = "images must be less 5 images and greater than 2 images";
        this.imageCheck = false;
      } else{
        this.ImagesErrorMessage = '';
        this.imageCheck = true;
        for(let i=0; i<files.length; i++){
          this.images.push(files[i])
          let reader = new FileReader();
  
          reader.onload = ()=>{
            this.imagesUrl.push(reader.result as string);
          }
          reader.readAsDataURL(files[i])
        }
      }
    } else{
      this.imagesUrl = [];
      this.images = [];
    }
  }

  onSubmit(){
    let formValue = this.createProductForm.value;
    // console.log(formValue);
    // this.createProductForm.reset();
    formValue.isDiscounted = formValue.isDiscounted === "yes" ? true : false;
    formValue.isTrending = formValue.isTrending === "yes" ? true : false;
    // formValue.discountPercent = formValue.discountPercent === "null" ? null : formValue.discountPercent
    
    let formData = new FormData();
    for(let key of Object.keys(formValue)){
      formData.append(key, formValue[key]);
    }

    for(let i=0; i<this.images.length; i++){
      formData.append("images[]", this.images[i]);
    }
    formData.append("imagePath", JSON.stringify(this.imageNames));
    this.productService.updateProduct(this.productId, formData)
      
    // this.createProductForm.reset();
    // this.imagesDom.nativeElement.value = "";
    // this.images = [];
    // this.imagesUrl = [];
    window.scroll(0,0);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result === 'yes'){
        this.deleteProduct();
      } else{
        // console.log('Deleting product has been cancelled');
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  deleteProduct(){
    // console.log('send api call to delete the product');
    this.productService.deleteProduct(this.productId);
    this.router.navigateByUrl("/admin/products");
  }
}
