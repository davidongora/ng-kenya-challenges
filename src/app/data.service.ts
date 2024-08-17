import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, takeUntil, map } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private destroy$ = new Subject<void>();
  private characters$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }


  getCharacters(): Observable<any[]> {
    return this.http.get('https://rickandmortyapi.com/api/character')
      .pipe(
        catchError(this.handleError),
        takeUntil(this.destroy$),
        map(response => response[0].results.slice(0, 20))
      );
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return of([]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}