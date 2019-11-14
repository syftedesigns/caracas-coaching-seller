import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global/global.service';
import { SellerModuleClass } from 'src/app/classes/ventas.class';
import { WpService } from '../../services/wordpress/wp.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  public CurrentCourse: number = 0;
  public moduleData: SellerModuleClass | any = null;
  public canEdit: boolean = false;
  public loading: boolean = false;

  // Setters forms
  public formType: string = '';

  constructor(private _param: ActivatedRoute, private global: GlobalService,
              private wp: WpService) {
    this._param.queryParams.subscribe(
      (urlData) => {
        // Verificamos que trajo el post la URL
        if (urlData.post) {
          this.global.CurrentCourse = Number(urlData.post);
          this.CurrentCourse = Number(urlData.post);
        } else {
          throw new Error('Debe traer la ID del post de wordpress');
        }
      }
    );
  }

  ngOnInit() {
    // Revisa si ya el modulo fue creado anteriormente, sino se crea normal
    setTimeout(async () => {
      const ModuleData = await this.GetCurrentInfo();
      if (ModuleData !== null) {
        this.canEdit = true;
        this.moduleData = ModuleData[0];
        console.log(this.moduleData);
      } else {
        this.moduleData = '';
        console.log('ok');
      }
    }, 300);
  }
  GetCurrentInfo(): Promise<SellerModuleClass> {
    return new Promise((resolve, reject) => {
      this.wp.GetInfoFormDB('getCourseModule', this.CurrentCourse, 'courses')
        .subscribe((data) => {
          if (data.status) {
            resolve(data.data);
          } else {
            resolve(null);
          }
        });
    });
  }
/*
Este switch determinará que tipo de formulario se va a integrar con el curso
y en base a esto se irán añadiendo o quitando campos del formulario
*/
  ChangeValuesForm(eventValue: string): void {
    switch (eventValue) {
      case 'abierta':
        this.formType = 'abierta';
        break;
      case 'company':
        this.formType = 'company';
        break;
      case 'medida':
        this.formType = 'medida';
        break;
      case 'semi':
        this.formType = 'semi';
        break;
      case 'a-c':
        this.formType = 'a-c';
        break;
      case 'a-m':
        this.formType = 'a-m';
        break;
      case 'c-m':
        this.formType = 'c-m';
        break;
      case 'all':
        this.formType = 'all';
        break;
    }
  }
  StartIntegration(formValue: NgForm): void {
    if (formValue.invalid) {
      throw new Error('Form invalid');
    }
    this.loading = true;
    const sellerModule = new SellerModuleClass(this.CurrentCourse.toString(), this.formType,
    formValue.value.lp_room, formValue.value.lp_ref, formValue.value.lp_dur, formValue.value.lp_price_1 || '0',
    formValue.value.lp_price_2 || '0', null, formValue.value.lp_currency, formValue.value.lp_location,
    formValue.value.lp_date_available || '', formValue.value.lp_price_group || '', formValue.value.lp_group_max || '',
    formValue.value.lp_online || '1', formValue.value.medida || '0', this.moduleData.lp_id || '0');
    console.log(sellerModule);
    if (this.canEdit) {
      // Actualizamos
      this.wp.PostOperationOnWP('updateModuleCourse', 'courses', sellerModule)
        .subscribe((data) => {
          if (data.status) {
            this.loading = false;
            this.global.OpenSnackBar('Módulo actualizado con éxito', 5000);
            return;
          }
        });
    } else {
      // Creamos
      this.wp.PostOperationOnWP('createModuleCourse', 'courses', sellerModule)
        .subscribe((data) => {
          if (data.status) {
            // Creo con éxito
            this.loading = false;
            this.global.OpenSnackBar('Módulo integrado con éxito, puedes cerrar esta ventana.', 5000);
            formValue.reset();
            this.canEdit = true;
            return;
          }
        });
    }
  }
}
