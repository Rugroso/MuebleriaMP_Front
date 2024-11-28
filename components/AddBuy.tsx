import React, { useEffect, useState } from 'react';
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
  establecimientoID: number;
}

const AddBuy: React.FC<MenuItemsProps> = ({ isOpen, setIsOpen, establecimientoID }) => {
  const [open, setOpen] = useState(false);
  const [openDistribuidor, setOpenDistribuidor] = useState(false);
  const [selectedFurniture, setSelectedFurniture] = useState<string | null>(null);
  const [pais, setPais] = useState('')
  const [selectedDistribuidor, setSelectedDistribuidor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState('');
  const [furnitureOptions, setFurnitureOptions] = useState([
    { label: 'Silla', value: 'Silla' },
  ]);
  const [distribuidorOptions, setDistribuidorOptions] = useState([
    { label: 'Intuitive', value: 'Intuitive' },
  ]);
  
  const [sucursalesMX, setSucursalesMX] = useState([
    { label: 'Intuitive', value: 'Intuitive' },
  ]);
  const [sucursalesUSA, setSucursalesUSA] = useState([
    { label: 'Intuitive', value: 'Intuitive' },
  ]);

  const getMuebles = async () => {
    try {
      const response = await fetch('http://localhost:3000/muebles');
      if (response.ok) {
        const muebles = await response.json();
        if (Array.isArray(muebles)) {
          const options = muebles.map((mueble) => ({
            label: mueble.Nombre,
            value: mueble.MuebleID,
          }));
          setFurnitureOptions(options);
        }
      } else {
        console.error('Error al obtener los muebles');
      }
    } catch (error) {
      console.error('Error al obtener los muebles:', error);
    }
  };

  // Obtener sucursales en México
  const getSucursalesMX = async () => {
    try {
      const response = await fetch('http://localhost:3000/sucursales/mx');
      if (response.ok) {
        const sucursales = await response.json();
        if (Array.isArray(sucursales)) {
          const options = sucursales.map((sucursal) => ({
            label: sucursal.Nombre,
            value: sucursal.SucursalID, 
          }));
          setSucursalesMX(options);
        }
      } else {
        console.error('Error al obtener las sucursales en MX');
      }
    } catch (error) {
      console.error('Error al obtener las sucursales en MX:', error);
    }
  };

  const getPaisBySucursalId = async () => {
    try {
      const response = await fetch(`http://localhost:3000/sucursales/pais?id=${establecimientoID}`);
      if (response.ok) {
        const data = await response.json();
        setPais(data.Pais);
      }
    } catch (e) {
      console.error('Error al obtener el país de la sucursal:', e);
    }
  };

  // Obtener sucursales en Estados Unidos
  const getSucursalesUSA = async () => {
    try {
      const response = await fetch('http://localhost:3000/sucursales/usa');
      if (response.ok) {
        const sucursales = await response.json();
        if (Array.isArray(sucursales)) {
          const options = sucursales.map((sucursal) => ({
            label: sucursal.Nombre,
            value: sucursal.SucursalID,
          }));
          setSucursalesUSA(options);
        }
      } else {
        console.error('Error al obtener las sucursales en USA');
      }
    } catch (error) {
      console.error('Error al obtener las sucursales en USA:', error);
    }
  };

  useEffect(() => {
    getSucursalesMX();
    getSucursalesUSA();
  }, []);

  useEffect(() => {
    getPaisBySucursalId();
  }, [establecimientoID]);

  useEffect(() => {
    getMuebles();
  }, []);

  useEffect(()=> {
    console.log(pais)
    if (pais==='MX') {
      setDistribuidorOptions(sucursalesMX)
    }
    if (pais==='USA') {
      setDistribuidorOptions(sucursalesUSA)
    }
  },[pais])

  const handleSubmit = async () => {
    if (!selectedFurniture || !selectedDistribuidor || !quantity) {
      Alert.alert('Error', 'Por favor, llena todos los campos.');
      return;
    }

    const buyData = {
      muebleID: selectedFurniture,
      distribuidorID: selectedDistribuidor,
      quantity: parseInt(quantity, 10),
      establecimientoID
    };

    try {
      const response = await fetch('http://localhost:3000/compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buyData),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'La compra fue registrada exitosamente.');
        resetForm();
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || 'No se pudo registrar la compra.');
      }
    } catch (error) {
      console.error('Error al registrar la compra:', error);
      Alert.alert('Error', 'Hubo un problema al enviar el formulario.');
    }
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

            <Text style={styles.description}>
              Llena el formulario para añadir una compra
            </Text>

            <View style={{ zIndex: 2, marginBottom: 16 }}>
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
                listMode="SCROLLVIEW"
                maxHeight={125}
              />
            </View>

            <View style={{ zIndex: 1, marginBottom: 16 }}>
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
                listMode="SCROLLVIEW"
                maxHeight={125}
              />
            </View>

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
