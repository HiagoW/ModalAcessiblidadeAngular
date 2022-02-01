import { Directive, OnDestroy, OnInit } from "@angular/core";

@Directive({
  selector: '[appFocusBack]'
})
export class FocusBackDirective implements OnInit, OnDestroy {

  private lastFocusedElement: Element;

  // Antes de ficar visível, da view ser redenrizada
  public ngOnInit(): void {
    this.lastFocusedElement = document.activeElement;
  }

  // Diretiva vai ser destruída junto com o componente
  public ngOnDestroy(): void {
    if (this.lastFocusedElement) {
      (this.lastFocusedElement as HTMLElement).focus();
    }
  }

}
