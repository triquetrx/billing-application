import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipePipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!searchText) return items;
    if (items.length <= 0) return items;
    return items.filter((item) => {
      return Object.keys(item).some((key) => {
        return String(item[key])
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
    });
  }
}
