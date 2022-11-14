import { initializeApp } from "firebase/app";
import { 
    GoogleAuthProvider, 
    getAuth, 
    signInWithPopup, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail, 
    signOut 
} from "firebase/auth";
import { 
    getFirestore, 
    query, 
    getDocs, 
    collection, 
    where, 
    addDoc 
} from "firebase/firestore";

// Config
const firebaseConfig = {
    api_key: process.env.REACT_FIREBASE_API_KEY,
    authDomain: process.env.REACT_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_FIREBASE_MESSAGING_SENDER_ID,
    appId:process.env.REACT_FIREBASE_APP_ID,
}
// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID
// };

// const firebaseConfig = {
//     apiKey: "AIzaSyBKyoLcERo4gvYGD11Qgv1cN0IjXr8SFVM",
//     authDomain: "movies-test-product.firebaseapp.com",
//     projectId: "movies-test-product",
//     storageBucket: "movies-test-product.appspot.com",
//     messagingSenderId: "907193188624",
//     appId: "1:907193188624:web:f51d8c1c94d26301216595"
// };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
        });
        }
        return user;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logInWithEmailAndPassword = async (email, password) => {
    try {
        const req = await signInWithEmailAndPassword(auth, email, password);
        return req;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        });
        return user;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logout = () => {
    signOut(auth);
};
export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    signInWithEmailAndPassword,
};
