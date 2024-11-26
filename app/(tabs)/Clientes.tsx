import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import MenuItems from '@/components/MenuItems';
import AddClient from '@/components/AddClient';


import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { setConfig } from 'tamagui';


export default function HomeScreen() {


  const [isOpen, setIsOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const [topic, setTopic] = React.useState('');
  const [size, setSize] = React.useState(0);
  const [clients, setClients] = React.useState<{ ClienteID: number; Nombre: string; Telefono: number; Correo: string; Direccion:string }[]>([]);
  const [clientAvailable, setClientsAvailable] = React.useState(false)
  const [orderBy, setOrderBy] = React.useState('clienteID');
  const [ascDesc, setascDesc] = React.useState('ASC');

  const fetchClients = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/clientes?orderBy=${orderBy}&ascDesc=${ascDesc}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        const clientes = [
          ...data.map((event) => ({
            ClienteID: event.ClienteID,
            Nombre: event.Nombre,
            Telefono: event.Telefono,
            Correo: event.Correo,
            Direccion: event.Direccion,
          })),
        ];
        setClients(clientes);
        setClientsAvailable(true)
      } else {
        console.error("Expected an array, received:", data);
        setClientsAvailable(false)
        setClients([]);
      }
    } catch (error) {
      setClientsAvailable(false)
      setClients([]);
    }
  };

  React.useEffect(() => {
    const intervalId = setInterval(fetchClients, 1000);
    return () => clearInterval(intervalId);
  }, [orderBy, ascDesc]);

  React.useEffect(() => {
    fetchClients()
  }, [orderBy, ascDesc]);


  const handleSelectionChange = (value:any, topic:string) => {
    setIsOpen(false);
    console.log(value)
    if (topic==='Seleccionar una forma de Ordenar | Clientes') {
      if(value==='ID - Menor a Mayor') {
        setOrderBy('ClienteID');
        setascDesc('ASC');
      }
      else if(value==='ID - Mayor a Menor') {
        setOrderBy('ClienteID');
        setascDesc('DESC');
      }
      else if(value==='Nombre - A-Z') {
        setOrderBy('Nombre');
        setascDesc('ASC');
      }
      else if(value==='Nombre - Z-A') {
        setOrderBy('Nombre');
        setascDesc('DESC');
      }
      }

      
  };

  const handleTouchable = (topic:string, itemsType:string) => {
    setTopic(topic);
    setIsOpen(true);
  }

  return (
    <View className='w-full h-full flex items-center justify-center bg-slate-800'>
      <View className='h-[12%] w-full bg-stone-800 flex items-center justify-center'>
        <Text className='text-2xl font-semibold text-white mt-[11%]'>
          Clientes
        </Text>
      </View>
      <ScrollView className='p-5 flex-1 w-full'>

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center shadow-lg'>
            <View className='w-[9%]'>
                <MaterialIcons name="person" size={32} color="white" />
            </View>
          <View className='ml-4'>
            <Text className='text-xl font-semibold text-white'>Último Cliente Registrado</Text>
            <Text className='text-lg text-gray-300 mt-2'>Nombre: Sarah Williams</Text>
            <Text className='text-lg text-gray-300'>ID: 10</Text>
          </View>
        </View>

        <View className='rounded-lg mb-4 flex-row items-center justify-start w-screen'>
        <View className='mr-4 p-4 bg-stone-800 rounded-lg w-[44%] shadow-lg'>
            <Text className='text-xl font-semibold text-white'>MX</Text>
            <Text className='text-lg text-gray-300 mt-2'>Núm. de Clientes: 6</Text>
            <Text className='text-lg text-gray-300 mt-2'>Compras Totales: 54</Text>
          </View>
          <View className='p-4 bg-stone-800 rounded-lg w-[44%] shadow-lg'>
            <Text className='text-xl font-semibold text-white'>USA</Text>
            <Text className='text-lg text-gray-300 mt-2'>Núm. de Clientes: 6</Text>
            <Text className='text-lg text-gray-300 mt-2'>Compras Totales: 54</Text>
          </View>
        </View>


        <View className='bg-stone-800 p-4 rounded-lg mb-10 shadow-lg'>
          <View className='flex flex-row'>
            <Text className='text-xl font-semibold text-white mb-2'>
              Ordenar por
            </Text>
            <TouchableOpacity onPress={() => handleTouchable('Seleccionar una forma de Ordenar | Clientes', 'ordenar')}>
              <View className='bg-slate-500 rounded-full p-2 -mt-1 ml-2 mb-4 shadow-md'>
                <MaterialIcons name="sort" size={18} color="white" />
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView className={`${clientAvailable ? 'h-[30rem]' : 'h-12'}`}>
          {clientAvailable?
          <View>
          {clients.map((data, key) => {
                    return (     
                      <View className='bg-slate-600 p-3 rounded-lg mb-2 flex-row items-center shadow-lg'>
                        <View className='w-[9%]'>
                            <MaterialIcons name="person" size={32} color="white" />
                        </View>
                      <View>            
                      <View className='ml-4 w-[95%]' key={key}>
                        <Text className='text-lg font-semibold text-white'>{data.Nombre}</Text>
                        <Text className='text-gray-300'>ID: {data.ClienteID}</Text>
                        <Text className='text-gray-300'>Teléfono: {data.Telefono}</Text>
                        <Text className='text-gray-300'>Correo: {data.Correo}</Text>
                        <Text className='text-gray-300'>Dirección: {data.Direccion}</Text>
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
          <View className=' bg-slate-500 rounded-full mb-3 mr-3 shadow-md'>
            <MaterialIcons name="add" size={48} color="white"/>
          </View>
        </TouchableOpacity>
      </View>
      <MenuItems onSelectionChange={handleSelectionChange} isOpen={isOpen} setIsOpen={setIsOpen} topic={topic} />
      <AddClient isOpen={addOpen} setIsOpen={setAddOpen}/> 
    </View>
  );
}