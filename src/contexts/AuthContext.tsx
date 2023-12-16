import React,{useState,createContext, Children, ReactNode,useEffect} from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
    user: UserProps;
    isAuthenticated:boolean;
    SignIn:(credentials:SignInProps) => Promise<void>;
    loadingAuth:boolean;
    loading:boolean
    SignOut:() => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children : ReactNode;
}

type SignInProps = {
    email: string;
    password: string
}

export const AuthContext = createContext({} as AuthContextData);

// crianda o provider 

export function AuthProvider({children}:AuthProviderProps){
const [user,setUser] = useState<UserProps>({
    id:'',
    name:'',
    email:'',
    token:''
})

const [loadingAuth,setLoadingAuth] = useState(false);
const [loading,setLoading] = useState(true);

const isAuthenticated = !!user.name;

useEffect(()=>{
    async function getUser() {
        //pegar os dados salvos no async-storage

        const userInfo = await AsyncStorage.getItem('@OrdersAndFinds');
        //convertendo as informacoes do usuario novamente em objecto
        let hasUser:UserProps = JSON.parse(userInfo || '{}')

        //verificar se estou realmente a receber as informacoes
        if(Object.keys(hasUser).length > 0){
            api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;

            //passando as informacoes do Usuario Pro estado

            setUser({
                id:hasUser.id,
                name:hasUser.name,
                email:hasUser.email,
                token:hasUser.token
            })
        }

        setLoading(false)
    }

    getUser();
},[])

async function SignIn({email,password}:SignInProps) {
   setLoadingAuth(true);

   try{

    const response = await api.post('/session',{
        email,
        password
    })

    const {id , name, token} = response.data;

    //convertendo objecto pra string
    const data = {
        ...response.data
    };

    //salavando token do usuario logado

    await AsyncStorage.setItem('@OrdersAndFinds',JSON.stringify(data))

    //guardando o token 
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setUser({
        id,
        name,
        token,
        email
    })

    setLoadingAuth(false)



    //console.log(response.data)

   }catch(err){
    console.log('Erro ao Acessar',err)
    setLoadingAuth(false)
   }

}

   async function SignOut() {
    await AsyncStorage.clear()
    .then(()=>{
        setUser({
            id:'',
            name:'',
            email:'',
            token:''
        })
    })
   }

    return(
        <AuthContext.Provider value={{user,isAuthenticated,SignIn,loading,loadingAuth,SignOut}}>
         {children}
        </AuthContext.Provider>
    )
}