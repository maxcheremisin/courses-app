import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {
  transform(array: any[], orderBy: string, asc = false) {
    const isDate = orderBy === 'date'

    if (!orderBy || !orderBy.trim()) {
      return array
    }

    if (asc) {
      return Array.from(array).sort((item1, item2) => {
        if (isDate) {
          return this.orderByDate(item1[orderBy], item2[orderBy])
        }
        return this.defaultComparator(item1[orderBy], item2[orderBy])
      })
    } else {
      return Array.from(array).sort((item1, item2) => {
        if (isDate) {
          return this.orderByDate(item2[orderBy], item1[orderBy])
        }
        return this.defaultComparator(item2[orderBy], item1[orderBy])
      })
    }
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

  protected orderByDate(a: string, b: string) {
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
