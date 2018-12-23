import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'durationPipe'})
export class DurationPipe implements PipeTransform {
  transform(minutes: number) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes - hours * 60

    return hours && mins ? `${hours} h ${mins} min` : hours ? `${hours} h` : mins ? `${mins} min` : '-'
  }
}
