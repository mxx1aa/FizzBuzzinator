import { Component, signal } from '@angular/core';
import { Fizzed } from './fizzed/fizzed';
import { Unfizzed } from './unfizzed/unfizzed';
import { Status } from './status/status';
import { NumbersWhiteSpaceOnlyDirective } from './numbers-whitespace-only/numbers-whitespace-only.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Fizzed, Unfizzed, Status, NumbersWhiteSpaceOnlyDirective],
})
export class App {
  protected readonly fizzedValue = signal('');
  invalid = signal<string>('');

  updateFizzingValue(unfizzed: string) {
    const fizzedValue = signal<string>('');

    let result: string[] = [];
    result = unfizzed.split(/\s+/).map((value) => {
      let processed: string = '';
      if (value.trim() === '') {
        processed = '';
      } else {
        let x = Number(value);
        if (x % 15 == 0) {
          processed = 'FizzBuzz ';
        } else if (x % 3 == 0) {
          processed = 'Fizz ';
        } else if (x % 5 == 0) {
          processed = 'Buzz ';
        } else if (value.length > 0) {
          processed = value + ' ';
        }
      }
      return processed;
    });

    //pass the fizzed value to the fizzed input
    this.fizzedValue.set(result.join(''));
  }
  getInvalidResponse(response: string) {
    this.invalid.set(response);
  }
}
