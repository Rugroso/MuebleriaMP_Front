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

interface addSaleProps {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
  establecimientoID: number;
}

interface FurnitureOption {
  label: string;
  value: string;
  price: number;
}

const AddSale: React.FC<addSaleProps> = ({ isOpen, setIsOpen, establecimientoID }) => {
  const [clientID, setClientID] = useState('');
  const [quantity, setQuantity] = useState('');
  const [open, setOpen] = useState(false);
  const [openClientes, setOpenClientes] = useState(false);
  const [openMetodo, setOpenMetodo] = useState(false);
  const [selectedMetodoPago, setSelectedMetodoPago] = useState<string | null>(null);
  const [selectedFurniture, setSelectedFurniture] = useState<string | null>(null);
  const [installments, setInstallments] = useState('');
  const [initialPayment, setInitialPayment] = useState('');
  const [unitPrice, setUnitPrice] = useState(0)
  const [total, setTotal] = useState(0)
  const [clientesOptions, setClientesOptions] = useState([
    { label: 'Abraham Saldivar', value: '1' },
  ]);

  const [furnitureOptions, setFurnitureOptions] = useState<FurnitureOption[]>([]);

  const [metodoPagoOptions, setMetodoPagoOptions] = useState([
    { label: 'Contado', value: 'Contado' },
    { label: 'Credito', value: 'Credito' },
  ]);

  const getMuebles = async () => {
    try {
      const response = await fetch(`http://localhost:3000/inventarioestablecimiento?EstablecimientoID=${establecimientoID}&orderBy=Nombre&ascDesc=DESC`);
      if (response.ok) {
        const muebles = await response.json();
        if (Array.isArray(muebles)) {
          const filteredMuebles = muebles.filter((event) => event.Cantidad > 0);
          const furnitureOptions = filteredMuebles.map((event) => ({
            label: event.Nombre,
            value: event.MuebleID,
            price: event.Precio,
            cantidad: event.Cantidad
          }));
          setFurnitureOptions(furnitureOptions);
          console.log('Furniture Options:', furnitureOptions);
        }
      }
    } catch (e) {
      console.error('Error al obtener los muebles:', e);
    }
  };

  const getClientes = async () => {
    try {
      const response = await fetch(`http://localhost:3000/clientes?orderBy=Nombre&ascDesc=ASC`);
      if (response.ok) {
        const clientes = await response.json();
        if (Array.isArray(clientes)) {
          const clientesOptions = clientes.map((cliente) => ({
            label: `${cliente.Nombre} - ID: ${cliente.ClienteID}` ,
            value: cliente.ClienteID,
          }));
          setClientesOptions(clientesOptions);
        }
      }
    } catch (e) {
      console.error('Error al obtener los clientes:', e);
    }
  };
  
  useEffect(() => {
    getClientes();
    const intervalId = setInterval(getClientes, 1000);
    return () => clearInterval(intervalId);
  }, [establecimientoID]);
  
  useEffect(() => {
    getMuebles();
    const intervalId = setInterval(getMuebles, 1000);
    return () => clearInterval(intervalId);
  }, [establecimientoID]);

  useEffect(() => {
    if (selectedFurniture) {
      const selectedOption = furnitureOptions.find(
        (item) => item.value === selectedFurniture
      );
      setUnitPrice(selectedOption?.price || 0);
    } else {
      setUnitPrice(0);
    }
  }, [selectedFurniture]);

  useEffect(() => {
    if (quantity && unitPrice) {
      const parsedQuantity = parseInt(quantity, 10);
      if (!isNaN(parsedQuantity)) {
        setTotal(parsedQuantity * unitPrice);
      } else {
        setTotal(0);
      }
    } else {
      setTotal(0);
    }
  }, [quantity, unitPrice]);

  const handleSubmit = async () => {
    if (!clientID || !quantity || !selectedFurniture || !selectedMetodoPago) {
      Alert.alert('Error', 'Por favor, llena todos los campos.');
      return;
    }
    

  
    if (selectedMetodoPago === 'Credito' && (!installments || !initialPayment)) {
      Alert.alert(
        'Error',
        'Por favor, completa los campos de plazos y cantidad inicial para el crédito.'
      );
      return;
    }
  
    if (selectedMetodoPago === 'Credito') {
      const installmentsInt = parseInt(installments, 10);
      if (isNaN(installmentsInt) || installmentsInt < 1 || installmentsInt > 36) {
        Alert.alert(
          'Error',
          'El plazo debe ser un número entre 1 y 36 meses.'
        );
        return;
      }
    }
  
    try {
      const formJson = {
        clientID,
        selectedFurniture,
        quantity,
        establecimientoID,
        
        metodoPago: selectedMetodoPago,
        ...(selectedMetodoPago === 'Credito' && { 
          Plazo: installments,
          initialPayment 
        }),
      };
  
      const response = await fetch('http://localhost:3000/ventas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });
  
      if (response.ok) {
        Alert.alert('Éxito', 'La venta fue registrada exitosamente.');
        resetForm();
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || 'No se pudo registrar la venta.');
      }
    } catch (error) {
      console.error('Error al enviar la venta:', error);
      Alert.alert('Error', 'Hubo un problema al enviar el formulario.');
    }
  };
  

  const resetForm = () => {
    setClientID('');
    setQuantity('');
    setSelectedFurniture(null);
    setSelectedMetodoPago(null);
    setInstallments('');
    setInitialPayment(''); 
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
            <View style={styles.header}>
              <Text style={styles.title}>Añadir una Venta</Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <FontAwesome name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <Text style={styles.description}>
              Llena el formulario para añadir una compra
            </Text>

            <View style={{ zIndex: 3, marginBottom: 16 }}>
              <Text style={styles.label}>Cliente</Text>
              <DropDownPicker
                open={openClientes}
                value={clientID}
                items={clientesOptions}
                setOpen={setOpenClientes}
                setValue={setClientID}
                setItems={setClientesOptions}
                placeholder="Selecciona un cliente"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.dropdownPlaceholder}
                listMode="MODAL" 
                searchable={true}
                searchPlaceholder="Buscar cliente..."
                searchTextInputStyle={{
                  color: 'white',
                }}
                modalProps={{
                  animationType: 'fade',
                }}
                modalTitle="Selecciona un cliente"
                modalContentContainerStyle={{
                  backgroundColor: '#1c1c1e',
                  padding: 16,
                  borderRadius: 8,
                }}
                modalTitleStyle={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: 16,
                }}
              />
            </View>

            <View style={{ zIndex: 2, marginBottom: 16 }}>
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

            <View style={{ zIndex: 1, marginBottom: 16 }}>
              <Text style={styles.label}>Método de Pago</Text>
              <DropDownPicker
                open={openMetodo}
                value={selectedMetodoPago}
                items={metodoPagoOptions}
                setOpen={setOpenMetodo}
                setValue={setSelectedMetodoPago}
                setItems={setMetodoPagoOptions}
                placeholder="Selecciona un método de pago"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.dropdownPlaceholder}
                listMode="SCROLLVIEW"
                maxHeight={125}
              />
            </View>

            {selectedMetodoPago === 'Credito' && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Plazos</Text>
                  <TextInput
                    style={styles.input}
                    value={installments}
                    onChangeText={setInstallments}
                    placeholder="Ej: 12"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Cantidad Inicial</Text>
                  <TextInput
                    style={styles.input}
                    value={initialPayment}
                    onChangeText={setInitialPayment}
                    placeholder="Ej: 5000"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                  />
                </View>
              </>
            )}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>VENDER</Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={{ marginTop: 12, flexDirection: 'row' }}>
              <Text className='mt-2 mb-2 text-xl text-white'>Total a Pagar</Text>
                <Text style={styles.total}>
                  {total !== null ? `$${total.toFixed(2)}` : 'Introduce una cantidad'}
                </Text>
            </View>
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
  total: {
    fontSize: 18,
    color: 'white',
    backgroundColor: '#2c2c2e',
    padding: 8,
    borderRadius: 8,
    textAlign: 'center',
    borderWidth: 1,
    marginLeft:11,
    borderColor: '#3a3a3c',
  },
});
