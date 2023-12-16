import React,{useContext, useEffect, useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { Text,View,TouchableOpacity, StyleSheet ,Modal,Image,Button} from "react-native";
import { TextInput } from "react-native-paper";
import { api } from "../../services/api";
import * as ImagePicker from 'expo-image-picker'
import { AuthContext } from "../../contexts/AuthContext";



export default function PublishAnItem(){

  const {SignOut} = useContext(AuthContext)

    const navigation = useNavigation();

    const [title,setTitle] = useState('');
    const [location,setLocation] = useState('');
    const [description,setDescription] = useState('');
    const [phone,setPhone] = useState('');
   
    function handleLogout(){
      SignOut();
      navigation.navigate('SignOut');
    } 


    async function handleSavePublish() {
        if(title === "" || location === "" || description === "" || phone === "" ){
           return;
        }

        const itemData = {
          title:title,
          description:description,
          phone:phone,
          location:location,
        }

        try{
            await api.post('/item',itemData);

        }catch(err){
            console.log("Erro Ao Publicar",err);
        }
    }



    return(
     
     <View style={styles.container}>
       <Text>Publicar Um Item</Text>
      <Button title="Logout" onPress={handleLogout} />
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Text>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
        <TextInput 
      placeholder="Digite o Titulo do Item" 
      style={styles.input}
      value={title}
      onChangeText={setTitle}
       placeholderTextColor="black"
         />

<TextInput 
      placeholder="Localizacao Onde Encontrou Item" 
      style={styles.input}
      value={location}
      onChangeText={setLocation}
       placeholderTextColor="black"
         />

<TextInput 
      placeholder="Digite o Seu Numero de Telemovel" 
      style={styles.input}
      value={phone}
      onChangeText={setPhone}
       placeholderTextColor="black"
         />

<TextInput 
      placeholder="Adicone uma Descricao do Item" 
      style={styles.input}
      value={description}
      onChangeText={setDescription}
       placeholderTextColor="black"
         />

     <TouchableOpacity style={styles.button} onPress={handleSavePublish} >   
            <Text style={styles.buttonText}>Publicar Item</Text>
      </TouchableOpacity>
        </View>
     </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
        },
    input:{
        width:'95%',
        height:40,
        borderColor:'black',
        backgroundColor:'white',
        borderStyle:'solid',
        borderRadius:4,
        marginBottom:12,
        paddingHorizontal:8,
        color:'black',
        borderWidth:1,
       },
       inputContainer:{
        width:'95%',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:32,
        paddingHorizontal:14
      },
      button:{
        width:'95%',
        height:40,
        backgroundColor:'#FF3838',
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
        margin:12
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
        color:'black'
    },
 
})