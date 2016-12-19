import { Component, OnInit, OnDestroy, AfterViewInit,
  ViewChildren, QueryList,
  trigger, state, style, transition, animate,
  AnimationTransitionEvent
} from '@angular/core';

import { Observable, Subscription, BehaviorSubject } from 'rxjs/Rx';

import { FaderDirective } from '../fader.directive';

@Component({
  selector: 'sc-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  animations: [
    trigger('crossFade',[
      state('pre',  style({ opacity: 1 })),
      state('fade', style({ opacity: 0 })),
      transition('pre => fade', animate('1s ease-out')),
    ]),
  ],
})
export class ImagesComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren(FaderDirective) children: QueryList<FaderDirective>;
  showing: boolean = false;
  status: string = 'pre';

  private _subject: BehaviorSubject<boolean> = new BehaviorSubject(true);

  private _subscriptions: Subscription[] = [];

  curr: string = '/assets/LL220-1101/nude/image1xl.jpg';
  copy: string = '/assets/LL220-1101/black/image1xl.jpg';
  
  private _images: string[] = [
    '/assets/LL220-1101/nude/image1xl.jpg',
    '/assets/LL220-1101/black/image1xl.jpg'
  ];

  private _mode: boolean = true;

  constructor() { }

  private _getImage(): string {
    return (this._mode) ? this._images[0] : this._images[1];
  }

  private _inspectChildren(children: QueryList<FaderDirective>) {
    if ( children.length != 0 ) {
      setTimeout(() => this.curr = this._getImage(),0);
      this.toggleSubject();
    }
  }

  ngOnInit(): void {
    this._subscriptions.push(
      this._subject.distinctUntilChanged()
        .concatMap(status => (status) ? Observable.of(status) : Observable.of(status).delay(1))
        .subscribe(status => this.status = (status) ? 'pre' : 'fade')
    )
  }

  ngAfterViewInit(): void {
    this._subscriptions.push(
      this.children.changes.subscribe(
        children => this._inspectChildren(children),
        err => console.error(err)
      )
    )
  }

  fadeComplete(event: AnimationTransitionEvent): void {
    //console.log(event);
    if ( event.fromState === 'pre' && event.toState === 'fade' ) {
      this.toggle();
      this.toggleSubject();
    }
  }

  toggle(): void {
    this.showing = !this.showing;
  }

  toggleSubject(): void {
    this._subject.next(!this._subject.getValue());
  }

  toggleMode(): void {
    this._mode = !this._mode;
  }

  swapImage(): void {
    this.copy = this.curr;
    this.toggleMode();
    this.toggle();
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
    this._subscriptions = [];
  }

}
