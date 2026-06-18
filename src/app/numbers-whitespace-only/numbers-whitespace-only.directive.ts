import { Directive, EventEmitter, HostListener, output, Output } from '@angular/core';

@Directive({
  selector: 'textarea[numbersWhitespaceOnly], input[numbersWhitespaceOnly]',
})
export class NumbersWhiteSpaceOnlyDirective {
  invalidResult = output<string>();

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const el = event.target as HTMLTextAreaElement | HTMLInputElement;
    const originalValue = el.value;

    let cleaned = '';

    if (originalValue.length > 3000) {
      this.invalidResult.emit('Character limit reached!');
      return;
    }

    const hasInvalidChars = /[^\d\s]/.test(originalValue); //checks if it hasnt anything thats NOT a number

    const hasMultipleWhitespaces = /\s{2,}/.test(originalValue); //checks for more than one space
    if (hasInvalidChars) {
      //if statement to check if the entered values(originalValue, string or null) are ^^^^^
      this.invalidResult.emit('Only numbers are allowed!');
      cleaned = el.value.replace(/[^\d\s]/g, ''); //deletes everything except spaces and digits
    } else if (hasMultipleWhitespaces) {
      this.invalidResult.emit('Too many spaces!');
      cleaned = el.value.replace(/\s{2,}/g, ' '); //deletes everything except spaces and digits
    } else {
      //anything else entered
      this.invalidResult.emit('');
      cleaned = el.value;
    }
    if (originalValue !== cleaned) {
      //code will only work if something was removed
      el.value = cleaned;
    }
  }
}
