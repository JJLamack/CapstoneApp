import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private afs: AngularFirestore) {}

  /**
   * @param path designates which collection to pull the list from
   * @param query optional parameter
   *
   * .collection method references the data in firestore
   * .snapshotChanges returns the data as an Observable
   * .pipe sends the Observable to a different function in this case maps
   * pushes observable into a map function to put the id and the data into one observable
   */
  collection$(path, query?) {
    return this.afs
      .collection(path, query)
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data: Object = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  doc$(path: string): Observable<any> {
    return this.afs
      .doc(path)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }

  /**
   * @param path 'collection' or 'collection/docID'
   * @param data new data to be added to
   *
   * Creates or updates data on a collection or document
   * merge in else is for if a doc/{id} exists it will combine the old and the new
   */
  updateAt(path: string, data: Object): Promise<any> {
    const segments = path.split('/').filter(v => v);
    if (segments.length % 2) {
      // Odd is always a collection
      return this.afs.collection(path).add(data);
    } else {
      // Even is always a document
      return this.afs.doc(path).set(data, { merge: true });
    }
  }

  /**
   *
   * @param path path to document
   *
   * Deletes document from firestore
   */
  delete(path) {
    return this.afs.doc(path).delete();
  }
}
