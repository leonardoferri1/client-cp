import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import type { User } from "../user/user.service";

@Injectable({
	providedIn: "root",
})
export class PortalService {
  httpClient = inject(HttpClient)

  getUsuarioById(id: string | number) {
    return this.httpClient.get<{ data: User }>(`${import.meta.env.NG_APP_ADM_API_URL}/usuarios/${id}?with=pessoa&include=modules,modulopadrao,cidade`)
  }
}
