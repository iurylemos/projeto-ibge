import React, { useState, useContext } from "react";
import { AuthContext } from "../context/user-provider";

interface Props {
    // setAuth: Function;
}

const Login: React.FC<Props> = () => {
    const context = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(context);
        console.log("email", email);
        console.log("password", password);

        context?.setAuth({
            nome: "",
            dt_nascimento: "",
            cpf: "",
            createdAt: "",
            updatedAt: "",
            municipio: "",
            getAuth: true
        });
    };

    return (
        <>
            <h1>Login</h1>
            <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.currentTarget.value)}
                value={email}
                placeholder="Enter Email"
            />
            <br />
            <br />
            <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.currentTarget.value)}
                value={password}
                placeholder="Enter Password"
            />
            <br />
            <br />
            <button type="submit" onClick={handleLogin}>
                Submit
            </button>
        </>
    );
};

export default Login;
