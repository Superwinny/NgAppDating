import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Firestore, query, collectionData} from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { collection, deleteDoc, doc, setDoc, updateDoc,UpdateData,  } from 'firebase/firestore';
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

  UserArrayLike(id: string){
    const refCollection = collection(this._fireStore,'userlike');
    const q = query(refCollection,); // voir la documentation firebase pour la syntax des filtres !!!!!!
    const data = collectionData(q, {idField:'id'});
    return data as any;
  }
  loadUserToLike(){
    const refCollection = collection(this._fireStore,'user');
    const q = query(refCollection,); // voir la documentation firebase pour la syntax des filtres !!!!!!
    const data = collectionData(q, {idField:'id'});
    return data as any;

  }

   async addDataUser(data:any , userid: any){

     const docRef = doc(this._fireStore,'user' + '/' + userid);
     await setDoc(docRef, data)

   }
     async addDataUserLike(data:any , userid: any){

     const docRef = doc(this._fireStore, 'userlike' + '/' + userid);
     await setDoc(docRef, data) // setDoc a changé !!!! voir la doc
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


