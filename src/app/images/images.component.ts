import { Component, OnInit, OnDestroy, AfterViewInit, ViewChildren, QueryList } from '@angular/core';

import { Subscription } from 'rxjs/Rx';

import { FaderDirective } from '../fader.directive';

@Component({
  selector: 'sc-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren(FaderDirective) children: QueryList<FaderDirective>;
  showing: boolean = false;

  private _subscriptions: Subscription[] = [];

  constructor() { }

  private _inspectChildren(children: QueryList<FaderDirective>) {
    if ( children.length != 0 ) {
      console.log(children.first)
    }
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this._subscriptions.push(
      this.children.changes.subscribe(
        this._inspectChildren,
        err => console.error(err)
      )
    )
  }

  toggle(): void {
    this.showing = !this.showing;
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
    this._subscriptions = [];
  }

}
