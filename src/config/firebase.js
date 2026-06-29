import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey:            'AIzaSyAjRDG6b29e_A-k3qpdHaEgI2ITKUwb4Vk',
  authDomain:        'elcasalot-galeria.firebaseapp.com',
  projectId:         'elcasalot-galeria',
  storageBucket:     'elcasalot-galeria.appspot.com',
  messagingSenderId: '860088580514',
  appId:             '1:860088580514:web:9cba5546def22f4adc1afb',
  databaseURL:       'https://elcasalot-galeria-default-rtdb.europe-west1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
