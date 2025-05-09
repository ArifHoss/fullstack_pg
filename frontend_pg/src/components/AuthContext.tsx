// import {createContext, useState} from "react";
//
// type AuthContextType = {
//     user: { id: number; username: string } | null;
//     isAuthenticated: boolean;
//     login: (username: string, password: string) => Promise<void>;
//     logout: () => void;
// };
//
// export const AuthContext = createContext<AuthContextType | null>(null);
//
// export const AuthProvider = ({children}) => {
//     const [user, setUser] = useState<{ id: number; username: string } | null>(
//         null
//     );
//
//     const login = async (username: string, password: string) => {
//         try {
//             // Simulating a login request
//             const response = await fetch("http://localhost:3001/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({username, password}),
//             });
//             const data = await response.json();
//             setUser(data.user);
//         } catch (error) {
//             console.error("Login failed", error);
//         }
//     };
//
//     const logout = () => {
//         setUser(null);
//     };
//
//     const value = {
//         user,
//         isAuthenticated: !!user,
//         login,
//         logout,
//     };
//
//     return (
//         <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
//     );
// };