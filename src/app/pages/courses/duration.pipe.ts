import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'durationPipe'})
export class DurationPipe implements PipeTransform {
  transform(minutes: number) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes - hours * 60

    if (hours && mins) {
      return `${hours} h ${mins} min`
    }

    if (hours) {
      return `${hours} h`
    }

    if (mins) {
      return `${mins} min`
    }

    return '-'
  }
}
