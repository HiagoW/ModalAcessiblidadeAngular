import { OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { ModalService } from './shared/components/modal/services/modal.service';
import { Component, ViewChild } from '@angular/core';
import { ModalRef } from './shared/components/modal/models/modal-ref';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('modal') public modalTemplateRef: TemplateRef<any>;

  title = 'a11y-p2';
  public firstName = 'Flávio';
  public modalRef: ModalRef;
  public info = false;
  public form: FormGroup;

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ) {}

  // Sempre colocar inicializações que o Angular deve gerenciar, no ngOnInit, pois o constructor é do JavaScript, não é gerenciado pelo Angular
  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['Flávio', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required],
      info: [false]
    })
  }

  public show(): void {
    this.modalRef = this.modalService.open({
      templateRef: this.modalTemplateRef,
      title: 'User Details'
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return ;
    }
    console.log(this.form.value);
    this.modalRef.close();
  }
}
