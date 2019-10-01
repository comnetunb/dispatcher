import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.form.addControl('confirmPassword',
      new FormControl('', [Validators.required, this.validateAreEqual.bind(this)])
    );
  }

  private validateAreEqual(fieldControl: FormControl): { notEqual: boolean } {
    return fieldControl.value === this.form.get("password").value ? null : {
      notEqual: true
    };
  }

  submit() {
    if (!this.form.valid) {
      return;
    }

    let formValue = this.form.value;

    if (formValue.confirmPassword != formValue.password) {
      return;
    }

    this.loading = true;

    this.authService.login(formValue.email, formValue.password)
      .subscribe((teste) => {
        console.log(teste);
      },
        (error) => {
          console.log(error);
          this.errorMessage = error.error.error;
        });
  }

  getErrorMessage(formControlName: string) {
    let formControl = this.form.get(formControlName);
    let formValue = this.form.value;

    switch (formControlName) {
      case 'fullName':
        return formControl.hasError('required') ? 'Fill your full name' :
          '';

      case 'email':
        return formControl.hasError('required') ? 'E-mail is required' :
          formControl.hasError('email') ? 'E-mail inválido' :
            '';

      case 'password':
        return formControl.hasError('required') ? 'Password is required' :
          '';

      case 'confirmPassword':
        return formControl.hasError('required') ? 'Confirm your password' :
          formControl.hasError('notEqual') ? 'Passwords do not match' :
            'weeqewq';
    }

    return 'Invalid field'; // should not happen
  }

}