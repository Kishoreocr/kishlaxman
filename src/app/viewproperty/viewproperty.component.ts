import { Component, OnInit, ComponentRef, Input, Output } from '@angular/core';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ModalDialogService, IModalDialogButton} from 'ngx-modal-dialog';

@Component({
  selector: 'app-viewproperty',
  templateUrl: './viewproperty.component.html',
  styleUrls: ['./viewproperty.component.css']
})
export class ViewpropertyComponent implements OnInit {
  modalService:any;
  @Input() selectedPropertyId:any;
  constructor(modalService:ModalDialogService) {
    this.modalService = modalService;
   }

  ngOnInit() {
  }
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<string>>) {
  }
}
