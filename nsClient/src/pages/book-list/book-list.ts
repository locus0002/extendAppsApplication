import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { BookProvider } from '../../providers/book/book';
import { BookInterface } from '../../shared/interfaces/book.interface';
import { BookCreatePage } from '../book-create/book-create';
import { BookDetailPage } from '../book-detail/book-detail';

/**
 * Generated class for the BookListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage implements OnDestroy {
  private bookSubscription: Subscription;
  books: Array<BookInterface> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public bookService: BookProvider) {

      this.setSubscriptions();
      this.fetchBooks();
  }
  
  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookListPage');
  }

  createBook() {
    this.navCtrl.push(BookCreatePage, { mode: 'create' });
  }

  editBook(index: number) {
    this.navCtrl.push(BookCreatePage, { currentBook: this.books[index], mode: 'edit' });
  }

  fetchBooks() {
    const loader = this.loadingCtrl.create({
      content: 'downloading...'
    });
    loader.present().then(() => {
      this.bookService.getBooks()
      .subscribe(() => {
        loader.dismiss();
        this.showToast('All books have been downloaded');
      }, error => {
        loader.dismiss();
        this.alertCtrl.create({
          title: 'Error',
          message: JSON.stringify(error),
          buttons: ['Aceptar']
        }).present();
        console.log(JSON.stringify(error));
      });
    });
  }

  showMenu(index: number) {
    const menu = this.actionSheetCtrl.create({
      title: 'Select an option...',
      buttons: [
        {
          text: 'View information',
          handler: () => {
            this.showModal(index);
          }
        },
        {
          text: 'Edit',
          handler: () => {
            this.editBook(index);
          }
        }
      ]
    });
    menu.present();
  }

  setSubscriptions() {
    this.bookSubscription = this.bookService.latestBooks.subscribe(
      (latestBooks: Array<BookInterface>) => {
        console.log('The subscriber has noticed a change');
        this.books = latestBooks;
      }
    );
  }

  showToast(message: string) {
    const newToast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    newToast.present();
  }

  showModal(index: number) {
    const modal = this.modalCtrl.create(BookDetailPage, { currentBook: this.books[index] });
    modal.present();
  }

}
