import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';

interface MenuItemsProps {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}

const AddSale: React.FC<MenuItemsProps> = ({ isOpen, setIsOpen }) => {
  const [clientId, setClientId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedFurniture, setSelectedFurniture] = useState<string | null>(null);
  const [furnitureOptions, setFurnitureOptions] = useState([
    { label: 'Silla', value: 'chair' },
    { label: 'Mesa', value: 'table' },
    { label: 'Sofá', value: 'sofa' },
    { label: 'Cama', value: 'bed' },
  ]);

  const handleSubmit = () => {
    if (!clientId || !quantity || !selectedFurniture) {
      Alert.alert('Error', 'Por favor, llena todos los campos.');
      return;
    }

    // Simulación de envío de datos
    const saleData = {
      clientId,
      furniture: selectedFurniture,
      quantity,
    };

    console.log('Datos de la venta:', saleData);
    Alert.alert('Éxito', 'La venta fue registrada exitosamente.');
    resetForm();
  };

  const resetForm = () => {
    setClientId('');
    setQuantity('');
    setSelectedFurniture(null);
    setIsOpen(false);
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
          <ScrollView>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Añadir una Venta</Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <FontAwesome name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {/* Descripción */}
            <Text style={styles.description}>
              Llena el formulario para añadir una compra
            </Text>

            {/* Campo: ID del cliente */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>ID Cliente</Text>
              <TextInput
                style={styles.input}
                value={clientId}
                onChangeText={setClientId}
                placeholder="Ej: 10"
                placeholderTextColor="#666"
                keyboardType="numeric"
              />
            </View>

            {/* Campo: Muebles disponibles */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Muebles disponibles</Text>
              <DropDownPicker
                open={open}
                value={selectedFurniture}
                items={furnitureOptions}
                setOpen={setOpen}
                setValue={setSelectedFurniture}
                setItems={setFurnitureOptions}
                placeholder="Selecciona un mueble"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.dropdownPlaceholder}
              />
            </View>

            {/* Campo: Cantidad */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cantidad</Text>
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={setQuantity}
                placeholder="Ej: 10"
                placeholderTextColor="#666"
                keyboardType="numeric"
              />
            </View>

            {/* Botón: Registrar venta */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>VENDER</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddSale;

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
  dropdown: {
    backgroundColor: '#292524',
    borderColor: '#4b5563',
  },
  dropdownContainer: {
    backgroundColor: '#292524',
    borderColor: '#4b5563',
  },
  dropdownText: {
    color: 'white',
  },
  dropdownPlaceholder: {
    color: 'gray',
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
