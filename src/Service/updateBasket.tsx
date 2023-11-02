import { db } from '../firebase';
import { doc, setDoc, updateDoc,getDoc, deleteField } from 'firebase/firestore';

interface Item {
  [key: string]: any;
}

interface UpdateBasketParams {
  quantity: number;
  item: Item;
  itemId: string | undefined;
  email: string;
}

interface DeleteBasketItemParams {
  article: string;
  email: string;
}

export const updateBasket = async ({ quantity, item, itemId, email }: UpdateBasketParams) => {
  const docRef = doc(db, 'UserBasketUK', email);

  const article = item.article;

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        [article]: [quantity,item, itemId]
      });
    } else {
      await setDoc(docRef, {
        [article]: [quantity,item, itemId]
      });
    }

    console.log(`Document with ID ${email} successfully updated.`);
  } catch (error) {
    console.error(`Error updating document: ${error}`);
  }
};

export const deleteBasketItem = async ({ article, email }: DeleteBasketItemParams) => {
  const docRef = doc(db, 'UserBasket', email);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      delete data[article];
      await setDoc(docRef, data);
      console.log(`Data with article ${article} has been successfully deleted from document with ID ${email}.`);
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error(`Error deleting data: ${error}`);
  }
};
