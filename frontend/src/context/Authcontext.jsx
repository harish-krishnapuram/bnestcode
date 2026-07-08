import { createContext, useState,useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(
        localStorage.getItem("access")
    );

    const login = (tokens) => {
        localStorage.setItem(
            "access",
            tokens.access
        );

        localStorage.setItem(
            "refresh",
            tokens.refresh
        );

        setUser(tokens.access);
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);