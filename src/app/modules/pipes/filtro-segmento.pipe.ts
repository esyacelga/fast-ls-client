import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroSegmento'
})
export class FiltroSegmentoPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.tipoArticulo.indexOf(filter.tipoArticulo) !== -1);
  }

}
