import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const TimerScreen = () => {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            Alert.alert('Timer Complete!', 'Your time is up!');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, totalSeconds]);

  useEffect(() => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    setHours(String(h).padStart(2, '0'));
    setMinutes(String(m).padStart(2, '0'));
    setSeconds(String(s).padStart(2, '0'));
  }, [totalSeconds]);

  const startTimer = () => {
    if (!isRunning) {
      const h = parseInt(hours) || 0;
      const m = parseInt(minutes) || 0;
      const s = parseInt(seconds) || 0;
      const total = h * 3600 + m * 60 + s;
      
      if (total > 0) {
        setTotalSeconds(total);
        setIsRunning(true);
      }
    } else {
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTotalSeconds(0);
    setHours('00');
    setMinutes('00');
    setSeconds('00');
  };

  return (
    <LinearGradient
      colors={['#ff9966', '#ff5e62']}
      style={styles.container}
    >
      <View style={styles.timerDisplay}>
        <Text style={styles.timerText}>
          {hours}:{minutes}:{seconds}
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="HH"
          keyboardType="number-pad"
          maxLength={2}
          value={hours}
          onChangeText={setHours}
          editable={!isRunning}
        />
        <Text style={styles.separator}>:</Text>
        <TextInput
          style={styles.input}
          placeholder="MM"
          keyboardType="number-pad"
          maxLength={2}
          value={minutes}
          onChangeText={setMinutes}
          editable={!isRunning}
        />
        <Text style={styles.separator}>:</Text>
        <TextInput
          style={styles.input}
          placeholder="SS"
          keyboardType="number-pad"
          maxLength={2}
          value={seconds}
          onChangeText={setSeconds}
          editable={!isRunning}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={startTimer}
        >
          <Text style={styles.buttonText}>
            {isRunning ? 'Pause' : 'Start'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={resetTimer}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerDisplay: {
    marginBottom: 40,
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    width: 70,
    height: 50,
    textAlign: 'center',
    fontSize: 24,
    marginHorizontal: 5,
  },
  separator: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resetButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  buttonText: {
    color: '#ff5e62',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TimerScreen; 