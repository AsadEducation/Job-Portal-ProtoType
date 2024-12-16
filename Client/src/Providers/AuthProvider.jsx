import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { createContext } from "react";
import { auth } from "../Firebase/firebase.config";
import { useEffect } from "react";
import { setLogLevel } from "firebase/app";

export const AuthContext = createContext(null);



const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const logoutUser =()=>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {

        const mount = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })

        return ()=>{
            mount();
        }

    }, [])


    const info = {

        user,
        setUser,
        loading,
        createUser,
        loginUser,
        logoutUser,
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;