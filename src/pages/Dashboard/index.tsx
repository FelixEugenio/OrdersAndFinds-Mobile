import React,{useContext} from "react";
import { Text,View,SafeAreaView,TouchableOpacity, StyleSheet,Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../utils";
import { AuthContext } from "../../contexts/AuthContext";

export default function DashBoard(){

  const navigation = useNavigation<propsStack>();
  const { SignOut } = useContext(AuthContext);
  const handleLogout = () => {
    SignOut();
  };
    return(
        <View style={styles.container}>
          <Text style={styles.title} onPress={handleLogout}>Sair</Text>
        <View style={styles.buttonPair}>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Book')}>
            <Image 
            source={require('../../assets/reserva.png')}
            style={styles.Image}
            />
            <Text style={styles.Text}>Reservar</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Horas')}>
            
            <Image 
            source={require('../../assets/cardapio.png')}
            style={styles.Image}
            />
            <Text style={styles.Text}>Menu</Text>
          </TouchableOpacity>
        </View> 
  
        <View style={styles.buttonPair}>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Reservations')}>
          <Image 
            source={require('../../assets/book.png')}
            style={styles.Image}
            />
            <Text style={styles.Text}>Minhas Rservas</Text>
            
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Profile')}>
          <Image 
            source={require('../../assets/cara.png')}
            style={styles.Image}
            />
           <Text style={styles.Text}>Meu Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonPair: {
        flexDirection: 'row',
        marginBottom: 10, // Espaçamento vertical entre os pares
      },
      button: {
        backgroundColor: '#DADEDE',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        width:150,
        height:200,
        
      },
      Text:{
        fontWeight:'bold',
        fontSize:14,
        justifyContent:'center',
        alignItems:'center',
         marginLeft:19,
         paddingHorizontal:20
      },
      Image:{
        width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 25, // Ajuste conforme necessário
    marginBottom: 5, 
    marginTop:55,
    marginLeft:35
      },
      title:{
        fontSize:30,
        marginBottom:60
      }
})

function SignOut() {
  throw new Error("Function not implemented.");
}
