import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../utilities/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  //
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //sign in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  //observe onAuth state change
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //console.log("Observing Current user: ", currentUser);
      const user = { email: currentUser?.email };
      if (currentUser?.email) {
        axios
          .post("https://product-recommendation-system-server-pied.vercel.app/jwt", user, { withCredentials: true })
          .then((res) => {
            console.log("login token", res.data);
            setLoading(false);
          });
      } else {
        axios
          .post("https://product-recommendation-system-server-pied.vercel.app/jwt/logout", {}, { withCredentials: true })
          .then((res) => {
            console.log("logout", res.data);
            setLoading(false);
          });
      }
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);


  const userInfo = {
    user,
    loading,
    createUser,
    setUser,
    signInUser,
    logOut,
    googleSignIn,
    setLoading
  };
  return (
    <AuthContext.Provider value={userInfo}>
      {loading === "false" ? <span className="loading loading-infinity loading-lg"></span> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
