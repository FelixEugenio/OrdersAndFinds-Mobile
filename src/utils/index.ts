import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//tipando as telas de navegacao 

export type propsNavigationStack = {
    SignUp:undefined,
    Dashboard:undefined
    FoundAnItem:undefined
    PublishAnItem:undefined
    MyItems:undefined
    Profile:undefined
    SignIn:undefined
    Book:undefined
    Horas:undefined
    Tables:undefined
    FinishBook:undefined
    Reservations:undefined
    
}

export type propsStack = NativeStackNavigationProp<propsNavigationStack>