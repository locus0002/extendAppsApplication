import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookInterface } from '../../shared/interfaces/book.interface';
import * as Constants from '../../shared/constants';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { BookModel } from '../../shared/models/book.model';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the BookProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookProvider {
  currentBooks: Array<BookInterface>;
  latestBooks = new Subject<Array<BookInterface>>();

  constructor(
    public http: HttpClient) {
    console.log('Hello BookProvider Provider');
  }

  handleError() {
    return (error: HttpErrorResponse): Observable<BookInterface[]> => {
      console.log(JSON.stringify(error));
      console.log('message: ' + error.url);
      console.log('message: ' + error.message);
      console.log('status: ' + error.status);
      console.log('status text: ' + error.statusText);
      console.log('error: ' + JSON.stringify(error.error));
      return Observable.create(observer => { observer.next([]); observer.complete(); });
    }
  }

  getBooks(): Observable<BookInterface[]> {
    return this.http.get<BookInterface[]>(
      Constants.URL_MIDDLE + '/books',
      Constants.HEADERS
    )
      .pipe(
        catchError(this.handleError()),
        tap( response => {
          //TODO: store the books received
          this.currentBooks = response;
          this.latestBooks.next(this.currentBooks.slice());
          console.log('Books: ' + response.length);
        })
      );
  }

  getBook(bookId: number): Observable<BookInterface> {
    return this.http.get<BookInterface>(
      Constants.URL_MIDDLE + '/book?id=' + bookId,
      Constants.HEADERS
    )
      .pipe(
        tap( response => {
          //TODO: store the books received
          console.log('Book: ' + JSON.stringify(response));
        })
      );
  }

  replaceBook(updatedBook: BookModel) {
    const index = this.currentBooks.findIndex(bookElmnt => {
      return bookElmnt.id == updatedBook.id
    });
    if (index > -1) {
      this.currentBooks[index] = updatedBook.toBookInterface();
      this.latestBooks.next(this.currentBooks.slice());
    }
  }

  saveUpdateBook(book: BookModel, method: string): Observable<number> {
    if (method == 'post') {
      return this.updateBook(book);
    } else {
      return this.saveBook(book);
    }
  }

  saveBook(book: BookModel): Observable<number> {
    return this.http.put<number>(
      Constants.URL_MIDDLE + '/createbook',
      book,
      Constants.HEADERS
    )
      .pipe(
        tap( (response: number) => {
          //TODO: store the new book or update it
          book.id = response;
          this.currentBooks.push(book.toBookInterface());
          this.latestBooks.next(this.currentBooks.slice());
          return response;
        })
      );
  }

  updateBook(book: BookModel): Observable<number> {
    return this.http.post<number>(
      Constants.URL_MIDDLE + '/updatebook',
      book,
      Constants.HEADERS
    )
      .pipe(
        tap( (response: number) => {
          //TODO: store the new book or update it
          this.replaceBook(book);
          return response;
        })
      );
  }

}
