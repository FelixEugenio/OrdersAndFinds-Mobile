import React from "react";
import { Text,View,Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export default function SignUp(){
    const navigation = useNavigation();
    return(
     <View>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Text>Voltar</Text>
        </TouchableOpacity>
     </View>
    )
}