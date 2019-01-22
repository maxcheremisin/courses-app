import {Pipe, PipeTransform} from '@angular/core'

interface SortableItem {
  [K: string]: string | number
}

@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {
  transform(array: SortableItem[], orderBy: string, asc = false) {
    const isDate = orderBy === 'date'

    if (!orderBy || !orderBy.trim()) {
      return array
    }

    return Array.from(array).sort((item1, item2) => {
      const elements: [keyof SortableItem, keyof SortableItem] = asc
        ? [item1[orderBy], item2[orderBy]]
        : [item2[orderBy], item1[orderBy]]

      return isDate ? this.orderByDate(...elements) : this.defaultComparator(...elements)
    })
  }

  protected defaultComparator(a: any, b: any) {
    if (isNaN(parseFloat(a)) || !isFinite(a) || (isNaN(parseFloat(b)) || !isFinite(b))) {
      if (a.toLowerCase() < b.toLowerCase()) {
        return -1
      }
      if (a.toLowerCase() > b.toLowerCase()) {
        return 1
      }
    } else {
      if (parseFloat(a) < parseFloat(b)) {
        return -1
      }
      if (parseFloat(a) > parseFloat(b)) {
        return 1
      }
    }

    return 0
  }

  protected orderByDate(a: keyof SortableItem, b: keyof SortableItem) {
    const date1 = new Date(a)
    const date2 = new Date(b)

    if (date1 < date2) {
      return -1
    }
    if (date1 > date2) {
      return 1
    }

    return 0
  }
}
