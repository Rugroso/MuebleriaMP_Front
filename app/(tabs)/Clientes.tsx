import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import MenuItems from '@/components/MenuItems';
import AddClient from '@/components/AddClient';


import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
interface Item {
  name: string;
};

export default function HomeScreen() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const [topic, setTopic] = React.useState('');

  const [selectedSucursal, setSelectedSucursal] = React.useState('San Luis Río Colorado');

  const handleSelectionChange = (value:any, topic:string) => {
    if (topic==='Seleccionar una Sucursal') {
      setSelectedSucursal(value);
    }
    setIsOpen(false);
  };

  const handleTouchable = (topic:string, itemsType:string) => {
    setTopic(topic);
    setIsOpen(true);
  }

  return (
    <View className='w-full h-full flex items-center justify-center bg-slate-700'>
      <View className='h-[12%] w-full bg-stone-800 flex items-center justify-center'>
        <Text className='text-2xl font-semibold text-white mt-[11%]'>
          Clientes
        </Text>
      </View>
      <ScrollView className='p-5 flex-1 w-full'>

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center'>
            <View className='w-[9%]'>
                <MaterialIcons name="person" size={32} color="white" />
            </View>
          <View className='ml-4'>
            <Text className='text-xl font-semibold text-white'>Último Cliente Registrado</Text>
            <Text className='text-lg text-gray-300 mt-2'>Id: 6</Text>
            <Text className='text-lg text-gray-300'>Nombre: Gibrán García</Text>
          </View>
        </View>

        <View className='rounded-lg mb-4 flex-row items-center justify-start w-screen'>
        <View className='mr-4 p-4 bg-stone-800 rounded-lg w-[44%]'>
            <Text className='text-xl font-semibold text-white'>MX</Text>
            <Text className='text-lg text-gray-300 mt-2'>Núm. de Clientes: 6</Text>
            <Text className='text-lg text-gray-300 mt-2'>Compras Totales: 54</Text>
          </View>
          <View className='p-4 bg-stone-800 rounded-lg w-[44%]'>
            <Text className='text-xl font-semibold text-white'>USA</Text>
            <Text className='text-lg text-gray-300 mt-2'>Núm. de Clientes: 6</Text>
            <Text className='text-lg text-gray-300 mt-2'>Compras Totales: 54</Text>
          </View>
        </View>


        <View className='bg-stone-800 p-4 rounded-lg mb-10'>
          <View className='flex flex-row'>
            <Text className='text-xl font-semibold text-white mb-2'>
              Ordenar por
            </Text>
            <TouchableOpacity onPress={() => handleTouchable('Seleccionar una forma de Ordenar', 'ordenar')}>
              <View className='bg-slate-500 rounded-full p-2 -mt-1 ml-2 mb-4'>
                <MaterialIcons name="sort" size={18} color="white" />
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView className='h-[30rem]'>
            
          <View className='bg-slate-600 p-3 rounded-lg mb-2 flex-row items-center'>
              <View className='w-[9%]'>
                  <MaterialIcons name="person" size={32} color="white" />
              </View>
              <View className='ml-4'>
                <Text className='text-lg font-semibold text-white'>Ana Martínez</Text>
                <Text className='text-gray-300'>ID: 1</Text>
                <Text className='text-gray-300'>Teléfono: +123456789</Text>
                <Text className='text-gray-300'>Correo: ana.martinez@email.com</Text>
                <Text className='text-gray-300'>Dirección: Av. Central 45, Ciudad A, País</Text>
              </View>
            </View>
            
            <View className='bg-slate-600 p-3 rounded-lg mb-2 flex-row items-center'>
              <View className='w-[9%]'>
                  <MaterialIcons name="person" size={32} color="white" />
              </View>
              <View className='ml-4'>
                <Text className='text-lg font-semibold text-white'>Carlos Rodríguez</Text>
                <Text className='text-gray-300'>ID: 2</Text>
                <Text className='text-gray-300'>Teléfono: +123987654</Text>
                <Text className='text-gray-300'>Correo: carlos.rodri@email.com</Text>
                <Text className='text-gray-300'>Dirección: Calle Norte 56, Ciudad B, País</Text>
              </View>
            </View>

            <View className='bg-slate-600 p-3 rounded-lg mb-2 flex-row items-center'>
              <View className='w-[9%]'>
                  <MaterialIcons name="person" size={32} color="white" />
              </View>
              <View className='ml-4'>
                <Text className='text-lg font-semibold text-white'>María López</Text>
                <Text className='text-gray-300'>ID: 3</Text>
                <Text className='text-gray-300'>Teléfono: +123654789</Text>
                <Text className='text-gray-300'>Correo: maria.lopez@email.com</Text>
                <Text className='text-gray-300'>Dirección: Plaza Sur 78, Ciudad C, País</Text>
              </View>
            </View>

            <View className='bg-slate-600 p-3 rounded-lg mb-2 flex-row items-center'>
              <View className='w-[9%]'>
                  <MaterialIcons name="person" size={32} color="white" />
              </View>
              <View className='ml-4'>
                <Text className='text-lg font-semibold text-white'>Luis Fernández</Text>
                <Text className='text-gray-300'>ID: 4</Text>
                <Text className='text-gray-300'>Teléfono: +123321987</Text>
                <Text className='text-gray-300'>Correo: luis.fernandez@email.com</Text>
                <Text className='text-gray-300'>Dirección: Av. del Sol 90, Ciudad D, País</Text>
              </View>
            </View>

            <View className='bg-slate-600 p-3 rounded-lg mb-2 flex-row items-center'>
              <View className='w-[9%]'>
                  <MaterialIcons name="person" size={32} color="white" />
              </View>
              <View className='ml-4'>
                <Text className='text-lg font-semibold text-white'>Isabel García</Text>
                <Text className='text-gray-300'>ID: 5</Text>
                <Text className='text-gray-300'>Teléfono: +123789456</Text>
                <Text className='text-gray-300'>Correo: isabel.garcia@email.com</Text>
                <Text className='text-gray-300'>Dirección: Calle Verde 101, Ciudad E, País</Text>
              </View>
            </View>

            <View className='bg-slate-600 p-3 rounded-lg mb-2 flex-row items-center'>
              <View className='w-[9%]'>
                  <MaterialIcons name="person" size={32} color="white" />
              </View>
              <View className='ml-4'>
                <Text className='text-lg font-semibold text-white'>Gibrán García</Text>
                <Text className='text-gray-300'>ID: 6</Text>
                <Text className='text-gray-300'>Teléfono: +123123456</Text>
                <Text className='text-gray-300'>Correo: pedro.sanchez@email.com</Text>
                <Text className='text-gray-300'>Dirección: Av. Libertad 32, Ciudad F, País</Text>
              </View>
            </View>

          </ScrollView>
        </View>
      </ScrollView>
      <View className='absolute bottom-0 right-0'>
        <TouchableOpacity onPress={() => setAddOpen(true)}>
          <View className=' bg-slate-500 rounded-full mb-3 mr-3'>
            <MaterialIcons name="add" size={48} color="white"/>
          </View>
        </TouchableOpacity>
      </View>
      <MenuItems  onSelectionChange={handleSelectionChange} isOpen={isOpen} setIsOpen={setIsOpen} topic={topic} />
      <AddClient isOpen={addOpen} setIsOpen={setAddOpen}> </AddClient>
    </View>
  );
}