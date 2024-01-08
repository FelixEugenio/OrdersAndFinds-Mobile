import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import axios, { AxiosError } from 'axios';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

interface FinishBookProps {
  route: {
    params: {
      horaSelecionada: number;
      horaId: number;
      selectedDate: string;
      selectedDateId: number;
      mesaSelecionada: {
        id: number;
        number_table: number;
        quantity_people: number;
      };
    };
  };
}

const FinishBook: React.FC<FinishBookProps> = ({ route }) => {
  const navigation = useNavigation()
  const { user } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);

  const {
    horaSelecionada,
    horaId,
    selectedDate,
    selectedDateId,
    mesaSelecionada,
  } = route.params;

  const handleFinalizarReserva = async () => {
    try {
      const response = await api.post('/book', {
        user_id: user.id,
        hour_id: horaId,
        table_id: mesaSelecionada.id,
        date_id: selectedDateId,
      });

      console.log('Resposta da API:', response.data);

      setModalVisible(true);
    } catch (error) {
      console.error('Erro ao finalizar reserva:', error);

      // Certifique-se de que a variável error é do tipo AxiosError
      const axiosError = error as AxiosError;

      // Verifique se axiosError.response existe antes de acessá-lo
      if (axiosError.response) {
        console.log('Erro completo:', axiosError.response.data);
      }

      setModalVisible(true);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Dados Da Reserva</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Nome do Cliente:</Text>
        <Text style={styles.infoText}>{user.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Hora Selecionada:</Text>
        <Text style={styles.infoText}>{horaSelecionada}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Data da Reserva:</Text>
        <Text style={styles.infoText}>{selectedDate}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Numero da Mesa:</Text>
        <Text style={styles.infoText}>{mesaSelecionada.number_table}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Capacidade:</Text>
        <Text style={styles.infoText}>{mesaSelecionada.quantity_people} pessoas</Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleFinalizarReserva}>
        <Text style={styles.buttonText}>Finalizar Reserva</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Reserva realizada com sucesso!</Text>
          <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop: 80,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
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
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#FF3838',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default FinishBook;
