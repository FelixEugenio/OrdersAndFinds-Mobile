import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api } from '../../services/api';

interface Mesa {
  id: number;
  number_table: number;
  quantity_people: number;
}

interface TablesProps {
  route: {
    params: {
      horaSelecionada: number;
      horaId: number;
      selectedDate: string;
      selectedDateId: number;
    };
  };
}

const Tables: React.FC<TablesProps> = ({ route }) => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [selectedMesa, setSelectedMesa] = useState<Mesa | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    obterMesasDaApi();
  }, []);

  const obterMesasDaApi = async () => {
    try {
      const response = await api.get('/table');
      setMesas(response.data);
    } catch (error) {
      console.error('Erro ao obter mesas:', error);
    }
  };

  const selecionarMesa = (mesa: Mesa) => {
    setSelectedMesa(selectedMesa === mesa ? null : mesa);
  };

  const handleFinishBook = () => {
    if (selectedMesa !== null) {
      const { horaSelecionada, horaId, selectedDate, selectedDateId } = route.params;

      // Aqui você pode fazer o que precisar com os dados selecionados
      console.log('Hora Selecionada:', horaSelecionada);
      console.log('ID da Hora:', horaId);
      console.log('Data Selecionada:', selectedDate);
      console.log('ID da Data:', selectedDateId);
      console.log('Mesa Selecionada:', selectedMesa);

      // Adapte conforme necessário para a lógica de navegação ou outras ações desejadas
      navigation.navigate('FinishBook', {
        horaSelecionada,
        horaId,
        selectedDate,
        selectedDateId,
        mesaSelecionada: selectedMesa,
      });
    }
  };

  const renderizarItemMesa = ({ item }: { item: Mesa }) => (
    <TouchableOpacity
      style={[
        styles.mesaContainer,
        selectedMesa === item && styles.mesaSelecionada,
      ]}
      onPress={() => selecionarMesa(item)}
    >
      <Text style={styles.numeroMesa}>{`Mesa ${item.number_table}`}</Text>
      <Text>{`Capacidade: ${item.quantity_people} pessoas`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Escolha a Mesa</Text>
      <FlatList
        data={mesas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderizarItemMesa}
        style={styles.listaMesas}
      />
      {selectedMesa !== null && (
        <TouchableOpacity style={styles.buttonContainer} onPress={handleFinishBook}>
          <Text style={styles.buttonText}>Finalizar Reserva</Text>
        </TouchableOpacity>
      )}
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
  listaMesas: {
    flex: 1,
  },
  mesaContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 10,
    padding: 20,
  },
  mesaSelecionada: {
    backgroundColor: '#99ccff',
    borderColor: '#99ccff',
  },
  numeroMesa: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#FF3838',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Tables;
