import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BookInterface } from '../models/book';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { UserInterface } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore) { }
  private booksCollection: AngularFirestoreCollection<BookInterface>;
  private userCollection: AngularFirestoreCollection<UserInterface>;
  private books: Observable<BookInterface[]>;
  private user: Observable<UserInterface[]>;
  private bookDoc: AngularFirestoreDocument<BookInterface>;
  private userDoc: AngularFirestoreDocument<UserInterface>;
  private book: Observable<BookInterface>;
  public selectedBook: BookInterface = {
    id: null
  };
  public selectedUser: UserInterface = {
    id: null
  };

  getAllBooks() {
    this.booksCollection = this.afs.collection<BookInterface>('books');
    return this.books = this.booksCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }


  getAllBooksOffers() {
    this.booksCollection = this.afs.collection('books', ref => ref.where('oferta', '==', '1'));
    return this.books = this.booksCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  getOneBook(idBook: string) {
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    return this.book = this.bookDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as BookInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addBook(book: BookInterface): void {
    this.booksCollection.add(book);
  }
  updateBook(book: BookInterface): void {
    let idBook = book.id;
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    this.bookDoc.update(book);
  }
  deleteBook(idBook: string): void {
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    this.bookDoc.delete();
  }

  addUser(user: UserInterface): void {
    this.userCollection.add(user);
  }
  updateUser(user: UserInterface): void {
    let idUser = user.id;
    this.userDoc = this.afs.doc<UserInterface>(`users/${idUser}`);
    this.userDoc.update(user);
  }
  deleteUser(idUser: string): void {
    this.userDoc = this.afs.doc<UserInterface>(`users/${idUser}`);
    this.userDoc.delete();
  }

  getAllUsers() {
    this.userCollection = this.afs.collection<UserInterface>('users');
    return this.user = this.userCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as UserInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }
}