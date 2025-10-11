
import { Component, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Output } from '@angular/core';


@Component({
  selector: 'sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUp {

  @Output() gotoLogin = new EventEmitter<string>();

  constructor(
    private authservice: AuthService,
    private toastr: ToastrService,
  ) { }

  isSubmitted: boolean = false;

  signupForm = new FormGroup({

    user: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/)]),
    pass: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50)]),
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)]),
    cognome: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)]),
  });

  startLoading() {
    document.getElementById("text-of-sign")?.classList.add("hidden");
    document.getElementById("loading-sign")?.classList.remove("hidden");
  }

  stopLoading() {
    document.getElementById("text-of-sign")?.classList.remove("hidden");
    document.getElementById("loading-sign")?.classList.add("hidden");
  }

  addRedRing(element: HTMLElement, error: boolean): void {
    if (error) {
      element.classList.add("ring-2");
      element.classList.add("ring-red-400");
    } else {
      element.classList.remove("ring-2");
      element.classList.remove("ring-red-400");
    }
  }

  hendleTyping(event?: Event) {
    let element = event?.target as HTMLElement;
    if (this.isSubmitted) {
      this.addRedRing(element, this.isFieldInError(element));
    }
  }

  clearInput() {
    this.signupForm.get('pass')?.setValue('');
    this.signupForm.get('user')?.setValue('');
    this.signupForm.get('nome')?.setValue('');
    this.signupForm.get('cognome')?.setValue('');
    this.isSubmitted = false;
  }

  userSignedSuccess() {

    this.closeSingup();
    this.toastr.success("Hai fatto la registrazione con successo", "Registrazione Completata!");
    this.clearInput();

    setTimeout(() => {
      this.stopLoading();
    }, 10);


  }

  isFieldInError(element: HTMLElement) {
    let attr: string = element.getAttribute("formControlName") as string;
    const control = this.signupForm.get(attr);
    return control?.errors !== null;

  }

  handleSignup() {
    this.isSubmitted = true;
    if (this.signupForm.invalid) {

      this.toastr.error("I dati che hai inserito non sono validi!", "Oops! Dati invalidi!");
      let element = document.querySelectorAll("#form-signup input[type]");
      element.forEach((val) => {

        this.addRedRing(val as HTMLElement, this.isFieldInError(val as HTMLElement));
      });

    } else {
      this.startLoading();
      this.authservice.signup({
        email: this.signupForm.value.user as string,
        password: this.signupForm.value.pass as string,
        nome: this.signupForm.value.nome as string,
        cognome: this.signupForm.value.cognome as string
      }).subscribe({

        next: () => {
          this.userSignedSuccess();
        },

        error: () => {
          this.stopLoading();
        }

      });
    }
  }

  ngOnInit() {
    let element = document.getElementById("signup");
    element?.classList.add("hidden");
  }

  closeSingup() {
    let element = document.getElementById("signup");
    element?.classList.add("hidden");
  }



}
