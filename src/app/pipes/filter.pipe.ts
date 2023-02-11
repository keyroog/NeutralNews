import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any[], ...args: unknown[]): any[] {
    return values.filter(v => v.sentiment === 'positive');
  }


}
