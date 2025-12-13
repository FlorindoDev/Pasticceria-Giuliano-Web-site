import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_services/user/user.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'user-missing-info',
  imports: [ReactiveFormsModule],
  templateUrl: './user-missing-info.component.html',
  styleUrl: './user-missing-info.component.scss'
})
export class UserMissingInfo implements OnInit, OnChanges {

  @Input() telefono: boolean = true;
  @Input() indirizzo: boolean = true;

  private readonly addressControls = ['street', 'streetNumber', 'region', 'cap', 'comune'];

  constructor(
    private authservice: AuthService,
    private UserService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  isSubmitted: boolean = false;

  infoMissingForm = new FormGroup({
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+?[0-9\s\-]{7,15}$/)
    ]),
    street: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    streetNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]+[a-zA-Z\/\-0-9]*$/),
      Validators.maxLength(10)
    ]),
    region: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    cap: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{5}$/)
    ]),
    comune: new FormControl('', [Validators.required, Validators.maxLength(80)])
  });


  startLoading() {
    document.getElementById("text-salva")?.classList.add("hidden");
    document.getElementById("loading")?.classList.remove("hidden");
  }

  stopLoading() {
    document.getElementById("text-salva")?.classList.remove("hidden");
    document.getElementById("loading")?.classList.add("hidden");
  }

  addRedRing(element: HTMLElement, error: unknown | boolean): void {
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
    this.infoMissingForm.reset();
    this.isSubmitted = false;
  }

  /*
  userLoggedSuccess(token: string) {
    this.authservice.updateToken(token);
    setTimeout(() => {
      this.UserService.getUserFromId(this.authservice.getIdFromToken(token)).subscribe({
        next: (val) => {

          this.UserService.saveUser(val);
          this.closeMissingInfo();
          this.clearInput();

          this.toastr.success("Hai fatto l'accesso con successo", "Accesso Completato!");
          setTimeout(() => {
            this.logged.emit(true);
            this.stopLoading();
          }, 10);
        }
      });
    }, 200);


  }*/

  isFieldInError(element: HTMLElement) {
    let attr: string = element.getAttribute("formControlName") as string;
    const control = this.infoMissingForm.get(attr);
    return control?.errors !== null;

  }


  handleSave() {
    this.isSubmitted = true;
    if (this.infoMissingForm.invalid) {

      let element = document.querySelectorAll("#form-info-missing input[type]");
      element.forEach((val) => {
        this.addRedRing(val as HTMLElement, this.isFieldInError(val as HTMLElement));
      });

    } else {

      this.startLoading();
      /*
      this.authservice.login({
        email: this.infoMissingForm.value.user as string,
        password: this.infoMissingForm.value.pass as string
      }).subscribe({

        next: (val) => {
          this.userLoggedSuccess(val.token);
        },

        error: () => {
          this.stopLoading();
        }

      });*/
    }
  }

  ngOnInit() {
    this.togglePhoneControl(this.telefono);
    this.toggleAddressControls(this.indirizzo);
    let element = document.getElementById("info-missing");
    element?.classList.add("hidden");
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url.endsWith("#info")) {
          this.openMissingInfo();
        }
      });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['telefono']) {
      this.togglePhoneControl(this.telefono);
    }
    if (changes['indirizzo']) {
      this.toggleAddressControls(this.indirizzo);
    }
  }

  closeMissingInfo() {
    let element = document.getElementById("info-missing");
    element?.classList.add("hidden");
    this.router.navigate([], { fragment: '' });


  }

  openMissingInfo() {
    let element = document.getElementById("info-missing");
    if (element?.classList.contains("hidden")) {
      element?.classList.remove("hidden");
    }

  }

  private togglePhoneControl(show: boolean) {
    const control = this.infoMissingForm.get("phone");
    if (!control) {
      return;
    }
    if (show) {
      control.enable({ emitEvent: false });
    } else {
      control.reset('');
      control.disable({ emitEvent: false });
    }
  }

  private toggleAddressControls(show: boolean) {
    this.addressControls.forEach((name) => {
      const control = this.infoMissingForm.get(name);
      if (!control) {
        return;
      }
      if (show) {
        control.enable({ emitEvent: false });
      } else {
        control.reset('');
        control.disable({ emitEvent: false });
      }
    });
  }



}
