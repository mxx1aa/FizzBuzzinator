import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[emoji]',
})
export class emoji {
  constructor(
    private el: ElementRef<HTMLTextAreaElement>,
    private renderer: Renderer2,
  ) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key !== ' ') {
      return;
    }

    const textarea = this.el.nativeElement;
    const cursorIndex = textarea.selectionStart ?? 0;

    const textBeforeCursor = textarea.value.slice(0, cursorIndex);
    const previousWord = this.getPreviousWord(textBeforeCursor);

    if (!previousWord) {
      return;
    }

    const value = Number(previousWord);

    if (!Number.isInteger(value)) {
      return;
    }

    const emojis: string[] = [];

    if (value % 3 === 0) {
      emojis.push('🫧');
    }

    if (value % 5 === 0) {
      emojis.push('🐝');
    }

    if (emojis.length === 0) {
      return;
    }

    this.popEmoji(emojis.join(''), textarea);
  }

  private getPreviousWord(textBeforeCursor: string): string {
    const words = textBeforeCursor.trimEnd().split(/\s+/);
    return words[words.length - 1] ?? '';
  }

  private popEmoji(emoji: string, textarea: HTMLTextAreaElement): void {
    const caret = this.getTextareaCaretCoordinates(textarea);

    const emojiEl = this.renderer.createElement('span');
    const text = this.renderer.createText(emoji);

    this.renderer.appendChild(emojiEl, text);
    this.renderer.appendChild(document.body, emojiEl);

    this.renderer.setStyle(emojiEl, 'position', 'absolute');
    this.renderer.setStyle(emojiEl, 'left', `${caret.left}px`);
    this.renderer.setStyle(emojiEl, 'top', `${caret.top}px`);
    this.renderer.setStyle(emojiEl, 'font-size', '24px');
    this.renderer.setStyle(emojiEl, 'pointer-events', 'none');
    this.renderer.setStyle(emojiEl, 'z-index', '9999');
    this.renderer.setStyle(emojiEl, 'animation', 'emoji-pop 700ms ease-out forwards');

    window.setTimeout(() => {
      this.renderer.removeChild(document.body, emojiEl);
    }, 700);
  }

  private getTextareaCaretCoordinates(textarea: HTMLTextAreaElement): {
    left: number;
    top: number;
  } {
    const textareaRect = textarea.getBoundingClientRect();
    const cursorIndex = textarea.selectionStart ?? 0;

    const mirror = document.createElement('div');
    const caretMarker = document.createElement('span');

    const computed = window.getComputedStyle(textarea);

    mirror.style.position = 'absolute';
    mirror.style.visibility = 'hidden';
    mirror.style.whiteSpace = 'pre-wrap';
    mirror.style.wordWrap = 'break-word';
    mirror.style.overflow = 'hidden';

    mirror.style.top = `${textareaRect.top + window.scrollY}px`;
    mirror.style.left = `${textareaRect.left + window.scrollX}px`;
    mirror.style.width = computed.width;
    mirror.style.height = computed.height;

    mirror.style.font = computed.font;
    mirror.style.fontSize = computed.fontSize;
    mirror.style.fontFamily = computed.fontFamily;
    mirror.style.fontWeight = computed.fontWeight;
    mirror.style.letterSpacing = computed.letterSpacing;
    mirror.style.lineHeight = computed.lineHeight;

    mirror.style.padding = computed.padding;
    mirror.style.border = computed.border;
    mirror.style.boxSizing = computed.boxSizing;

    const textBeforeCaret = textarea.value.slice(0, cursorIndex);
    const textAfterCaret = textarea.value.slice(cursorIndex);

    mirror.textContent = textBeforeCaret;

    caretMarker.textContent = textAfterCaret.length > 0 ? textAfterCaret[0] : '.';
    mirror.appendChild(caretMarker);

    document.body.appendChild(mirror);

    const markerRect = caretMarker.getBoundingClientRect();

    const coordinates = {
      left: markerRect.left + window.scrollX,
      top: markerRect.top + window.scrollY - textarea.scrollTop,
    };

    document.body.removeChild(mirror);

    return coordinates;
  }
}
