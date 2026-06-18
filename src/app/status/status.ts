import { Component, input } from '@angular/core';

@Component({
  selector: 'status',
  imports: [],
  templateUrl: './status.html',
  styleUrl: './status.scss',
})
export class Status {
  invalidMessage = input<string>();
}
