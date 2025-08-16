import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from './../../Firebase/Firebase.init';
import UseAxisosPublic from '../hooks/UseAxisosPublic';
export let AuthContext = createContext()
const AuthProvider = ({ children }) => {
    let [user, setUser] = useState()
    let [loading, setLoading] = useState(true)

    let googleProvider = new GoogleAuthProvider()

    let createUser = (email, password) => {
        setLoading(false)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    let signIn = (email, password) => {
        setLoading(false)
        return signInWithEmailAndPassword(auth, email, password)
    }
    let googleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    }
    let LogOut = () => {
        setLoading(false)
        return signOut(auth)
    }
    let updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                // Get token and store on client
                const userInfo = { email: currentUser.email };
                UseAxisosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                    });
            } else {
                // Remove token if user is logged out
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        };
    },);

    let authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        LogOut,
        updateUserProfile,

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;