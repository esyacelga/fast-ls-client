import { Pipe, PipeTransform } from '@angular/core';
import {environment} from '../../../environments/environment';
const URL = environment.url;
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, directorio: string): string {
    console.log('http://192.168.0.127:3000/articulo/imagen/5db4aae840a39c433879cec7/4azpwajok29jjecm.jpg');
    console.log(`${ URL }/articulo/imagen/${ directorio }/${ img }`);
    return `${ URL }/articulo/imagen/${ directorio }/${ img }`;
  }

}
