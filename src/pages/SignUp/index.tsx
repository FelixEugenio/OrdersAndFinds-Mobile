import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {
  const navigation = useNavigation()
  const { SignUp, loadingAuth } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

function handleSignIn(){
 navigation.navigate('SignIn')
}


  async function handleSignUp() {
    if (name === "" || email === "" || password === "" || phone === "") {
      return;
    }

    await SignUp({
      name,
      email,
      password,
      phone
    });
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/mesa.png')}
      />

      <Text style={styles.buttonText}>EasyMealReservation</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite o Teu Nome"
          style={styles.input}
          placeholderTextColor="black"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Digite o Teu Email"
          style={styles.input}
          placeholderTextColor="black"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Digite o Teu Numero de Telefone"
          style={styles.input}
          placeholderTextColor="black"
          value={phone}
          onChangeText={setPhone}
        />

        <TextInput
          placeholder="Digite a Tua Senha"
          style={styles.input}
          placeholderTextColor="black"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size={25} color="#FF3838" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.buttonText} onPress={handleSignIn}>Já tem uma conta? Faca Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  input: {
    width: '95%',
    height: 40,
    borderColor: 'black',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: 'black',
    borderWidth: 1,
  },
  logo: {
    marginBottom: 18,
    width:80,
    height:80
  },
  inputContainer: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 14
  },
  button: {
    width: '95%',
    height: 40,
    backgroundColor: '#FF3838',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  }
});
