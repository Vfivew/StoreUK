import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const addGoodsType = async (inputValue: string) => {
    try {
        const goodsDocRef = doc(db, 'GoodsUK', inputValue);
        const docSnap = await getDoc(goodsDocRef);
        if (docSnap.exists()) {
            throw new Error('Item already exists');
        } else {
            await setDoc(goodsDocRef, {});
            window.location.reload(); 
            return { data: 'Item added successfully' };
        }
    } catch (error) {
        return { error };
    }
};
