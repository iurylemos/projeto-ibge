import React, { createContext, useEffect, useState } from "react";

interface IAuth {
    nome: string;
    data_nascimento: string;
    cpf: string;
    municipio: string;
    vacinado: boolean;
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
    const [auth, setAuthetication] = useState<IAuth>({ nome: "", data_nascimento: "", cpf: "", municipio: "", vacinado: false, createdAt: "", updatedAt: "", getAuth: false });

    useEffect(() => {
        const storagedUser = localStorage.getItem('@App:user');

        if (storagedUser) {
            setAuthetication(JSON.parse(storagedUser));
        }
    }, []);

    function setAuth(user: IAuth): void {
        localStorage.setItem('@App:user', JSON.stringify(user));
        setAuthetication(user);
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
