import { View, Text, ScrollView, Modal, Pressable, TextInput } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { generarReporteCompras } from '../../utils/pdfGenerator';
import { Alert } from 'react-native';


export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    fechaInicio: '',
    fechaFin: '',
    sucursal: ''
  });

  return (
    <View className='w-full h-full flex items-center justify-center bg-slate-800'>
        <View className="h-[12%] w-full bg-stone-800 flex justify-center items-center px-4">
          <FontAwesome
            name="user-circle"
            size={30}
            color="white"
            className="absolute left-6 bottom-3"
          />
          <Text className="text-2xl font-semibold text-white mt-14">
            ¡Hola, Abraham!
          </Text>
        </View>
      <ScrollView className='p-5 flex-1 w-full'>
        <Text className='text-2xl font-semibold text-white mb-5 text-start'>
          Resumen General
        </Text>
      
        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center shadow-lg'>
          <MaterialIcons name="attach-money" size={32} color="#015c1b" />
          <View className='ml-4'>
            <Text className='text-xl font-semibold text-white'>Venta del Día</Text>
            <Text className='text-lg text-gray-300 mt-2'>Total Ventas: $2,000.00</Text>
            <Text className='text-lg text-gray-300'>Productos Vendidos: 15</Text>
          </View>
        </View>

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center shadow-lg'>
          <FontAwesome name="archive" size={32} color="gray" />
          <View className='ml-4'>
            <Text className='text-xl font-semibold text-white'>Inventario Total</Text>
            <Text className='text-lg text-gray-300 mt-2'>Productos en Inventario: 350</Text>
            <Text className='text-lg text-gray-300'>Valor Estimado: $45,000.00</Text>
          </View>
        </View>
        <View className="my-4 border-t border-gray-600" />
    
        <Text className='text-2xl font-semibold text-white mb-5 text-start'>
          Reportes Disponibles
        </Text>

        <Pressable onPress={() => setModalVisible(true)}>
          <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center justify-between shadow-lg'>
            <View className='flex-row flex items-center'>
              <FontAwesome name="money" size={32} color="#015c1b" />
              <View className='ml-4 w-[80%]'>
                <Text className='text-xl font-semibold text-white'>Compras Mensuales</Text>
              </View>
            </View>
            <View>
              <FontAwesome name="arrow-right" size={18} color="white" />
            </View>
          </View>
        </Pressable>

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center justify-between shadow-lg'>
        <View className='flex-row flex items-center'>
          <FontAwesome name="money" size={32} color="#015c1b" />
          <View className='ml-4 w-[80%]'>
            <Text className='text-xl font-semibold text-white'>Ventas Mensuales</Text>
          </View>
          </View>
          <View>
            <FontAwesome name="arrow-right" size={18} color="white" />
          </View>
        </View>

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center justify-between shadow-lg '>
          <View className='flex-row flex items-center'>
            <MaterialIcons name="chair" size={32} color="#9e0618" />
            <View className='ml-4 w-[80%]'>
              <Text className='text-xl font-semibold text-white'>Muebles Faltantes por Sucursal</Text>
            </View>
          </View>
          <View>
            <FontAwesome name="arrow-right" size={18} color="white" />
          </View>
        </View>

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center justify-between shadow-lg'>
        <View className='flex-row flex items-center'>
          <FontAwesome name="user" size={32} color="#9e0618" />
          <View className='ml-4 w-[80%]'>
            <Text className='text-xl font-semibold text-white'>Clientes en Estado de Crédito</Text>
          </View>
          </View>
          <View>
            <FontAwesome name="arrow-right" size={18} color="white" />
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className='flex-1 justify-center items-center bg-black/50'>
            <View className='bg-stone-900 p-6 rounded-lg w-[90%]'>
              <Text className='text-xl font-bold mb-4 text-white'>Generar Reporte de Compras</Text>
              
              <TextInput
                className='border border-stone-700 p-2 rounded-lg mb-4'
                placeholder="Fecha Inicio (DD/MM/YYYY)"
                placeholderTextColor={'gray'}
                value={formData.fechaInicio}
                onChangeText={(text) => setFormData({...formData, fechaInicio: text})}
              />
              
              <TextInput
                className='border border-stone-700  p-2 rounded-lg mb-4'
                placeholder="Fecha Fin (DD/MM/YYYY)"
                placeholderTextColor={'gray'}
                value={formData.fechaFin}
                onChangeText={(text) => setFormData({...formData, fechaFin: text})}
              />
              
              <TextInput
                className='border border-stone-700  p-2 rounded-lg mb-4'
                placeholder="Sucursal"
                placeholderTextColor={'gray'}

                value={formData.sucursal}
                onChangeText={(text) => setFormData({...formData, sucursal: text})}
              />

              <View className='flex-row justify-center space-x-4 w-full'>
                <Pressable
                  className='bg-red-500 px-4 py-2 rounded-lg mr-3'
                  onPress={() => setModalVisible(false)}
                >
                  <Text className='text-white'>Cancelar</Text>
                </Pressable>
                
                <Pressable
                  className='bg-blue-500 px-4 py-2 rounded-lg'
                  onPress={async () => {
                    // Validación básica
                    if (!formData.fechaInicio || !formData.fechaFin || !formData.sucursal) {
                      Alert.alert('Error', 'Por favor complete todos los campos');
                      return;
                    }

                    try {
                      const success = await generarReporteCompras(formData);
                      if (success) {
                        Alert.alert('Éxito', 'El reporte se ha generado correctamente');
                      } else {
                        Alert.alert('Error', 'No se pudo generar el reporte');
                      }
                    } catch (error) {
                      Alert.alert('Error', 'Ocurrió un error al generar el reporte');
                    } finally {
                      setModalVisible(false);
                    }
                  }}
                >
                  <Text className='text-white'>Generar PDF</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>

    </View>
  );
}