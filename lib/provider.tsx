import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Auth, getAuth, connectAuthEmulator } from 'firebase/auth';
import {
  Firestore,
  getFirestore,
  connectFirestoreEmulator,
  EmulatorMockTokenOptions,
} from 'firebase/firestore';
import React from 'react';

export interface Firebase {
  app: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
}

export const FirebaseContext = React.createContext({} as unknown as Firebase);

export interface EmulatorsConfig {
  firestore?: {
    host: string;
    port: number;
    options?: {
      mockUserToken?: string | EmulatorMockTokenOptions;
    };
  };
  auth?: {
    url: string;
    options?: {
      disableWarnings: boolean;
    };
  };
}

interface FirebaseProviderProps {
  children: React.ReactNode;
  config: FirebaseOptions;
  emulators?: EmulatorsConfig;
}

export function FirebaseProvider({
  children,
  config,
  emulators,
}: FirebaseProviderProps): JSX.Element {
  const app = initializeApp(config);
  const firestore = getFirestore(app);
  const auth = getAuth(app);

  if (emulators) {
    if (emulators.firestore) {
      const { host, port, options } = emulators.firestore;
      connectFirestoreEmulator(firestore, host, port, options);
    }
    if (emulators.auth) {
      const { url, options } = emulators.auth;
      connectAuthEmulator(auth, url, options);
    }
  }

  return (
    <FirebaseContext.Provider value={{ app, firestore, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
}
