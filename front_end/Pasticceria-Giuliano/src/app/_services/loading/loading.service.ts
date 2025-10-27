import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private _loading$ = new BehaviorSubject<boolean>(false);
    loading$ = this._loading$.asObservable();
    private activeRequests = 0;

    show() {
        this.activeRequests++;
        this._loading$.next(true);
    }

    hide() {
        this.activeRequests--;
        if (this.activeRequests <= 0) {
            this.activeRequests = 0;
            this._loading$.next(false);
        }
    }
}
