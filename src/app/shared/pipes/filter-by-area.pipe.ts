import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByArea'
})
export class FilterByAreaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
