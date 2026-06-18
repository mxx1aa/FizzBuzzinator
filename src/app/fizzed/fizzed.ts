import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'fizzed',
  imports: [],
  templateUrl: './fizzed.html',
  styleUrl: './fizzed.scss',
})
export class Fizzed {
  fizzedValue = input<string>();
}
