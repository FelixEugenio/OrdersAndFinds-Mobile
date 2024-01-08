import React,{useContext} from "react";
import { useNavigation } from "@react-navigation/native";
import { Text,View,TouchableOpacity, StyleSheet } from "react-native";


export default function FoundAnItem(){
    const navigation = useNavigation();
    return(
     <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Text></Text>
        </TouchableOpacity>

        <Text style={styles.Text}>Tela de FoundAnItem</Text>
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