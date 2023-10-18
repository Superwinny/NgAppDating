import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Firestore, query, collectionData} from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { collection, doc, setDoc, where, addDoc, getDoc} from 'firebase/firestore';
import { uploadBytes } from 'firebase/storage';
import { Camera, CameraResultType } from '@capacitor/camera';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  imageUrl!: string ;
  databaseName: string = 'ngappdating'

  constructor(
    private readonly _fireStore: Firestore,
    private readonly _storage: Storage,
    private readonly _auth: AuthService,
  ) { }

  UserArrayLike(id: string){
    const refCollection = collection(this._fireStore, 'userlike');
    const q = query(refCollection, where('id', '==', id));
    const data = collectionData(q, { idField: 'id' });
    return data as any;
  }
  loadUserToLike(){
    const refCollection = collection(this._fireStore, 'user');
    const q = query(refCollection, where('isConnected', '==', true));
    const data = collectionData(q, { idField: 'id' });
    return data as any;

  }

   async addDataUser(data:any , userid: any){

     const docRef = doc(this._fireStore,'user' + '/' + userid);
     await setDoc(docRef, data)

   }
   async  addDataUserLike(data: any, userid: any) {
    const userLikeCollection = collection(this._fireStore, 'userlike' + userid);
    await addDoc(userLikeCollection, data);
}

async  takePicture(){
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });
  if(image.webPath){
    this.imageUrl = image.webPath;
    return this.imageUrl

  }else{
    throw new Error('take picture fail.')
  }
};

  private async  _upload(file: File | Blob ){

     const fileRef = ref(
       this._storage,
       `ngappdating/${Date.now()}/${file.name}`
       );
       const uploadTask = await uploadBytes(fileRef, file);
       console.log(file);
      const url = await getDownloadURL(uploadTask.ref);
       console.log(url);

      return url;

   }


   async takePictureAndUpload() {
    try {
      const blobUrl = await this.takePicture();
      const blob = await fetch(blobUrl).then((r) => r.blob());
      const url = await this._upload(blob);
      console.log('Image URL:', url); // Vérifiez l'URL de l'image
      return url; // Retournez l'URL de l'image pour l'utiliser ultérieurement
    } catch (error) {
      console.error('Erreur lors de la prise de la photo et de son téléchargement :', error);
      throw error; // Propagez l'erreur pour qu'elle puisse être gérée dans le composant
    }
  }
  // async getProfileImageURL(): Promise<string[]> {
  //   const user = (await firstValueFrom(this._auth.currentUser)) as User;
  //   if (!user) {
  //     throw new Error('User is not logged in.');
  //   }

  //   const userProfileDoc = doc(this._fireStore, 'user', user.uid);
  //   const userProfileData = await getDoc(userProfileDoc);

  //   if (userProfileData.exists()) {
  //     const userData = userProfileData.data() as any;
  //     return userData.photo || [];
  //   } else {
  //     throw new Error('User profile does not exist.');
  //   }
  // }
}



