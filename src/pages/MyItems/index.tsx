import React,{useContext} from "react";
import { useNavigation } from "@react-navigation/native";
import { Text,View,TouchableOpacity, StyleSheet } from "react-native";


export default function MyItems(){
    const navigation = useNavigation();
    return(
     <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Text>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.Text}>Tela de MyItems</Text>
     </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center' 
    },
    Text:{
        
    }
})