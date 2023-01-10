import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AppComponent {
  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _contactService: ContactService,
  ) { }


  ngOnInit(): void {
    this.contactForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  onSubmit(): void {
    this.sendEmail(this.contactForm.value);
  }

  sendEmail(data: { [key: string]: string }) {
    this._contactService.sendEmail(data).subscribe((response: any) => {
    }, (err: { status: number; }) => {
      if (err.status === 200) {
        Swal.fire({
          icon: 'success',
          title: "El formulario se ha enviado correctamente",
          showConfirmButton: false,
          timer: 1500
        })
        this.contactForm.reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: "Ha habido un error al enviar el formulario, vuelve a intentarlo",
          showConfirmButton: false,
          timer: 2000
        })
      }
    });
  }
}
