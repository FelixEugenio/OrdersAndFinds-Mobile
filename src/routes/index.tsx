// o index.ts vai Controlar qual pagina vai exibir pro usuario  
import React ,{useContext}from "react";
import { View,ActivityIndicator } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

function Routes(){
    // verificando se usuario esta autenticado 
    const { isAuthenticated,loading} = useContext(AuthContext);
    // verificando se esta carregando

    if(loading){
        return(
        <View style={{flex:1, backgroundColor:'#F5f7fb',justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={60} color="black" />
        </View>
        )
    }
    return(
     isAuthenticated ? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;
