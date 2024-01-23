import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
  } from "react";

export type User = {
  id: string;
  email: string | undefined;
  created_at: string;
  updated_at: string | undefined;
};

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};


  type AppContextProps = {
    user: User | null;
    setUser: (user: User | null) => void;
  };
  
  const AppContext = createContext<AppContextProps | undefined>(undefined);
  
  type AppProviderProps = {
    children: ReactNode;
  };
  
  export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const contextValue: AppContextProps = {
        user,
        setUser,
      };

    return (
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    );
  };
  
  export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
  };
  