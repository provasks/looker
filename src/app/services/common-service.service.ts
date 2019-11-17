import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  public navHeader = true;

  private navHeaderSource = new BehaviorSubject<boolean>(true);
  public navData = this.navHeaderSource.asObservable();

  constructor() { }

  updatedDataSelection(data) {
    this.navHeaderSource.next(data);
  }




}
