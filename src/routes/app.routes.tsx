import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { propsNavigationStack } from "../utils";

// importando as telas que o usuario logado tera acesso
import DashBoard from "../pages/Dashboard";
import FoundAnItem from "../pages/FoundAnItem";
import PublishAnItem from "../pages/PublishAnItem";
import Profile from "../pages/Profile";
import MyItems from "../pages/MyItems";


const Stack = createNativeStackNavigator<propsNavigationStack>();

function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen  name="Dashboard" component={DashBoard} options={{headerShown:false}} />
            <Stack.Screen  name="FoundAnItem" component={FoundAnItem} options={{headerShown:false}} />
            <Stack.Screen  name="PublishAnItem" component={PublishAnItem} options={{headerShown:false}} />
            <Stack.Screen  name="Profile" component={Profile} options={{headerShown:false}} />
            <Stack.Screen  name="MyItems" component={MyItems} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}

export default AppRoutes;