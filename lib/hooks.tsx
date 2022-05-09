import { useContext } from 'react';

import { FirebaseContext } from './provider';

export function useFirebase() {
  return useContext(FirebaseContext);
}

export function useApp() {
  const { app } = useFirebase();
  return app;
}

export function useAuth() {
  const { auth } = useFirebase();
  return auth;
}

export function useFirestore() {
  const { firestore } = useFirebase();
  return firestore;
}
