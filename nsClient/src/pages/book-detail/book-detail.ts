import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { BookInterface } from '../../shared/interfaces/book.interface';

/**
 * Generated class for the BookDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-book-detail',
  templateUrl: 'book-detail.html',
})
export class BookDetailPage {
  currentBook: BookInterface;

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController,
    public navParams: NavParams) {
    this.currentBook = this.navParams.get('currentBook');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookDetailPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
