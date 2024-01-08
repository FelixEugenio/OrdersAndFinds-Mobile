import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

export default function Profile() {
  const navigation = useNavigation();

  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveProfile = async () => {
    try {
      setLoading(true);

      // Chamada à API para atualizar as informações do usuário
      const response = await api.put('/profile', {
        name: editedName,
        email: editedEmail,
        phone: editedPhone,
      });

      // Atualiza as informações localmente
      

      setEditing(false);
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Meu Perfil</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Nome:</Text>
        {editing ? (
          <TextInput
            style={styles.editInput}
            value={editedName}
            onChangeText={setEditedName}
          />
        ) : (
          <Text style={styles.infoText}>{editedName}</Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>E-mail:</Text>
        {editing ? (
          <TextInput
            style={styles.editInput}
            value={editedEmail}
            onChangeText={setEditedEmail}
          />
        ) : (
          <Text style={styles.infoText}>{editedEmail}</Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Telefone:</Text>
        {editing ? (
          <TextInput
            style={styles.editInput}
            value={editedPhone}
            onChangeText={setEditedPhone}
          />
        ) : (
          <Text style={styles.infoText}>{editedPhone}</Text>
        )}
      </View>
      {editing ? (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleSaveProfile}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Salvar</Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setEditing(true)}
        >
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop: 80,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  infoText: {
    fontSize: 18,
    color: '#555',
  },
  editInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#FF3838',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
});
