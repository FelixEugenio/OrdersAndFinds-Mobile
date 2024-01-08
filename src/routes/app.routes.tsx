import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { propsNavigationStack } from "../utils";

// importando as telas que o usuario logado tera acesso
import DashBoard from "../pages/Dashboard";
import FoundAnItem from "../pages/FoundAnItem";
import PublishAnItem from "../pages/PublishAnItem";
import Profile from "../pages/Profile";
import MyItems from "../pages/MyItems";
import Book from "../pages/Book";
import Horas from "../pages/Horas";
import Tables from "../pages/Tables";
import FinishBook from "../pages/FinishBook";
import Reservations from "../pages/MyBook";

const Stack = createNativeStackNavigator<propsNavigationStack>();

function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen  name="Dashboard" component={DashBoard} options={{headerShown:false}} />
            <Stack.Screen  name="Horas" component={Horas} options={{headerShown:false}} />
            <Stack.Screen  name="PublishAnItem" component={PublishAnItem} options={{headerShown:false}} />
            <Stack.Screen  name="Profile" component={Profile} options={{headerShown:false}} />
            <Stack.Screen  name="MyItems" component={MyItems} options={{headerShown:false}} />
            <Stack.Screen  name="Tables" component={Tables} options={{headerShown:false}} />
            <Stack.Screen  name="Book" component={Book} options={{headerShown:false}} />
            <Stack.Screen  name="FinishBook" component={FinishBook} options={{headerShown:false}} />
            <Stack.Screen  name="Reservations" component={Reservations} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}

export default AppRoutes;