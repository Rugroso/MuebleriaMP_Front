import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface MenuItemsProps {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}

const AddClient: React.FC<MenuItemsProps> = ({ isOpen, setIsOpen }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleSubmit = async () => {
    if (!nombre || !telefono || !correo || !direccion) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    try {
      const formJson = { nombre, telefono, correo, direccion };
      const response = await fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Cliente agregado exitosamente");
        resetForm();
      } else {
        const error = await response.json();
        Alert.alert("Error", error.message || "No se pudo agregar el cliente");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema al enviar el formulario");
    }
  };

  const resetForm = () => {
    setIsOpen(false);
    setNombre('');
    setTelefono('');
    setCorreo('');
    setDireccion('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Registrar un Cliente</Text>
              <Pressable
                accessible
                accessibilityLabel="Cerrar formulario"
                onPress={() => setIsOpen(false)}
              >
                <FontAwesome name="close" size={24} color="white" />
              </Pressable>
            </View>

            <Text style={styles.description}>
              Llena el formulario para registrar un cliente
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Ej: Abraham Saldivar"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Teléfono</Text>
              <TextInput
                style={styles.input}
                value={telefono}
                onChangeText={setTelefono}
                placeholder="Ej: +52 653 974 2843"
                placeholderTextColor="#666"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Correo</Text>
              <TextInput
                style={styles.input}
                value={correo}
                onChangeText={setCorreo}
                placeholder="Ej: abrahamsldev@gmail.com"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dirección</Text>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={direccion}
                onChangeText={setDireccion}
                placeholder="Ej: Av. Bugambilias y 41, San Luis Río Colorado, Sonora, México"
                placeholderTextColor="#666"
                multiline
              />
            </View>

            {/* Botón de enviar */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              accessible
              accessibilityLabel="Registrar cliente"
            >
              <Text style={styles.submitButtonText}>REGISTRAR</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddClient;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 20,
  },
  scrollContainer: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  description: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2c2c2e',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: 'white',
    borderWidth: 1,
    borderColor: '#3a3a3c',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4a4a4c',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
