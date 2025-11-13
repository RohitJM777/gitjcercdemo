import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  LinearGradient,
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