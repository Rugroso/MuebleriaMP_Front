import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface MenuItemsProps {
  onSelectionChange: (value: string, topic: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  topic: string;
}

interface Item {
  name: string;
}

const MenuItems: React.FC<MenuItemsProps> = ({ onSelectionChange, isOpen, setIsOpen, topic }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [items, setItems] = useState<Item[]>([{ name: 'Test' }]);

  const Sucursales = [
    { name: 'CDMX' },
    { name: 'Los Angeles' },
    { name: 'Guadalajara' },
    { name: 'Houston' },
    { name: 'Monterrey' },
    { name: 'Chicago' },
    { name: 'Puebla' },
    { name: 'New York' },
    { name: 'Tijuana' },
    { name: 'San Francisco' },
  ];

  const Ordenar = [
    { name: "Fecha - Menor a Mayor" },
    { name: "Fecha - Mayor a Menor" },
    { name: "Precio - Menor a Mayor" },
    { name: "Precio - Mayor a Menor" },
    { name: "Cantidad - Menor a Mayor" },
    { name: "Cantidad - Mayor a Menor" },
    { name: "Nombre - A-Z" },
    { name: "Nombre - Z-A" }
  ];

  const OrdenarClientes = [
    { name: "ID - Menor a Mayor" },
    { name: "ID - Mayor a Menor" },
    { name: "Nombre - A-Z" },
    { name: "Nombre - Z-A" }
  ];


  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelectionChange(value, topic);
    setIsOpen(false);
  };

  useEffect(() => {
    if (topic === 'Seleccionar una Sucursal') {
      setItems(Sucursales);
    }
    else if (topic === 'Seleccionar una forma de Ordenar') {
      setItems(Ordenar);
    }
    else if (topic === 'Seleccionar una forma de Ordenar | Clientes') {
      setItems(OrdenarClientes);
    }
  }, [topic]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: '#1c1c1e', borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#3a3a3c' }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500' }}>{topic}</Text>
            <TouchableOpacity onPress={() => setIsOpen(false)} style={{ padding: 8 }}>
              <FontAwesome name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={{ maxHeight: 400 }}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: '#3a3a3c',
                  backgroundColor: selectedValue === item.name ? '#2c2c2e' : 'transparent',
                }}
                onPress={() => handleSelect(item.name)}
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>{item.name}</Text>
                {selectedValue === item.name && (
                  <FontAwesome name="check" size={20} color="white" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default MenuItems;
