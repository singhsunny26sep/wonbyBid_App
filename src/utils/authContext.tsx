import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState, ReactNode } from 'react';


interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    authenticated: boolean;
    userId: string | null
}

interface UserInfo {
    userUniqueId: string | null;
    userId: string | null;
    userName: string | null;
    userMobile: number | null;
    useEmail: string | null;
    profile: string | null;
}

interface AuthContextType {
    authState: AuthState;
    userInfo: UserInfo;
    getAccessToken: () => string | null;
    setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
    logout: () => Promise<void>;
    saveAddressLocal: string | null;
    setSaveAddressLocal: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);
const { Provider } = AuthContext;

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
        userId: null
    });

    const [userInfo, setUserInfo] = useState<UserInfo>({
        userUniqueId: null,
        userId: null,
        userName: null,
        userMobile: null,
        useEmail: null,
        profile: null,
    });

    const [saveAddressLocal, setSaveAddressLocal] = useState<string | any>(null);

    // console.log("authState: ", authState);

    // load address
    useEffect(() => {
        const loadAddressLocal = async () => {
            try {
                const savedLocalAddress = await AsyncStorage.getItem('userLocalAddress');
                if (savedLocalAddress !== null) {
                    setSaveAddressLocal(savedLocalAddress);
                }
            } catch (error) {
                console.error('Error loading Address Local:', error);
            }
        };

        loadAddressLocal();
    }, []);

    const getLocalVar = async () => {
        const token = await AsyncStorage.getItem("authState")
        const userLocalAddress = await AsyncStorage.getItem("userLocalAddress")
        const userInfo = await AsyncStorage.getItem("userInfo")
        setAuthState({
            accessToken: token,
            refreshToken: token,
            authenticated: false,
            userId: userInfo?.userId
        })

        // console.log("token: ", token);
        // console.log("userLocalAddress: ", userLocalAddress);
        // console.log("userInfo: ", userInfo);
    }

    useEffect(() => {
        getLocalVar()
        const saveLocalAddress = async () => {
            try {
                if (saveAddressLocal !== null && saveAddressLocal !== undefined) {
                    await AsyncStorage.setItem('userLocalAddress', saveAddressLocal);
                } else {
                    await AsyncStorage.removeItem('userLocalAddress');
                }
            } catch (error) {
                console.error('Error saving local Address:', error);
            }
        };

        saveLocalAddress();
    }, [saveAddressLocal]);


    const logout = async () => {
        setAuthState({
            accessToken: null,
            refreshToken: null,
            authenticated: false,
            userId: null
        });

        setUserInfo({
            userUniqueId: null,
            userId: null,
            userName: null,
            userMobile: null,
            useEmail: null,
            profile: null,
        });

        try {
            await AsyncStorage.removeItem('authState');
            await AsyncStorage.removeItem('userInfo');
        } catch (error) {
            console.error('Error removing auth state or user info on logout:', error);
        }
    };

    const getAccessToken = () => {
        return authState.accessToken;
    };

    return (
        <Provider value={{ authState, userInfo, getAccessToken, setAuthState, setUserInfo, logout, saveAddressLocal, setSaveAddressLocal }}>
            {children}
        </Provider>
    );
};

export { AuthContext, AuthProvider };