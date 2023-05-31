import {
  Component,
  ContentChild,
  ElementRef, inject,
  Input,
  OnChanges,
  OnDestroy, OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import * as MarkdownIt from 'markdown-it';
import {DesignerEventsService, FormAction} from "../designer-events.service";
import {Subscription} from "rxjs";
import {FormItem} from "../design-form/form-manager.service";

const md = new MarkdownIt();

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.scss']
})
export class MarkdownViewerComponent implements  OnDestroy, OnInit {

  model: string;
  @ViewChild('target') target: ElementRef;

  #events = inject(DesignerEventsService);
  #container = inject(ElementRef);

  element: FormItem = null;
  htmlModel: string = '';

  private subs = new Subscription();


  ngOnDestroy() {
      this.subs.unsubscribe();
  }

  ngOnInit() {
      this.subs.add(this.#events.getDisplayActions().subscribe((fa : FormAction) => {
           if ((fa.type === 'markDownUpdate') || (fa.type === 'showMarkDown')) {
               this.htmlModel = md.render(fa.relatedFormElement?.mdHelpText || '');
               this.target.nativeElement.innerHTML = this.htmlModel;
               this.element = fa.relatedFormElement || null;
           }

           if (fa.type === 'showMarkDown') {
                 if (this.target) {
                   this.#container.nativeElement.classList.add('displayed');
                 }
           }
      }));
  }

  close() {
    this.#container.nativeElement.classList.remove('displayed');
  }


}
