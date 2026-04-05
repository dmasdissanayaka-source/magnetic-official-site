import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD-lRAP6rFLJarWOrJve8Mn3wkwzUl-9ZE",
  authDomain: "magnetic-ads-official-f1a52.firebaseapp.com",
  projectId: "magnetic-ads-official-f1a52",
  storageBucket: "magnetic-ads-official-f1a52.firebasestorage.app",
  messagingSenderId: "16387175858",
  appId: "1:16387175858:web:f950fbae7a48c6c92ee0ab",
  measurementId: "G-N5XRHZ8J8D"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };