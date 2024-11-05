import { View, Text, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View className='w-full h-full flex items-center justify-center bg-slate-700'>
      <View className='h-[12%] w-full bg-stone-800 flex items-center justify-center'>
        <Text className='text-2xl font-semibold text-white mt-[11%]'>
          Compras
        </Text>
      </View>
      <ScrollView className='p-5 flex-1 w-full'>
        <View className='flex flex-row items-center justify-center'>
          <Text className='text-2xl font-semibold text-white mb-5 text-center '>
            Sucursal San Luis Río Colorado
          </Text>
          <View className='bg-slate-500 rounded-full p-2 -mt-5 ml-3'>
            <MaterialIcons name="edit" size={24} color="white"/>
          </View>
        </View>

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center'>
            <View className='w-[9%]'>
                <MaterialIcons name="chair" size={24} color="white" />
            </View>
          <View className='ml-4'>
            <Text className='text-xl font-semibold text-white'>Último Compra Realizada en Sucursal</Text>
            <Text className='text-lg text-gray-300 mt-2'>Producto: Silla de Oficina</Text>
            <Text className='text-lg text-gray-300'>Cantidad: 15</Text>
            <Text className='text-lg text-gray-300'>Precio: $450.00</Text>
            <Text className='text-lg text-gray-300'>Fecha: 03/11/2024</Text>
          </View>
        </View>

        <View className='bg-stone-800 p-4 rounded-lg mb-10'>
          <Text className='text-xl font-semibold text-white mb-2'>Compras Recientes</Text>
          
          <View className='bg-slate-600 p-3 rounded-lg mb-2 flex-row items-center'>
            <View className='w-[9%]'>
                <MaterialIcons name="chair" size={24} color="white" />
            </View>
            <View className='ml-4'>
              <Text className='text-lg font-semibold text-white'>Silla de Oficina</Text>
              <Text className='text-gray-300'>Precio: $450.00</Text>
              <Text className='text-gray-300'>Cantidad: 15</Text>
              <Text className='text-gray-300'>Fecha: 03/11/2024</Text>
            </View>
          </View>
          
          <View className='bg-slate-600 p-3 rounded-lg mb-2 flex-row items-center'>
            <View className='w-[9%]'>
                <FontAwesome name="bed" size={24} color="white" />
            </View>
            <View className='ml-4'>
              <Text className='text-lg font-semibold text-white'>Cama Matrimonial</Text>
              <Text className='text-gray-300'>Precio: $1200.00</Text>
              <Text className='text-gray-300'>Cantidad: 8</Text>
              <Text className='text-gray-300'>Fecha: 03/11/2024</Text>
            </View>
          </View>

          <View className='bg-slate-600 p-3 rounded-lg mb-2 flex-row items-center'>
            <View className='w-[9%]'>
                <MaterialIcons name="chair" size={24} color="white" />
            </View>
            <View className='ml-4'>
              <Text className='text-lg font-semibold text-white'>Sofá Seccional</Text>
              <Text className='text-gray-300'>Precio: $3000.00</Text>
              <Text className='text-gray-300'>Cantidad: 5</Text>
              <Text className='text-gray-300'>Fecha: 03/11/2024</Text>
            </View>
          </View>

          <View className='bg-slate-600 p-3 rounded-lg mb-2 flex-row items-center'>
            <View className='w-[9%]'>
                <FontAwesome name="table" size={24} color="white" />
            </View>
            <View className='ml-4'>
              <Text className='text-lg font-semibold text-white'>Mesa de Comedor</Text>
              <Text className='text-gray-300'>Precio: $900.00</Text>
              <Text className='text-gray-300'>Cantidad: 10</Text>
              <Text className='text-gray-300'>Fecha: 03/11/2024</Text>
            </View>
          </View>

          <View className='bg-slate-600 p-3 rounded-lg mb-2 flex-row items-center'>
            <View className='w-[9%]'>
                <FontAwesome name="book" size={24} color="white" />
            </View>
            <View className='ml-4'>
              <Text className='text-lg font-semibold text-white'>Estante para Libros</Text>
              <Text className='text-gray-300'>Precio: $600.00</Text>
              <Text className='text-gray-300'>Cantidad: 20</Text>
              <Text className='text-gray-300'>Fecha: 03/11/2024</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className='absolute bottom-0 right-0 bg-slate-500 rounded-full mb-3 mr-3'>
        <MaterialIcons name="add" size={48} color="white"/>
      </View>
    </View>
  );
}