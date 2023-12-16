import React ,{useState,useContext} from "react";
import { StyleSheet, Text,View,Image,TextInput,TouchableOpacity,ActivityIndicator } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

export default function SignIn(){

  const {SignIn,loadingAuth} = useContext(AuthContext);

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

   async function handleLogin(){
        if(email === "" || password === ""){
          return;
        }

        await SignIn({
          email,
          password
        })
    }

    return( 
     <View style={styles.container}>
        <Image 
         style={styles.logo}
         source={require('../../assets/logo.png')}
        />

        <Text style={styles.buttonText}>Perdidos e Achados</Text>

     <View style={styles.inputContainer}>
      <TextInput
       placeholder="Digite o Teu Email" 
       style={styles.input}
        placeholderTextColor="black"
        value={email}
        onChangeText={setEmail}
        />
        

      <TextInput 
      placeholder="Digite a Tua Senha" 
      style={styles.input}
       placeholderTextColor="black"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
         />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {
          loadingAuth ? (
            <ActivityIndicator size={25} color="#FF3838" />
          ) : (
            <Text style={styles.buttonText}>Acessar</Text>
          )}

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
    logo:{
      marginBottom:18
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
        alignItems:'center'
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
        color:'black'
    }
})