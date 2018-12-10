import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  public parseDate(date: Date, separator = '.') {
    const [year, month, day] = date.toString().split('-')

    return [day, month, year].join(separator)
  }
}
