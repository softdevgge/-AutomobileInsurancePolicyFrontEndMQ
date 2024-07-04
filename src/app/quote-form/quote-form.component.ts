import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginInfo } from '../login-info';
@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css']
})
export class QuoteFormComponent {

  quoteResult: number | null = null;
  errorMessage: string | null = null;
  loggedInfo? : LoginInfo;

  quoteForm = this.fb.group({
    
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],    
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],    
    brand: [null, Validators.required],
    anio: [null, Validators.required],
    plan: [null, Validators.required],
  });

  hasUnitNumber = false;

  states = [
    {name: 'Alabama', abbreviation: 'AL'},
    {name: 'Alaska', abbreviation: 'AK'},
    {name: 'American Samoa', abbreviation: 'AS'},
    {name: 'Arizona', abbreviation: 'AZ'},
    {name: 'Arkansas', abbreviation: 'AR'},
    {name: 'California', abbreviation: 'CA'},
    {name: 'Colorado', abbreviation: 'CO'},
    {name: 'Connecticut', abbreviation: 'CT'},
    {name: 'Delaware', abbreviation: 'DE'},
    {name: 'District Of Columbia', abbreviation: 'DC'},
    {name: 'Federated States Of Micronesia', abbreviation: 'FM'},
    {name: 'Florida', abbreviation: 'FL'},
    {name: 'Georgia', abbreviation: 'GA'},
    {name: 'Guam', abbreviation: 'GU'},
    {name: 'Hawaii', abbreviation: 'HI'},
    {name: 'Idaho', abbreviation: 'ID'},
    {name: 'Illinois', abbreviation: 'IL'},
    {name: 'Indiana', abbreviation: 'IN'},
    {name: 'Iowa', abbreviation: 'IA'},
    {name: 'Kansas', abbreviation: 'KS'},
    {name: 'Kentucky', abbreviation: 'KY'},
    {name: 'Louisiana', abbreviation: 'LA'},
    {name: 'Maine', abbreviation: 'ME'},
    {name: 'Marshall Islands', abbreviation: 'MH'},
    {name: 'Maryland', abbreviation: 'MD'},
    {name: 'Massachusetts', abbreviation: 'MA'},
    {name: 'Michigan', abbreviation: 'MI'},
    {name: 'Minnesota', abbreviation: 'MN'},
    {name: 'Mississippi', abbreviation: 'MS'},
    {name: 'Missouri', abbreviation: 'MO'},
    {name: 'Montana', abbreviation: 'MT'},
    {name: 'Nebraska', abbreviation: 'NE'},
    {name: 'Nevada', abbreviation: 'NV'},
    {name: 'New Hampshire', abbreviation: 'NH'},
    {name: 'New Jersey', abbreviation: 'NJ'},
    {name: 'New Mexico', abbreviation: 'NM'},
    {name: 'New York', abbreviation: 'NY'},
    {name: 'North Carolina', abbreviation: 'NC'},
    {name: 'North Dakota', abbreviation: 'ND'},
    {name: 'Northern Mariana Islands', abbreviation: 'MP'},
    {name: 'Ohio', abbreviation: 'OH'},
    {name: 'Oklahoma', abbreviation: 'OK'},
    {name: 'Oregon', abbreviation: 'OR'},
    {name: 'Palau', abbreviation: 'PW'},
    {name: 'Pennsylvania', abbreviation: 'PA'},
    {name: 'Puerto Rico', abbreviation: 'PR'},
    {name: 'Rhode Island', abbreviation: 'RI'},
    {name: 'South Carolina', abbreviation: 'SC'},
    {name: 'South Dakota', abbreviation: 'SD'},
    {name: 'Tennessee', abbreviation: 'TN'},
    {name: 'Texas', abbreviation: 'TX'},
    {name: 'Utah', abbreviation: 'UT'},
    {name: 'Vermont', abbreviation: 'VT'},
    {name: 'Virgin Islands', abbreviation: 'VI'},
    {name: 'Virginia', abbreviation: 'VA'},
    {name: 'Washington', abbreviation: 'WA'},
    {name: 'West Virginia', abbreviation: 'WV'},
    {name: 'Wisconsin', abbreviation: 'WI'},
    {name: 'Wyoming', abbreviation: 'WY'}
  ];

  anios = [
    {name: '2024', abbreviation: '2024'},
    {name: '2023', abbreviation: '2023'},
    {name: '2022', abbreviation: '2022'},
    {name: '2021', abbreviation: '2021'},
    {name: '2020', abbreviation: '2020'},
    {name: '2019', abbreviation: '2019'},
    {name: '2018', abbreviation: '2018'},
    {name: '2017', abbreviation: '2017'},
    {name: '2016', abbreviation: '2016'},
    {name: '2015', abbreviation: '2015'},
    {name: '2014', abbreviation: '2014'},
    {name: '2013', abbreviation: '2013'},
    
  ];  

  vehiclebrands = [
    {name: 'Acura', abbreviation: 'Acura'},
    {name: 'Alfa Romeo', abbreviation: 'Alfa Romeo'},
    {name: 'Audi', abbreviation: 'Audi'},
    {name: 'BMW', abbreviation: 'BMW'},
    {name: 'Cadillac', abbreviation: 'Cadillac'},
    {name: 'Chevrolet', abbreviation: 'Chevrolet'},
    {name: 'Chrysler Dodge', abbreviation: 'Chrysler Dodge'},
    {name: 'Fiat', abbreviation: 'Fiat'},
    {name: 'Ford', abbreviation: 'Ford'},
    {name: 'Honda', abbreviation: 'Honda'},
    {name: 'Hyundai', abbreviation: 'Hyundai'},
    {name: 'Jaguar', abbreviation: 'Jaguar'},
    
  ];  

  plans = [
    {name: 'Premium', abbreviation: 'Premium'},
    {name: 'Amplia', abbreviation: 'Amplia'},
    {name: 'Limitada', abbreviation: 'Limitada'},
    {name: 'Basica', abbreviation: 'Basica'},
  ];  

  constructor(private fb: FormBuilder,private http: HttpClient) {}

  onSubmit(): void {
    //alert('Thanks!');
    //alert(JSON.stringify(this.quoteForm.getRawValue()));
    this.sendQuoteRequest();

    
  }
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');


  sendQuoteRequest() {
    this.quoteResult = null;
    this.errorMessage = null;
    let loggedstr="";
    if(localStorage.getItem('loggedInfo'))
      loggedstr  = localStorage.getItem('loggedInfo')|| '';
    this.loggedInfo  =  JSON.parse(loggedstr);
    

    let jsonvalue={ user: this.loggedInfo?.username, 
                    quote_data: this.quoteForm.getRawValue()}
     
    

    this.http.post<any>('http://localhost:8000/api/quote/', JSON.stringify(jsonvalue),{headers: this.headers})
    .subscribe(
      (response:any) => {
        this.quoteResult = response.quote_id;
      },
      error => {
        this.errorMessage = error.error.error || 'An error occurred';
      }
  
  );
  }
}
