import React,{useContext} from "react";
import { Text,View,SafeAreaView,TouchableOpacity, StyleSheet,Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../utils";

export default function DashBoard(){

  const navigation = useNavigation<propsStack>();
    return(
        <View style={styles.container}>
          <Text style={styles.title}>Menu</Text>
        <View style={styles.buttonPair}>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('FoundAnItem')}>
            <Image 
            source={require('../../assets/procurar.png')}
            style={styles.Image}
            />
            <Text style={styles.Text}>Procurar Item</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('PublishAnItem')}>
            
            <Image 
            source={require('../../assets/publicacao.png')}
            style={styles.Image}
            />
            <Text style={styles.Text}>Publicar Item</Text>
          </TouchableOpacity>
        </View> 
  
        <View style={styles.buttonPair}>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('MyItems')}>
          <Image 
            source={require('../../assets/postagens.png')}
            style={styles.Image}
            />
            <Text style={styles.Text}>Meu Items</Text>
            
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Profile')}>
          <Image 
            source={require('../../assets/do-utilizador.png')}
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
         marginLeft:19
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