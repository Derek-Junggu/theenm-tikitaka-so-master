import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { BroadcastEvent } from './broadcast-event'

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  private eventBus: Subject<BroadcastEvent>

  constructor() {
    this.eventBus = new Subject<BroadcastEvent>()
  }

  broadcast(key: any, data?: any) {
    this.eventBus.next({ key, data })
  }

  on<T>(key: any): Observable<T> {
    return this.eventBus.asObservable().pipe(
      filter(event => event.key === key),
      map(event => <T>event.data)
    )
  }
}
