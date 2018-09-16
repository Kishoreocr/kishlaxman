import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalPropertyService} from '../services/modal-property.service';


@Component({
  selector: 'app-modal-property',
  template: '<ng-content></ng-content>'
})
export class ModalPropertyComponent implements OnInit {
  @Input() id: string;
  private element: any;
  constructor(private modalService: ModalPropertyService, private el: ElementRef) {
      this.element = el.nativeElement;
  }

  ngOnInit(): void {
      let modal = this;

      // ensure id attribute exists
      if (!this.id) {
          console.error('modal must have an id');
          return;
      }

      // move element to bottom of page (just before </body>) so it can be displayed above everything else
      document.body.appendChild(this.element);

      // close modal on background click
      this.element.addEventListener('click', function (e: any) {
          if (e.target.className === 'modal') {
              modal.close();
          }
      });

      // add self (this modal instance) to the modal service so it's accessible from controllers
      this.modalService.add(this);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.modalService.remove(this.id);
      this.element.remove();
  }

  // open modal
  open(): void {
      this.element.style.display = 'block';
      document.body.classList.add('modal-open');
  }

  // close modal
  close(): void {
      this.element.style.display = 'none';
      document.body.classList.remove('modal-open');
  }

}
