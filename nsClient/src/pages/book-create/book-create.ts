import { Component} from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { BookProvider } from '../../providers/book/book';
import { BookInterface } from '../../shared/interfaces/book.interface';
import { BookModel } from '../../shared/models/book.model';

/**
 * Generated class for the BookCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-book-create',
  templateUrl: 'book-create.html',
})
export class BookCreatePage {
  mode: string;
  currentBook: BookInterface;
  title: string;
  author: string;
  year: number;
  editorial: string;
  numberPages: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public bookService: BookProvider) {
    this.mode = this.navParams.get('mode');
    this.setDefaultValues();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookCreatePage');
  }

  setDefaultValues() {
    if (this.mode == 'edit') {
      this.currentBook = this.navParams.get('currentBook');
      this.title = this.currentBook.title;
      this.year = this.currentBook.year;
      this.author = this.currentBook.author;
      this.editorial = this.currentBook.editorial;
      this.numberPages = this.currentBook.number_pages;
    }
  }

  save() {
    let method = 'put';
    const loader = this.loadingCtrl.create({
      content: 'sending ...'
    });
    const newBook: BookModel = new BookModel(
      this.title,
      this.author,
      this.year,
      this.editorial,
      this.numberPages
    );
    if (this.mode == 'edit') {
      newBook.id = this.currentBook.id;
      method = 'post';
    }
    loader.present().then(() => {
      this.bookService.saveUpdateBook(newBook, method)
      .subscribe(id => {
        loader.dismiss();
        this.navCtrl.pop();
      }, error => {
        //TODO: show an alert message
        console.log(JSON.stringify(error));
        loader.dismiss();
      });
    });

  }

}
