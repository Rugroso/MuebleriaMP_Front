import { View, Text, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View className='w-full h-full flex items-center justify-center bg-slate-700'>
      <View className='h-[12%] w-full bg-stone-800 flex items-center justify-center'>
        <Text className='text-2xl font-semibold text-white mt-[11%]'>
          Home
        </Text>
      </View>
      <ScrollView className='p-5 flex-1 w-full'>
        <Text className='text-2xl font-semibold text-white mb-5 text-center'>
          Bienvenido de nuevo, Abraham
        </Text>
        <Text className='text-2xl font-semibold text-white mb-5 text-start'>
          Resumen General
        </Text>

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center'>
          <MaterialIcons name="shopping-cart" size={24} color="white" />
          <View className='ml-4'>
            <Text className='text-xl font-semibold text-white'>Última Venta Realizada</Text>
            <Text className='text-lg text-gray-300 mt-2'>Producto: Silla de Oficina</Text>
            <Text className='text-lg text-gray-300'>Fecha: 03/11/2024</Text>
            <Text className='text-lg text-gray-300'>Total: $450.00</Text>
          </View>
        </View>

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center'>
          <FontAwesome name="truck" size={24} color="white" />
          <View className='ml-4'>
            <Text className='text-xl font-semibold text-white'>Última Compra Realizada</Text>
            <Text className='text-lg text-gray-300 mt-2'>Proveedor: Muebles XYZ</Text>
            <Text className='text-lg text-gray-300'>Fecha: 02/11/2024</Text>
            <Text className='text-lg text-gray-300'>Total: $1,200.00</Text>
          </View>
        </View>

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center'>
          <MaterialIcons name="attach-money" size={24} color="white" />
          <View className='ml-4'>
            <Text className='text-xl font-semibold text-white'>Venta del Día</Text>
            <Text className='text-lg text-gray-300 mt-2'>Total Ventas: $2,000.00</Text>
            <Text className='text-lg text-gray-300'>Productos Vendidos: 15</Text>
          </View>
        </View>

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center'>
          <FontAwesome name="archive" size={24} color="white" />
          <View className='ml-4'>
            <Text className='text-xl font-semibold text-white'>Inventario Total</Text>
            <Text className='text-lg text-gray-300 mt-2'>Productos en Inventario: 350</Text>
            <Text className='text-lg text-gray-300'>Valor Estimado: $45,000.00</Text>
          </View>
        </View>

        <View className='bg-stone-800 p-4 rounded-lg mb-10 flex-row items-center'>
          <MaterialIcons name="pending-actions" size={24} color="white" />
          <View className='ml-4'>
            <Text className='text-xl font-semibold text-white'>Pedidos Pendientes</Text>
            <Text className='text-lg text-gray-300 mt-2'>Pedidos en Proceso: 4</Text>
            <Text className='text-lg text-gray-300'>Pedidos Pendientes de Entrega: 2</Text>
          </View>
        </View>
      </ScrollView>

    </View>
  );
}