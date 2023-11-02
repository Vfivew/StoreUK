import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

import {GoodsItem, GoodsKind} from '../../models/fireStoreModels'

export const firebaseApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Document"],
  endpoints: (builder) => ({
    fetchDocuments: builder.query({
      async queryFn() {
        try {
          const goodsCollectionRef = collection(db, "GoodsUK");
          const querySnapshot = await getDocs(goodsCollectionRef);
          const goodsData: GoodsItem[] = [];
          querySnapshot.forEach((doc) => {
            goodsData.push({
              id: doc.id,
            });
          });

          return { data: goodsData };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Document"],
    }),
    fetchBasket: builder.query({
      async queryFn(email) {
        if (email) {
          try {
            const docRef = doc(db, 'UserBasketUK', email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const basketData: any = docSnap.data();
              return { data: basketData };
            } else {
              console.log('No such document!');
              return { data: null };
            }
          } catch (error) {
            console.error('Error getting document:', error);
            return { error };
          }
        } else {
          console.log('Email is not valid!');
          return { data: null };
        }
      },
      providesTags: ["Document"],
    }),
    fetchDocumentById: builder.query({
      async queryFn(itemId) {
        try {
          const goodsDocRef = doc(db, "GoodsUK", itemId);
          const goodsDocSnapshot = await getDoc(goodsDocRef);

          if (goodsDocSnapshot.exists()) {
            const itemData = goodsDocSnapshot.data() as GoodsKind;
            console.log(itemData)
            return { data: itemData };
          } else {
            return { data: null };
          }
        } catch (error) {
          return { error };
        }
      },
    }),
    fetchDocumentDiscountGoods: builder.query({
      async queryFn(itemId) {
        try {
          const goodsDocRef = doc(db, "DiscountGoodsUK", itemId);
          const goodsDocSnapshot = await getDoc(goodsDocRef);

          if (goodsDocSnapshot.exists()) {
            const itemData = goodsDocSnapshot.data() as GoodsKind;
            return { data: itemData };
          } else {
            return { data: null };
          }
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useFetchDocumentsQuery,useFetchBasketQuery, useFetchDocumentByIdQuery, useFetchDocumentDiscountGoodsQuery } = firebaseApi;
