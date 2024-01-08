import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { api } from '../../services/api';
import moment, { Moment } from 'moment';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/AuthContext';

interface SelectedDate {
  day: number;
  month: number;
  year: number;
}

export default function Book() {
  const [currentMonth, setCurrentMonth] = useState<Moment>(moment());
  const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const navigation = useNavigation();
  const { SignOut } = useContext(AuthContext);

  useEffect(() => {
    updateDaysInMonth();
  }, [currentMonth]);

  const updateDaysInMonth = () => {
    const days: number[] = [];
    const daysInCurrentMonth: number = currentMonth.daysInMonth();

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      days.push(i);
    }

    setDaysInMonth(days);
  };

  const handleDayPress = (day: number) => {
    setSelectedDate({
      day,
      month: currentMonth.month() + 1,
      year: currentMonth.year(),
    });
  };

  const handleButtonPress = async () => {
    if (selectedDate) {
      try {
        const { day, month, year } = selectedDate;
        const formattedDate = moment({ year, month: month - 1, day }).format('YYYY-MM-DD');
        const response = await api.post('/date', {
          date: formattedDate,
        });
        navigation.navigate('Horas', { selectedDate: formattedDate, id: response.data.id });
        console.log(selectedDate, response.data.id);
      } catch (error) {
        console.error('Erro ao processar a data:', error);
        // Tratar o erro conforme necessário
      }
    }
  };

  const handleLogout = () => {
    SignOut();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Feather name="log-out" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.monthText}>{currentMonth.format('MMMM YYYY')}</Text>
      <View style={styles.calendarGrid}>
        {daysInMonth.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => handleDayPress(item)}
            style={
              selectedDate && selectedDate.day === item
                ? styles.selectedDayContainer
                : styles.dayContainer
            }>
            <Text
              style={
                selectedDate && selectedDate.day === item
                  ? styles.selectedDayText
                  : styles.dayText
              }>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedDate && (
        <TouchableOpacity style={styles.buttonContainer} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Próxima</Text>
        </TouchableOpacity>
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
  monthText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  dayContainer: {
    flexBasis: '14%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    height: 50,
    marginBottom: 10,
    borderRadius: 5,
  },
  selectedDayContainer: {
    backgroundColor: '#99ccff',
    flexBasis: '14%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    height: 50,
    marginBottom: 10,
    borderRadius: 5,
  },
  dayText: {
    fontSize: 16,
    color: '#555',
  },
  selectedDayText: {
    fontSize: 16,
    color: '#fff',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FF3838',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
