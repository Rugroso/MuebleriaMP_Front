import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import MenuItems from '@/components/MenuItems';
import AddBuy from '@/components/AddBuy';


import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

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
          Inventario
        </Text>
      </View>
      <ScrollView className='p-5 flex-1 w-full'>
        <View className='flex flex-row items-center justify-center'>
           <Text className='text-2xl font-semibold text-white mb-5 text-center '>
            {`Sucursal ${selectedSucursal}`}
          </Text>  
          <TouchableOpacity onPress={() => handleTouchable('Seleccionar una Sucursal', 'sucursales')}>
            <View className='bg-slate-500 rounded-full p-2 -mt-5 ml-3'>
              <MaterialIcons name="edit" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center'>
            <View className='w-[32px]'>
                <MaterialIcons name="chair" size={32} color="white" />
            </View>
          <View className='ml-4 w-[90%]'>
            <Text className='text-xl font-semibold text-white'>Último Mueble Añadido a Inventario</Text>
            <Text className='text-lg text-gray-300 mt-2'>Producto: Silla de Oficina</Text>
            <Text className='text-lg text-gray-300'>Cantidad: 15</Text>
            <Text className='text-lg text-gray-300'>Precio: $450.00</Text>
            <Text className='text-lg text-gray-300'>Fecha: 03/11/2024</Text>
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
              <View className='w-[32px]'>
                  <MaterialIcons name="chair" size={32} color="white" />
              </View>
              <View className='ml-4'>
                <Text className='text-lg font-semibold text-white'>Silla de Oficina</Text>
                <Text className='text-gray-300'>Precio: $450.00</Text>
                <Text className='text-gray-300'>Cantidad: 15</Text>
              </View>
            </View>
            
            <View className='bg-slate-600 p-3 rounded-lg mb-2 flex-row items-center'>
              <View className='w-[32px]'>
                  <FontAwesome name="bed" size={27} color="white" />
              </View>
              <View className='ml-4'>
                <Text className='text-lg font-semibold text-white'>Cama Matrimonial</Text>
                <Text className='text-gray-300'>Precio: $1200.00</Text>
                <Text className='text-gray-300'>Cantidad: 8</Text>
              </View>
            </View>

            <View className='bg-slate-600 p-3 rounded-lg mb-2 flex-row items-center'>
              <View className='w-[32px]'>
                  <MaterialIcons name="chair" size={32} color="white" />
              </View>
              <View className='ml-4'>
                <Text className='text-lg font-semibold text-white'>Sofá Seccional</Text>
                <Text className='text-gray-300'>Precio: $3000.00</Text>
                <Text className='text-gray-300'>Cantidad: 5</Text>
              </View>
            </View>

            <View className='bg-slate-600 p-3 rounded-lg mb-2 flex-row items-center'>
              <View className='w-[32px]'>
                  <FontAwesome name="table" size={32} color="white" />
              </View>
              <View className='ml-4'>
                <Text className='text-lg font-semibold text-white'>Mesa de Comedor</Text>
                <Text className='text-gray-300'>Precio: $900.00</Text>
                <Text className='text-gray-300'>Cantidad: 10</Text>
              </View>
            </View>

            <View className='bg-slate-600 p-3 rounded-lg mb-2 flex-row items-center'>
              <View className='w-[32px]'>
                  <FontAwesome name="book" size={32} color="white" />
              </View>
              <View className='ml-4'>
                <Text className='text-lg font-semibold text-white'>Estante para Libros</Text>
                <Text className='text-gray-300'>Precio: $600.00</Text>
                <Text className='text-gray-300'>Cantidad: 20</Text>
              </View>
            </View>

            <View className='bg-slate-600 p-3 rounded-lg mb-2 flex-row items-center'>
              <View className='w-[32px]'>
                  <FontAwesome name="book" size={32} color="white" />
              </View>

              <View className='ml-4'>
                <Text className='text-lg font-semibold text-white'>Estante para Libros</Text>
                <Text className='text-gray-300'>Precio: $600.00</Text>
                <Text className='text-gray-300'>Cantidad: 20</Text>
              </View>
            </View>

          </ScrollView>
        </View>
      </ScrollView>
      <MenuItems  onSelectionChange={handleSelectionChange} isOpen={isOpen} setIsOpen={setIsOpen} topic={topic} />
      <AddBuy isOpen={addOpen} setIsOpen={setAddOpen}></AddBuy>
    </View>
  );
}