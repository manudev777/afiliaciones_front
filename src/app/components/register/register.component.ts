import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { ErrorComponent } from '../../shared/error/error.component';
import { RegisterService } from '../../services/register.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { environment } from '../../../environment/environment';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Register } from '../../model/register';
import { Router } from '@angular/router';
import { LocationService } from '../../services/locations.service';
import { AuthService } from '../../services/auth.service';

export function domainValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailFormGroup = control as FormGroup;
    const domain = emailFormGroup.get('domain')?.value;
    const otherDomain = emailFormGroup.get('otherDomain')?.value;

    if (domain === 'Otros' && !otherDomain) {
      return { otherDomainRequired: true };
    } 

    if (domain !== 'Otros' && !domain) {
      return { domainRequired: true };
    }

    return null; 
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorComponent,
    NavbarComponent,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  standalone:true,
  providers: [RegisterService,LocationService,AuthService],

})
export class RegisterComponent  implements OnInit{
  registrationForm!: FormGroup;
  captchaValido: boolean = false;
  captchaToken: string | null = null;
  captchaSiteKey: string = environment.captcha;

  rucOptions: { label: string; value: string }[] = [
    { label: '¿Cuenta con RUC?', value: '' },
    { label: 'Sí', value: '1' },
    { label: 'No', value: '0' },
  ];

  departments: string[] = [];
  provinces: string[] = [];
  districts: string[] = [];
  emailDomains: string[] = [];

  title = '¡Sé un agente multibanco Kasnet!';

  constructor(
    private registerService: RegisterService,
    private locationsService: LocationService,
    private authService: AuthService,
    private router: Router,
    private fb:FormBuilder
  ) {

    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required]),
      lastnameSecond: new FormControl('', [Validators.required]),
      email: this.fb.group(
        {
          localPart: ['', [Validators.required]],
          domain: ['', [Validators.required]],
          otherDomain: [''],
        },
        { validators: domainValidator() } 
      ),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{9}$'),
        Validators.min(9),
      ]),
      ruc: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(){
    this.emailDomains = this.registerService.getEmailDomains();

    this.registrationForm.get('email.domain')?.valueChanges.subscribe((value) => {
      const otherDomainControl = this.registrationForm.get('email.otherDomain');
      if (value === 'Otros') {
        otherDomainControl?.setValidators([Validators.required]);
      } else {
        otherDomainControl?.clearValidators();
      }
      otherDomainControl?.updateValueAndValidity();
    });


    this.locationsService.getDepartments().subscribe((departments) => {
      this.departments = departments;
    });

    this.registrationForm.get('department')?.valueChanges.subscribe((department) => {
      if (department) {
        this.locationsService.getProvinces(department).subscribe((provinces) => {
          this.provinces = provinces;
          this.registrationForm.get('province')?.setValue('');
          this.districts = [];
        });
      }
    });

    this.registrationForm.get('province')?.valueChanges.subscribe((province) => {
      if (province) {
        this.locationsService.getDistricts(province).subscribe((districts) => {
          this.districts = districts;
          this.registrationForm.get('district')?.setValue('');
        });
      }
    });
  }

  captchaResult(token: any) {
    this.captchaToken = token;
    this.captchaValido = true;
  }

  clearDomain(): void {
    this.registrationForm.get('email')?.get('domain')?.setValue('');
    this.registrationForm.get('email')?.get('otherDomain')?.reset();
  }

  onSubmit() {
    if (this.registrationForm.valid && this.captchaValido) {
      
      Swal.fire({
        title: 'Procesando...',
        text: 'Por favor espere',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); 
        },
      });

      this.registerService.registerAgent(this.generateForm()).subscribe({
        next: (data) => {
          Swal.close(); 

          Swal.fire({
            title: '¡Éxito!',
            text: 'La operación se realizó correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        },
        error: (error) => {
          Swal.close(); 
          console.log(error);
          Swal.fire({
            title: '¡Error!',
            text: 'Ocurrió un problema al realizar la operación',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        },
        complete: () => this.resetForm()
      });
    } else {
      Swal.fire({
        title: '!Formulario inválido!',
        text: 'Revise los datos del formulario antes de continuar',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  generateForm() : Register{
    const registro = this.registrationForm.value;
    let domain = registro.email.domain == "Otros" ?  registro.email.otherDomain : registro.email.domain;

    registro.email = registro.email.localPart + "@" + domain;
    registro.ruc = registro.ruc == 1 ? "SI":"NO";
    return registro;
  }

  resetForm(){
    this.registrationForm.setValue({
      name: '',
      lastname: '',
      lastnameSecond: '',
      email: {
        localPart: '',
        domain: '',
        otherDomain: ''
      },
      phone: '',
      ruc: '',
      department: '',
      province: '',
      district: ''
    });
  
    this.captchaValido = false;
    this.captchaToken = null;   

    this.router.navigate(['/login']); 
  }
}
