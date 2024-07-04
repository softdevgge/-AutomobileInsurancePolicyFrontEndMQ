import { Component ,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  form!: FormGroup;                    // {1}
  private formSubmitAttempt!: boolean; // {2}

  //username = '';
  //password = '';

  constructor(
    private fb: FormBuilder,         // {3}
    private authService: AuthService // {4}
  ) {}

  ngOnInit() {
    this.form = this.fb.group({     // {5}
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form!.get(field)!.valid && this.form!.get(field)!.touched) ||
      (this.form!.get(field)!.untouched && this.formSubmitAttempt)
    );
  }


  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.get("userName")?.getRawValue()
        , this.form.get("password")?.getRawValue()); // {7}
    }
    this.formSubmitAttempt = true;             // {8}
  }


  //login() {
   // this.authService.login(this.username, this.password);
  //}
}
