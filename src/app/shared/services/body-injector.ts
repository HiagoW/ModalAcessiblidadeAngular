import { ApplicationRef, ComponentRef, EmbeddedViewRef, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class BodyInjectorService {

  constructor(private appRef: ApplicationRef) {}

  public stackBeforeAppRoot(componentRef: ComponentRef<any>): void {
    const domElement = this.createDomElement(componentRef);
    const appRoot = document.body.querySelector('app-root');
    document.body.insertBefore(domElement, appRoot);
  }

  private createDomElement(componentRef: ComponentRef<any>): HTMLElement {
    // hostView tem o template (HTML) do component
    // Insere hostview do component na view do angular, que passa a gerenciar o componente
    this.appRef.attachView(componentRef.hostView);
    // agora queremos mudar o html de lugar
    // EmbeddedViewRef é uma classe abstrata que estende de ViewRef, possuí método para pegar o node HTML, neste caso pegamos o primeiro, a raíz
    const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    return domElement;
  }

}
