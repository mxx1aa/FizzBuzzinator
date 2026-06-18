# Instructions 📝

## Unfizzed 🫗

- component should have an input that takes up the remainder of the available space after a heading to specify what the space is for (see mockup below) (value => unfizzedValue)
- the resulting value entered should be handled by the app.ts file (unfizzedValue)
- the app.ts file will inject the unfizzedValue into the Fizzed component
- unfizzed.ts will have an @Output() that emits an action to the app.ts file

### Mockup

```
/--------------------------------\
| unfizzed |                     |
|----------|                     |
| ______________________________ |
| | 1 2 3 4 5 189 2834 02835 38| |
| | 23 4 2 5                   | |
| ------------------------------ |
\________________________________/

```

### Files to edit

- app.ts
- app.html
- unfizzed.html
- unfizzed.ts
- \*maybe some css stuff

## Fizzed 🫧

- Fizzed.ts will have an @Input() that will take in a value from the app.html and app.ts file<span style="background-color:rgb(41,41,41);color:rgb(255,255,255);font-size:inherit">: see https://angular.dev/api/core/Input</span>

### Mockup

```
/--------------------------------\
| fizzed   |                     |
|----------|                     |
| ______________________________ |
| | 1 2 fizz fizzbuzz 11 121111| |
| | 23 4 2 fizz                | |
| ------------------------------ |
\________________________________/

```

### Files to edit

- app.ts
- app.html
- fizzed.html
- fizzed.ts
- \*maybe some css stuff

## App.ts/App.html

- The value that is injected into the Fizzed component should be parsed by a method here

## Status ⚠️

In a separate component, handle all validation responses by passing the resulting notification as an `@Input` to the component. When validation is passed, statuses should be cleared. If anything is invalid, the status should be present. Use a signal for the active property in `app.ts`.

### General idea

- Error in fizzed component -> app.ts -> error component
- Error in unfizzed component -> app.ts -> error component
- Error in app.ts -> error component

### Considerations

- Error: Type non-whitespace and non-integer values **see directive instructions**
- Warning: Multiple whitespace elements (space space, space line-break, etc.) **see directive instructions**
- Warning: Maximum character entry (3000) **see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/maxlength**

### Locations (not limited to)

- updateFizzingValue()
- unfizzed.html + unfizzed.ts

## Directive 🗺️

https://angular.dev/guide/directives
Create a separate .ts file (similar to emojis), that is a directive
This directive should be added to the `<textarea>` in the unfizzed.html file.
The directive should have an error/invalid `@Output()` that passes back any issues caught by the directive
For the `OnInput(event: Event): void { ... } ` method, this should clean up the logic and emit a message stating that something went wrong.

### Directive declaration

```ts
@Directive({
  selector: 'textarea[numbersWhitespaceOnly], input[numbersWhitespaceOnly]'
})
```

### Regex validation

```ts
const el = event.target as HTMLTextAreaElement | HTMLInputElement;
const cleaned = el.value.replace(/[^\d\s]/g, '');
```
