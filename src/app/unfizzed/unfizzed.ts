import { Component, EventEmitter, Output, output } from '@angular/core';
import { emoji } from '../emoji/emoji';
import { NumbersWhiteSpaceOnlyDirective } from '../numbers-whitespace-only/numbers-whitespace-only.directive';

@Component({
  selector: 'unfizzed',
  imports: [emoji, NumbersWhiteSpaceOnlyDirective],
  templateUrl: './unfizzed.html',
  styleUrl: './unfizzed.scss',
})
export class Unfizzed {
  unfizzedValue = output<string>();
  invalid = output<string>();

  onInputChange(event: Event) {
    const textarea = event.target as HTMLInputElement;
    this.unfizzedValue.emit(textarea.value);
  }

  catchInvalidInput(value: string) {
    this.invalid.emit(value);
  }
}
