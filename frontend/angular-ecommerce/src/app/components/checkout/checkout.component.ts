import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardMonths: number[];
  creditCardYears: number[];
  
  shippingAddressStateList:State[];
  billingAddressStateList:State[];

  countries: Country[]= [];

  constructor(private formBuilder: FormBuilder,
    private luv2ShopFormService: Luv2ShopFormService,
    private cartService:CartService) { }

  ngOnInit(): void {

     this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', 
                              [Validators.required, 
                               Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace
                               ]),

        lastName:  new FormControl('', 
                              [Validators.required, 
                               Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace
                             ]),
                               
        email: new FormControl('',
                              [Validators.required, 
                                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
                                Luv2ShopValidators.notOnlyWhitespace])
      }),

      // shippingAddress: this.formBuilder.group({
      //   street: [''],
      //   city: [''],
      //   state: [''],
      //   country: [''],
      //   zipCode: ['']
      shippingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required, 
                                  Validators.minLength(2), 
                                   Luv2ShopValidators.notOnlyWhitespace]),
        street: new FormControl('', [Validators.required, 
                                    Validators.minLength(2), 
                                     Luv2ShopValidators.notOnlyWhitespace]),
        zipCode: new FormControl('', [Validators.required, 
                                      Validators.minLength(2), 
                                      Luv2ShopValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required, 
                                  Validators.minLength(2), 
                                   Luv2ShopValidators.notOnlyWhitespace]),
        street: new FormControl('', [Validators.required, 
                                    Validators.minLength(2), 
                                     Luv2ShopValidators.notOnlyWhitespace]),
        zipCode: new FormControl('', [Validators.required, 
                                      Validators.minLength(2), 
                                      Luv2ShopValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
      
        cardType: new FormControl('', [Validators.required]),
        nameOnCard:  new FormControl('', [Validators.required, Validators.minLength(2), 
                                          Luv2ShopValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']
    
      })
    });


  // populate credit card months

  const startMonth: number = new Date().getMonth() + 1;
  console.log("startMonth: " + startMonth);

  this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
    data => {
      console.log("Retrieved credit card months: " + JSON.stringify(data));
      this.creditCardMonths = data;
    }
  );

  // populate credit card years

  this.luv2ShopFormService.getCreditCardYears().subscribe(
    data => {
      console.log("Retrieved credit card years: " + JSON.stringify(data));
      this.creditCardYears = data;
    } 
  );

  this.getCountryList()

  
}
 

reviewCartDetails(){

  // subscribe to cartService.totalQuantity
  this.cartService.totalQuantity.subscribe(
    totalQuantity => this.totalQuantity = totalQuantity
  );

  // subscribe to cartService.totalPrice
  this.cartService.totalPrice.subscribe(
    totalPrice => this.totalPrice = totalPrice
  );

}

handleMonthsAndYears() {

  const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

  const currentYear: number = new Date().getFullYear();
  const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

  // if the current year equals the selected year, then start with the current month

  let startMonth: number;

  if (currentYear === selectedYear) {
    startMonth = new Date().getMonth() + 1;
  }
  else {
    startMonth = 1;
  }

  this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
    data => {
      console.log("Retrieved credit card months: " + JSON.stringify(data));
      this.creditCardMonths = data;
    }
  );
}


  getCountryList() {
    this.luv2ShopFormService.getCountryList().subscribe(
      data => {
        // console.log('country list=' + JSON.stringify(data));
        this.countries = data;
      }
    );
  }

  getStateList(formGroupName:string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;
    
    console.log(`selected country = ${countryName}`);
    // console.log(`selected country = ${formGroup.value.country}`);
    // console.log(`selected country = ${formGroup.get('country')}`);
   
    this.luv2ShopFormService.getStateList(countryCode).subscribe(
      data => {
        // console.log('state list=' + JSON.stringify(data));
        if (formGroupName === 'shippingAddress'){
          this.shippingAddressStateList = data;
        }
        else{
          this.billingAddressStateList = data;
        }

      }
    );
  }

  
  copyShippingAddressToBillingAddress(event) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
            .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
            this.billingAddressStateList = this.shippingAddressStateList;
            // console.log(this.checkoutFormGroup.get('shippingAddress').value);
            // console.log(this.checkoutFormGroup.controls.shippingAddress.value);
            // get('shippingAddress') = controls.shippingAddress

    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressStateList = [];
    }
    
  }
  

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
  }

}
