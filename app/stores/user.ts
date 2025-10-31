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

    async updateUserByProviderId(
      authProviderId: string,
      updates: Partial<UserInterface>,
    ) {
      const db = useFirestore();
      const q = query(
        collection(db, 'users'),
        where('authProviderId', '==', authProviderId),
      );
      const querySnapshot = await getDocs(q);
      const userDoc = querySnapshot.docs[0];
      if (!userDoc) return;
      const userDocRef = doc(db, 'users', userDoc.id);
      await updateDoc(userDocRef, updates);
    },

    async deleteUserByProviderId(authProviderId: string) {
      const db = useFirestore();
      const q = query(
        collection(db, 'users'),
        where('authProviderId', '==', authProviderId),
      );
      const querySnapshot = await getDocs(q);
      const userDoc = querySnapshot.docs[0];
      if (!userDoc) return;
      const userDocRef = doc(db, 'users', userDoc.id);
      await deleteDoc(userDocRef);
    },

    async userExists(authProviderId: string): Promise<boolean> {
      const db = useFirestore();
      const q = query(
        collection(db, 'users'),
        where('authProviderId', '==', authProviderId),
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    },

    fetchUser(providerId: string) {
      const db = useFirestore();

      const q = query(
        collection(db, 'users'),
        where('authProviderId', '==', providerId),
      );

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
