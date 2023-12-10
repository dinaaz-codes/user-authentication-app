import { ReactNode, createContext, useState } from "react";
interface AuthProviderProps {
  children: ReactNode;
}

export interface UserAuthData {
  accessToken: string | null;
}

export interface AuthContextType {
  auth: UserAuthData;
  setAuth: React.Dispatch<React.SetStateAction<UserAuthData>>;
}

const initialValue: AuthContextType = {
  auth: {
    accessToken: null,
  },
  setAuth: () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<UserAuthData>(initialValue.auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
