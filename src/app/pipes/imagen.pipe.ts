import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/img';
    // Valida si existe la imagen
    if (!img) {
      return url += '/usuarios/xxx';
    }
    // Valida si la imagen es del perfil de Google
    if (img.indexOf('https') >= 0) {
      return img;
    }
    // Recupera la imagen  de usuarios, hospitales o medicos
    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'medico':
        url += '/medicos/' + img;
      break;
      case 'hospital':
        url += '/hospitales/' + img;
      break;
      default:
      console.log('El tipo de imagen no existe');
      url += '/usuarios/xxx';
    }
    return url;
  }

}
