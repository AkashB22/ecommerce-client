import { Component, OnInit } from '@angular/core';
import {Input} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {ProductService} from './../../../services/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Input() addProduct: Boolean;
  createProductForm : FormGroup;
  imagesUrl: Array<any> = [];
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
    'images': [
      {type: 'required', message: 'images is required.'},
      {type: 'minlength', message: 'images should be minimum of 6 character.'},
      {type: 'maxlength', message: 'images could be maximum of 255 character.'},
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

  constructor(private fb : FormBuilder, private productService: ProductService) { 
    this.createProductForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
      images: [null, [Validators.required,  Validators.minLength(2), Validators.maxLength(5)]],
      description: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
      availableQuantity: new FormControl(0, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)]),
      price: new FormControl(0, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)]),
      category: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
      seller: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
      isTrending: new FormControl('', [Validators.required]),
      isDiscounted: new FormControl('', [Validators.required]),
      discountPercent: new FormControl(''),
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

    this.productService.ProductsUploadListener.subscribe(
      (data)=> console.log(data)
    )
  }

  ngOnInit() {
  }

  onIsDiscountChange(e){
    let isDiscounted = this.createProductForm.get('isDiscounted').value;

    if(isDiscounted === 'yes'){
      this.createProductForm.get('discountPercent').setValidators([Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)]);  
    }
  }
  
  onChange(event){
    if(event.target.files && event.target.files.length){
      const files = event.target.files;
      const images = [];
      this.imagesUrl = [];

      for(let i=0; i<files.length; i++){
        images.push(files[i]);
        this.createProductForm.patchValue({
          images: images
        })
        let reader = new FileReader();

        reader.onload = ()=>{
          this.imagesUrl.push(reader.result as string);
        }
        reader.readAsDataURL(files[i])
      }
    }
  }

  onSubmit(){
    let formValue = this.createProductForm.value;
    console.log(formValue);
    // this.createProductForm.reset();
    let formData = new FormData();
    for(let key of Object.keys(formValue)){
      if(key === 'images'){
        for(let i=0; i< formValue[key].length; i++){
          formData.append("images[]", formValue[key][i]);
        }
      } else{
        formData.append(key, formValue[key]);
      }
    }

    // for(let i=0; i<this.images.length; i++){
    //   formData.append("images[]", this.images[i]);
    // }
    this.productService.uploadProduct(formData);
  }
}
