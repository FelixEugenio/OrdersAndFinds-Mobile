import React ,{useState,useContext} from "react";
import { StyleSheet, Text,View,Image,TextInput,TouchableOpacity,ActivityIndicator } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";


export default function SignIn(){

  const navigation = useNavigation()
  const {SignIn,loadingAuth} = useContext(AuthContext);

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
   

   function handleSigUp(){
    navigation.navigate('SignUp')
   }

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
         source={require('../../assets/mesa.png')}
        />

        <Text style={styles.buttonText}>EasyMealReservation</Text>

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
            <Text style={styles.buttonText}>Entrar</Text>
          )}

      </TouchableOpacity>
      
     </View>
     <Text style={styles.buttonText} onPress={handleSigUp}>Crie uma conta. Clicando aqui</Text>
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
      marginBottom:18,
      width:80,
      height:80
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