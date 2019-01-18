import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { Client } from '../models/Client';




@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;
  

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients2', ref => {
      return ref.orderBy('lastName', 'asc')
    })
    } 
    
   

   getClients(): Observable<Client[]> {
    this.clients = this.clientsCollection.snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.clients
  }

  newClient(client: Client){
    this.clientsCollection.add(client);
  }

  getClient(id: string): Observable<Client> {
    this.clientDoc = this.afs.doc<Client>(`clients2/${id}`);
    this.client = this.clientDoc.snapshotChanges()
      .pipe(
        map(action => {
          if(action.payload.exists === false ){
            return null;
          } else {
            const data = action.payload.data() as Client;
            data.id = action.payload.id; 
            return data;
          }
        })
      )
      return this.client;
  }

  updateClient(client: Client){
    this.clientDoc = this.afs.doc(`clients2/${client.id}`);
    this.clientDoc.update(client)
  }

  deleteClient(client: Client){
    this.clientDoc = this.afs.doc(`clients2/${client.id}`);
    this.clientDoc.delete()
  }
  
}   
