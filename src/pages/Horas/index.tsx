// Importe as bibliotecas necessárias e defina as interfaces
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import moment, { Moment } from 'moment';

interface SelectedDate {
  day: number;
  month: number;
  year: number;
}

interface Hour {
  id: string;  // Alterado para string
  hour: number;
}

interface HorasProps {
  route: {
    params: {
      selectedDate: string;
      id: string;
    };
  };
}

// Componente principal 'Horas'
export default function Horas({ route }: HorasProps) {
  const [horasDoDia, setHorasDoDia] = useState<Hour[]>([]);
  const [horaSelecionada, setHoraSelecionada] = useState<number | null>(null);
  const [selectedDateInfo, setSelectedDateInfo] = useState<{ selectedDate: string; selectedDateId: string } | null>(null);
  const navigation = useNavigation();

  const selecionarHora = (hora: number) => {
    setHoraSelecionada(hora === horaSelecionada ? null : hora);
  };

  useEffect(() => {
    api.get('/hour')
      .then(response => {
        setHorasDoDia(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter horas do dia:', error);
      });
  }, []); 

  const handleNextPress = async () => {
    if (horaSelecionada !== null) {
      try {
        // Obtém a data selecionada e o ID da data da rota
        const selectedDate = route.params.selectedDate;
        const selectedDateId = route.params.id;

        // Obtenha o ID associado à hora selecionada da API
        const selectedHour = horasDoDia.find(hour => hour.hour === horaSelecionada);

        if (selectedHour) {
          const horaId = selectedHour.id;

          // Passa todas as informações para a tela de Tables
          setSelectedDateInfo({ selectedDate, selectedDateId });
          console.log(horaSelecionada, horaId, selectedDate, selectedDateId);
          navigation.navigate('Tables', { horaSelecionada, horaId, selectedDate, selectedDateId });
        }
      } catch (error) {
        console.error('Erro ao processar a data ou hora:', error);
      }
    }
  };

  const renderBlocoHora = ({ item }: { item: Hour }) => (
    <TouchableOpacity
      style={[
        styles.horaContainer,
        horaSelecionada === item.hour && styles.horaSelecionada,
      ]}
      onPress={() => selecionarHora(item.hour)}
    >
      <Text style={styles.horaText}>{`${item.hour}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Escolha um Horário</Text>
      <FlatList
        data={horasDoDia}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBlocoHora}
        numColumns={3}
        contentContainerStyle={styles.listaContainer}
      />
      {horaSelecionada !== null && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleNextPress}
        >
          <Text style={styles.buttonText}>Próxima</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop: 80,
  },
  listaContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  horaContainer: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    margin: 5,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  horaText: {
    fontSize: 18,
    color: '#333',
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  horaSelecionada: {
    backgroundColor: '#99ccff',
    borderColor: '#99ccff',
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#FF3838',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
