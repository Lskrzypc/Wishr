import { defineStore } from 'pinia';
import type { UserInterface } from '~~/shared/types/user';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import type { QuerySnapshot, DocumentData } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

export const useUserStore = defineStore('user', {
  state: (): { user: UserInterface | undefined } => ({
    user: undefined,
  }),
  actions: {
    async addUser(user: UserInterface) {
      const db = useFirestore();
      const docRef = await addDoc(collection(db, 'users'), user);
      this.user = { id: docRef.id, ...user };
    },

    async updateUserByUserId(userId: string, updates: Partial<UserInterface>) {
      const db = useFirestore();
      const q = query(collection(db, 'users'), where('id', '==', userId));
      const querySnapshot = await getDocs(q);
      const userDoc = querySnapshot.docs[0];
      if (!userDoc) return;
      const userDocRef = doc(db, 'users', userDoc.id);
      await updateDoc(userDocRef, updates);
    },

    async deleteUserByUserId(userId: string) {
      const db = useFirestore();
      const q = query(collection(db, 'users'), where('id', '==', userId));
      const querySnapshot = await getDocs(q);
      const userDoc = querySnapshot.docs[0];
      if (!userDoc) return;
      const userDocRef = doc(db, 'users', userDoc.id);
      await deleteDoc(userDocRef);
    },

    async userExists(userId: string): Promise<boolean> {
      const db = useFirestore();
      const q = query(collection(db, 'users'), where('id', '==', userId));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    },

    async fetchWishlist(wishlistId: string) {
      const db = useFirestore();

      const q = query(collection(db, 'users'));

      const querySnapshot = await getDocs(q);
      for (const userDoc of querySnapshot.docs) {
        const userData = userDoc.data() as UserInterface;
        const wishlists = userData.wishlists || [];
        const foundWishlist = wishlists.find(
          (wishlist) => wishlist.id === wishlistId,
        );
        if (foundWishlist) {
          return foundWishlist;
        }
      }
      return undefined;
    },

    fetchUser(userId: string) {
      const db = useFirestore();

      const q = query(collection(db, 'users'), where('id', '==', userId));

      onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
        const userDoc = querySnapshot.docs[0];
        if (!userDoc) {
          this.user = {} as UserInterface;
          return;
        }
        this.user = { id: userDoc.id, ...userDoc.data() } as UserInterface;
      });
    },
  },
});
