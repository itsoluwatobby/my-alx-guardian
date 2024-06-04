/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { nanoid } from 'nanoid';
import { imageStorage } from './firebaseConfig';

type StorageType = 'category-images' | 'profile-images';
export const imageUpload = (image: File, store: StorageType): Promise<ImageReturnType> => {
  return new Promise((resolve, reject) => {
    const photoName = `${image.name}-${nanoid(5)}`
    const storageRef = ref(imageStorage, `${store}/${photoName}`)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on('state_changed', (snap: any) => {
      void(snap)
    },(error: any) => {
        void(error)
        console.log(error.message)
        reject({ status: "failed", url: '' })
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadUrl: string) => {
          return resolve({status: 'success', url: downloadUrl})
        })
        .catch((error: any) => {
          void(error)
          return reject({status: 'failed', url: ''})
        })
      }
    )
  })
}

export const deleteImage = (image: string, store: StorageType) => {
  if(!image) return;
  const imageName = image?.split('?alt=')[0]?.split(`${store}%2F`)[1]
  return new Promise((resolve, reject) => {
    const deleteRef = ref(imageStorage, `${store}/${imageName}`)
    deleteObject(deleteRef)
    .then(() => resolve('successful'))
    .catch(() => reject('An Error occurred'))
  })
}
