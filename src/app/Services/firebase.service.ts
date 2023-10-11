import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Firestore, query, collectionData} from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { uploadBytes } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  databaseName: string = 'ngappdating'

  constructor(
    private readonly _fireStore: Firestore,
    private readonly _storage: Storage,
  ) { }


  // loadData(){
  //   const refCollection = collection(this._fireStore, this.databaseName);
  //   const q = query(refCollection);
  //   const data = collectionData(q, {idField:'id'});
  //   return data;
  // }

   async addDataUser(data:any , userid: any){

     const docRef = doc(this._fireStore,'user' + '/' + userid);
     await setDoc(docRef, data)

   }
     async addDataUserLike(data:any , userid: any){

     const docRef = doc(this._fireStore, 'userlike' + '/' + userid);
     await setDoc(docRef, data)
   }


   async upload(file: File){

     const fileRef = ref(
       this._storage,
       `ngappdating/${Date.now()}/${file.name}`
       );
       const uploadTask = await uploadBytes(fileRef, file);
       console.log(file);
     const url = await getDownloadURL(uploadTask.ref);
     console.log(url);

   }
}


