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

  get offers(){
    return this.createProductForm.get('offers') as FormArray;
  }

  addOffers(){
    this.offers.push(this.fb.control(''));
  }

  deleteOffers(index){
    this.offers.removeAt(index);
  }

  get sizes(){
    return this.createProductForm.get('sizes') as FormArray;
  }
  
  addSizes(){
    this.sizes.push(this.fb.control(''));
  }

  deleteSizes(index){
    this.sizes.removeAt(index);
  }

  get colors(){
    return this.createProductForm.get('colors') as FormArray;
  }

  addColors(){
    this.colors.push(this.fb.control(''));
  }

  deleteColors(index){
    this.colors.removeAt(index);
  }

  constructor(private fb : FormBuilder, private productService: ProductService) { 
    this.createProductForm = this.fb.group({
      name: new FormControl(''),
      images: [null],
      description: new FormControl(''),
      availableQuantity: new FormControl(0),
      price: new FormControl(0),
      category: new FormControl(''),
      seller: new FormControl(''),
      isTrending: new FormControl(''),
      isDiscounted: new FormControl(''),
      discountPercent: new FormControl(''),
      offers: this.fb.array([
        this.fb.control('')
      ]),
      sizes: this.fb.array([
        this.fb.control('')
      ]),
      colors: this.fb.array([
        this.fb.control('')
      ]),
      averageRating: new FormControl(0)  
    });

    this.productService.ProductsUploadListener.subscribe(
      (data)=> console.log(data)
    )
  }

  ngOnInit() {
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
