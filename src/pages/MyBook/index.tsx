import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';

interface Reserva {
  id: number;
  horaSelecionada: number;
  selectedDate: string;
  mesaSelecionada: {
    id: number;
    number_table: number;
    quantity_people: number;
  };
}

const MinhasReservas: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    loadReservas();
  }, []);

  const loadReservas = async () => {
    try {
      const response = await api.get(`/book/${user.id}`);
      setReservas(response.data);
    } catch (error) {
      console.error('Erro ao carregar as reservas:', error);
    }
  };

  const renderReservaItem = ({ item }: { item: Reserva }) => (
    <View style={styles.reservaContainer}>
      <Text style={styles.reservaText}>Data: {item.selectedDate}</Text>
      <Text style={styles.reservaText}>Hora: {item.horaSelecionada}</Text>
      <Text style={styles.reservaText}>Mesa: {item.mesaSelecionada.number_table}</Text>
      <Text style={styles.reservaText}>Capacidade: {item.mesaSelecionada.quantity_people} pessoas</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Minhas Reservas</Text>
      {reservas.length === 0 ? (
        <Text style={styles.noReservasText}>Você ainda não possui reservas.</Text>
      ) : (
        <FlatList
          data={reservas}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderReservaItem}
          contentContainerStyle={styles.flatListContainer}
        />
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
  noReservasText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
  reservaContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  reservaText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
});

export default MinhasReservas;
