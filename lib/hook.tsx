import { useContext } from 'react';

import { FirebaseContext } from './provider';

export default function useFirebase() {
  return useContext(FirebaseContext);
}
