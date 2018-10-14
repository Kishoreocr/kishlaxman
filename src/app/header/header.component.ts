import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { SlideInOutAnimation } from '../animations';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [SlideInOutAnimation]
})
export class HeaderComponent implements OnInit {

  isScollDown: boolean = false;
  animationState = 'in';
  constructor(private _eref: ElementRef) { }

  ngOnInit() {
  }

 bgColorchange = false;
  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      debugger;
      this.bgColorchange = true;
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      console.log(this.animationState);
     
    }
  }
  closeSidebar(divName: string){
    this.bgColorchange = false;
    this.animationState = this.animationState === 'out' ? 'in' : 'out';

  }

  @HostListener('document:click', ['$event']) 
  clickedOutside($event){
   
    if (!this._eref.nativeElement.contains(event.target)){
    this.bgColorchange = false;
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
    }
  }


  @HostListener('window:scroll', ['$event'])
  headerStick(event) {
    if (window.pageYOffset > 100) {
      this.isScollDown = true;
    }
    else {
      this.isScollDown = false;
    }
  }

}
