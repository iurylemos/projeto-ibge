import React, { createContext, useState } from "react";

interface IAuth {
    nome: string;
    dt_nascimento: string;
    cpf: string;
    municipio: string;
    createdAt: string;
    updatedAt: string;
    getAuth: boolean;
}

interface IAuthContext {
    auth: IAuth;
    setAuth: (state: IAuth) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [auth, setAuth] = useState({ nome: "", dt_nascimento: "", cpf: "", municipio: "", createdAt: "", updatedAt: "", getAuth: false });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
