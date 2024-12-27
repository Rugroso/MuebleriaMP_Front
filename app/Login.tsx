import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {

  const img = "https://i.imgur.com/8QidqG9.png";
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [sesion, setSesion] = useState({ user: '', pass: '' })

  useEffect(() => {
    setSesion({
      user:user,
      pass:password
    })
  }, [user, password])

  const handleLogin = async () => {
    setSesion({
      user:user,
      pass:password
    })
    if (!user || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sesion),
      });
      if (response.ok) {
        Alert.alert('Éxito', 'Has iniciado sesión correctamente.');
        //@ts-ignore
        router.replace('/(tabs)');
      } 
      else {
        Alert.alert('Error', 'Usuario o Contraseña Incorrectos.');
      }
    } catch (error) {
      Alert.alert('Error', 'Usuario o Contraseña Incorrectos.');
      console.error('Error al iniciar sesion:', error);
    }

  };


  return (
    <View style={styles.container}>
      <Image source={{ uri: img }} style={styles.image} />
      
      <Text style={styles.title}>
        Bienvenido a Mueblería Don Salinas de Gortari Macchu Picchu
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#aaa"
        autoCapitalize="none"
        value={user}
        onChangeText={(text) => setUser(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 16,
  },
  image: {
    width: 160, 
    height: 160,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#f1f5f9', 
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#334155',
    borderColor: '#475569',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#f8fafc',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
