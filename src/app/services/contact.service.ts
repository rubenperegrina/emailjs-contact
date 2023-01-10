import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  private baseUrl = environment.emailJS_url;
  private emailJS_public_key = environment.emailJS_public_key;
  private emailJS_service_id = environment.emailJS_service_id;
  private emailJS_template_id = environment.emailJS_template_id;

  constructor(private _http: HttpClient) { }

  sendEmail(templateParams: { [key: string]: string }) {
    const data = {
      "service_id": this.emailJS_service_id,
      "template_id": this.emailJS_template_id,
      "user_id": this.emailJS_public_key,
      template_params: templateParams
  }
    return this._http.post<{ [key: string]: string }>(`${this.baseUrl}/send`, data);
  }
}