import { Injectable } from '@angular/core';
import { GlobalService } from '../global/global.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { SellerModuleClass } from '../../classes/ventas.class';

@Injectable({
  providedIn: 'root'
})
export class WpService {

  // tslint:disable-next-line:variable-name
  constructor(private global: GlobalService, private _http: HttpClient) { }


  GetInfoFormDB(operationType: string, courseId: number, routeFile: string) {
    let url = `http://api.caracascoaching.com/routes/${routeFile}.php`;
    url += `?operationType=${operationType}&course_id=${courseId}`;
    return this._http.get(url).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.global.OpenSnackBar('Operación fallida, inténtelo más tarde');
        return new Observable<string | boolean>();
      })
    );
  }
 // Crea o actualiza datos en la db de wordpress
  PostOperationOnWP(operationType: string, routeFile: string, objectModule: SellerModuleClass) {
    const url = `http://api.caracascoaching.com/routes/${routeFile}.php?operationType=${operationType}`;
    const form = new FormData();
    form.append('lp_post_id', objectModule.lp_post_id);
    form.append('lp_type', objectModule.lp_type);
    form.append('lp_room', objectModule.lp_room);
    form.append('lp_ref', objectModule.lp_ref);
    form.append('lp_dur', objectModule.lp_dur);
    form.append('lp_price_1', objectModule.lp_price_1);
    form.append('lp_price_2', objectModule.lp_price_2);
    form.append('lp_price_assist_buff', objectModule.lp_price_assist_buff);
    form.append('lp_currency', objectModule.lp_currency);
    form.append('lp_location', objectModule.lp_location);
    form.append('lp_date_available', objectModule.lp_date_available);
    form.append('lp_price_group', objectModule.lp_price_group);
    form.append('lp_group_max', objectModule.lp_group_max);
    form.append('lp_online', objectModule.lp_online);
    form.append('lp_medida', objectModule.lp_medida);
    form.append('lp_id', objectModule.lp_id);
    return this._http.post(url, form).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.global.OpenSnackBar('Operación fallida, inténtelo más tarde');
        return new Observable<string | boolean>();
      })
    );
  }
}
