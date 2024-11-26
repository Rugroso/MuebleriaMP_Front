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

const AddBuy: React.FC<MenuItemsProps> = ({ isOpen, setIsOpen }) => {
  const [open, setOpen] = useState(false);
  const [openDistribuidor, setOpenDistribuidor] = useState(false);
  const [selectedFurniture, setSelectedFurniture] = useState<string | null>(null);
  const [selectedDistribuidor, setSelectedDistribuidor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState('');
  const [furnitureOptions, setFurnitureOptions] = useState([
    { label: 'Silla', value: 'chair' },
    { label: 'Mesa', value: 'table' },
    { label: 'Sofá', value: 'sofa' },
    { label: 'Cama', value: 'bed' },
  ]);
  const [distribuidorOptions, setDistribuidorOptions] = useState([
    { label: 'Distribuidor A', value: 'distributor_a' },
    { label: 'Distribuidor B', value: 'distributor_b' },
    { label: 'Distribuidor C', value: 'distributor_c' },
  ]);

  const handleSubmit = () => {
    if (!selectedFurniture || !selectedDistribuidor || !quantity) {
      Alert.alert('Error', 'Por favor, llena todos los campos.');
      return;
    }

    const buyData = {
      furniture: selectedFurniture,
      distributor: selectedDistribuidor,
      quantity,
    };

    console.log('Datos de la compra:', buyData);
    Alert.alert('Éxito', 'La compra fue registrada exitosamente.');
    resetForm();
  };

  const resetForm = () => {
    setSelectedFurniture(null);
    setSelectedDistribuidor(null);
    setQuantity('');
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
              <Text style={styles.title}>Añadir una Compra</Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <FontAwesome name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {/* Descripción */}
            <Text style={styles.description}>
              Llena el formulario para añadir una compra
            </Text>

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

            {/* Campo: Distribuidores disponibles */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Distribuidores Disponibles</Text>
              <DropDownPicker
                open={openDistribuidor}
                value={selectedDistribuidor}
                items={distribuidorOptions}
                setOpen={setOpenDistribuidor}
                setValue={setSelectedDistribuidor}
                setItems={setDistribuidorOptions}
                placeholder="Selecciona un distribuidor"
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

            {/* Botón: Confirmar compra */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>COMPRAR</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddBuy;

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
