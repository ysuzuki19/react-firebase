# react-firebase

[![npm](https://img.shields.io/npm/v/@ysuzuki19/react-firebase?label=%40ysuzuki19%2Freact-firebase)](https://www.npmjs.com/package/@ysuzuki19/react-firebase)

react hooks library for Firebase SDK.

# install

```bash
npm i firebase @ysuzuki19/react-firebase
```

# How to Use

## set Provider

```tsx
import { FirebaseProvider } from '@ysuzuki19/react-firebase';
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

// see https://firebase.google.com/docs/web/setup
export const firebaseConfig = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  projectId: '<your-project-id>',
  storageBucket: '<your-bucket>',
  messagingSenderId: '<your-messaging-sender-id>',
  appId: '<your-app-id>',
};

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
  <React.StrictMode>
    <FirebaseProvider config={firebaseConfig}>
      <App />
    </FirebaseProvider>
  </React.StrictMode>
);

reportWebVitals();
```

## Use with hooks

After the set provider.

you can use `useFirebase()` in your react componend.

```tsx
function App() {
  const { auth, firestore } = useFirebase();

  /** your process */

  return <p>hoge</p>;
}
```

Currently, `react-firebase` only support following modules.

| hook           | returned                          |
| -------------- | --------------------------------- |
| useFirebase()  | all supported modules(with named) |
| useApp()       | FirebaseApp                       |
| useAuth()      | Auth                              |
| useFirestore() | Firestore                         |

## Switch to emulator in dev (advanced)

```tsx
import { FirebaseProvider } from '@ysuzuki19/react-firebase';
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

export const firebaseConfig = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  projectId: '<your-project-id>',
  storageBucket: '<your-bucket>',
  messagingSenderId: '<your-messaging-sender-id>',
  appId: '<your-app-id>',
};

export const emulatorsConfig = {
  firestore: { host: 'localhost', port: 8080 },
  auth: { url: 'http://localhost:9099' },
};

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
  <React.StrictMode>
    <FirebaseProvider
      config={firebaseConfig}
      emulators={
        process.env.NODE_ENV === 'development' ? emulatorsConfig : undefined
      }
    >
      <App />
    </FirebaseProvider>
  </React.StrictMode>
);

reportWebVitals();
```

## License

MIT
