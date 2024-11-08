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
          <MaterialIcons name="attach-money" size={32} color="white" />
          <View className='ml-4'>
            <Text className='text-xl font-semibold text-white'>Venta del Día</Text>
            <Text className='text-lg text-gray-300 mt-2'>Total Ventas: $2,000.00</Text>
            <Text className='text-lg text-gray-300'>Productos Vendidos: 15</Text>
          </View>
        </View>

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center'>
          <FontAwesome name="archive" size={32} color="white" />
          <View className='ml-4'>
            <Text className='text-xl font-semibold text-white'>Inventario Total</Text>
            <Text className='text-lg text-gray-300 mt-2'>Productos en Inventario: 350</Text>
            <Text className='text-lg text-gray-300'>Valor Estimado: $45,000.00</Text>
          </View>
        </View>

        <Text className='text-2xl font-semibold text-white mb-5 text-start'>
          Reportes Disponibles
        </Text>

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center justify-between'>
        <View className='flex-row flex items-center'>
          <FontAwesome name="money" size={32} color="white" />
          <View className='ml-4 w-[80%]'>
            <Text className='text-xl font-semibold text-white'>Compras Mensuales</Text>
          </View>
          </View>
          <View>
            <FontAwesome name="arrow-right" size={18} color="white" />
          </View>
        </View>

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center justify-between'>
        <View className='flex-row flex items-center'>
          <FontAwesome name="money" size={32} color="white" />
          <View className='ml-4 w-[80%]'>
            <Text className='text-xl font-semibold text-white'>Ventas Mensuales</Text>
          </View>
          </View>
          <View>
            <FontAwesome name="arrow-right" size={18} color="white" />
          </View>
        </View>

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center justify-between'>
          <View className='flex-row flex items-center'>
            <FontAwesome name="table" size={32} color="white" />
            <View className='ml-4 w-[80%]'>
              <Text className='text-xl font-semibold text-white'>Muebles Faltantes por Sucursal</Text>
            </View>
          </View>
          <View>
            <FontAwesome name="arrow-right" size={18} color="white" />
          </View>
        </View>

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center justify-between'>
        <View className='flex-row flex items-center'>
          <FontAwesome name="table" size={32} color="white" />
          <View className='ml-4 w-[80%]'>
            <Text className='text-xl font-semibold text-white'>Clientes en Estado de Crédito</Text>
          </View>
          </View>
          <View>
            <FontAwesome name="arrow-right" size={18} color="white" />
          </View>
        </View>


      </ScrollView>

    </View>
  );
}