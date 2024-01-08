import React, { useContext } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../utils";
import { AuthContext } from "../../contexts/AuthContext";

export default function DashBoard() {
  const navigation = useNavigation<propsStack>();
  const { SignOut } = useContext(AuthContext);

  const handleLogout = () => {
    SignOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title} onPress={handleLogout}>
        Menu
      </Text>

      <View style={styles.buttonPair}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Book')}>
          <Image source={require('../../assets/reserva.png')} style={styles.image} />
          <Text style={styles.text}>Reservar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Horas')}>
          <Image source={require('../../assets/cardapio.png')} style={styles.image} />
          <Text style={styles.text}>Menu</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonPair}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Reservations')}>
          <Image source={require('../../assets/book.png')} style={styles.image} />
          <Text style={styles.text}>Minhas Reservas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../../assets/cara.png')} style={styles.image} />
          <Text style={styles.text}>Meu Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  buttonPair: {
    flexDirection: 'row',
    marginBottom: 20, // Espaçamento vertical entre os pares
  },
  button: {
    backgroundColor: '#FFF',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    width: 150,
    height: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 35,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
