import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import MenuItems from '@/components/MenuItems';
import AddBuy from '@/components/AddBuy';


import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
interface Item {
  name: string;
};

export default function HomeScreen() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const [topic, setTopic] = React.useState('');
  const [compras, setCompras] = React.useState<{ Cantidad : number, Nombre_Mueble: string, Precio: number, Nombre_Distribuidor: string, FechaCompra: Date }[]>([]);
  const [establecimiento, setEstablecimiento] = React.useState(1);
  const [comprasAvailable, setComprasAvailable] = React.useState(false);
  const [selectedSucursal, setSelectedSucursal] = React.useState('CDMX');

  const fetchCompras = async () => {
    try {
      const response = await fetch(
        `https://d40c-2806-2f0-1081-fc76-c1b5-1075-253d-c071.ngrok-free.app/comprasestablecimmiento?id=${establecimiento}`
      );
      const data = await response.json();
      if(Array.isArray(data)) {
        const compras = data.map((event) => ({
          ...event,
          FechaCompra: new Date(event.FechaCompra)
        }));
        setCompras(compras);
        setComprasAvailable(true);
      }
    } catch(e) {
      setCompras([]);
      setComprasAvailable(false);
    }
  };

  React.useEffect(() => {
    fetchCompras(); // Fetch inicial
    const intervalId = setInterval(fetchCompras, 1000);
    return () => clearInterval(intervalId);
  }, [establecimiento]);
  
  

  const handleSelectionChange = (value:any, topic:string) => {
    if (topic==='Seleccionar una Sucursal') {
      if(value==='CDMX') {
        setEstablecimiento(1)
        setSelectedSucursal('CDMX')
      }
      if(value==='Los Angeles') {
        setEstablecimiento(2)
        setSelectedSucursal('Los Angeles')
      }
      if(value==='Guadalajara') {
        setEstablecimiento(3)
        setSelectedSucursal('Guadalajara')
      }
      if(value==='Houston') {
        setEstablecimiento(4)
        setSelectedSucursal('Houston')
      }
      if(value==='Monterrey') {
        setEstablecimiento(5)
        setSelectedSucursal('Monterrey')
      }
      if(value==='Chicago') {
        setEstablecimiento(6)
        setSelectedSucursal('Chicago')
      }
      if(value==='Puebla') {
        setEstablecimiento(7)
        setSelectedSucursal('Puebla')
      }
      if(value==='New York') {
        setEstablecimiento(8)
        setSelectedSucursal('New York')
      }
      if(value==='Tijuana') {
        setEstablecimiento(9)
        setSelectedSucursal('Tijuana')
      }
      if(value==='San Francisco') {
        setEstablecimiento(10)
        setSelectedSucursal('San Francisco')
      }
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
          Compras
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
            <View className='w-[9%]'>
                <MaterialIcons name="chair" size={32} color="white" />
            </View>
          <View className='ml-4'>
            <Text className='text-xl font-semibold text-white'>Último Mueble Comprado</Text>
            <Text className='text-lg text-gray-300 mt-2'>Producto: {compras.at(-1)?.Nombre_Mueble}</Text>
            <Text className='text-lg text-gray-300'>Cantidad: {compras.at(-1)?.Cantidad}</Text>
            <Text className='text-lg text-gray-300'>Precio: {compras.at(-1)?.Precio}</Text>
            <Text className='text-lg text-gray-300'>Fecha: {compras.at(-1)?.FechaCompra?.toLocaleDateString()}</Text>
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
          <ScrollView className={`${comprasAvailable ? 'h-[30rem]': 'h-12'}`}>
          {comprasAvailable ? 
            <View>
              {compras.map((data, index) => {
                return (
                  <View key={`${data.Nombre_Mueble}-${data.FechaCompra.getTime()}-${index}`} className='bg-slate-600 p-3 rounded-lg mb-2 flex-row items-center'>
                  <View className='w-[9%]'>
                    <MaterialIcons name="chair" size={32} color="white" />
                  </View>
                  <View>            
                    <View className='ml-4 w-[95%]'>
                      <Text className='text-lg font-semibold text-white'>{data.Nombre_Mueble}</Text>
                      <Text className='text-gray-300'>Precio: {data.Precio}</Text>
                      <Text className='text-gray-300'>Cantidad: {data.Cantidad}</Text>
                      <Text className='text-gray-300'>Fecha: {new Date(data.FechaCompra).toLocaleDateString()}</Text>
                    </View>
                  </View>
                </View>
                )
              })}
            </View>
          :
          <View className='flex h-full w-full items-center justify-center'>
            <Text className='text-white text-2xl font-semibold'>DATOS CARGANDO...</Text>
          </View>
          }
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
      <AddBuy isOpen={addOpen} setIsOpen={setAddOpen}></AddBuy>
    </View>
  );
}