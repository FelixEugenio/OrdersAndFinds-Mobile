import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';

interface Reservation {
  id: number;
  date: string;
  hour: string;
  // Adicione outros campos conforme necessário
}

export default function Reservations() {
  const { user, SignOut } = useContext(AuthContext);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await api.get(`/book?user_id=${user.id}`);
      setReservations(response.data);
    } catch (error) {
      console.error('Erro ao obter as reservas:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderReservationItem = ({ item }: { item: Reservation }) => (
    <View style={styles.reservationItem}>
      <Text style={styles.reservationText}>Data: {item.date}</Text>
      <Text style={styles.reservationText}>Hora: {item.hour}</Text>
      {/* Adicione outros detalhes da reserva conforme necessário */}
    </View>
  );

  const handleSignOut = async () => {
    try {
      await SignOut();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF3838" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sair</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>Suas Reservas</Text>
      {reservations.length === 0 ? (
        <Text style={styles.noReservationsText}>Você não possui reservas.</Text>
      ) : (
        <FlatList
          data={reservations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderReservationItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 80,
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  reservationItem: {
    backgroundColor: '#eee',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  reservationText: {
    fontSize: 16,
    color: '#555',
  },
  noReservationsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#FF3838',
    borderRadius: 5,
  },
  signOutButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});
