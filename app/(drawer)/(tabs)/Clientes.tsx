import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import MenuItems from '@/components/MenuItems';
import AddClient from '@/components/AddClient';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const [topic, setTopic] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [clients, setClients] = React.useState<{ ClienteID: number; Nombre: string; Telefono: number; Correo: string; Direccion:string }[]>([]);
  const [lastclient, setLastClient] = React.useState<{ ClienteID: number; Nombre: string; Telefono: number; Correo: string; Direccion:string }[]>([]);
  const [clientAvailable, setClientsAvailable] = React.useState(false);
  const [clientMX, setClientMX] = React.useState<{ ClienteID: number}[]>([]);
  const [clientUSA, setClientUSA] = React.useState<{ ClienteID: number}[]>([]);
  const [orderBy, setOrderBy] = React.useState('clienteID');
  const [ascDesc, setascDesc] = React.useState('ASC');

  const filteredClients = React.useMemo(() => {
    if (!searchQuery) return clients;
    
    const query = searchQuery.toLowerCase();
    return clients.filter(client => {
      const nombre = client.Nombre?.toLowerCase() || '';
      const clienteID = client.ClienteID?.toString() || '';
      const telefono = client.Telefono?.toString() || '';
      const correo = client.Correo?.toLowerCase() || '';
      const direccion = client.Direccion?.toLowerCase() || '';

      return nombre.includes(query) ||
             clienteID.includes(query) ||
             telefono.includes(query) ||
             correo.includes(query) ||
             direccion.includes(query);
    });
  }, [clients, searchQuery]);

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
    //Esto es para el último registro
    try {
      const response = await fetch(
        `http://localhost:3000/clientes?orderBy=clienteID&ascDesc=ASC`
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
        setLastClient(clientes);
      } else {
        console.error("Expected an array, received:", data);
        setLastClient([]);
      }
    } catch (error) {
      setLastClient([]);
    }

    //Obtener Clientes en México
    try {
      const response = await fetch(
        `http://localhost:3000/clientesMX`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        const clientes = [
          ...data.map((event) => ({
            ...event
          })),
        ];
        setClientMX(clientes);
      } else {
        console.error("Expected an array, received:", data);
        setClientMX([]);
      }
    } catch (error) {
      setClientMX([]);
    }

     //Obtener Clientes en Estados Unidos
     try {
      const response = await fetch(
        `http://localhost:3000/clientesUSA`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        const clientes = [
          ...data.map((event) => ({
            ...event
          })),
        ];
        setClientUSA(clientes);
      } else {
        console.error("Expected an array, received:", data);
        setClientUSA([]);
      }
    } catch (error) {
      setClientUSA([]);
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
            <View className='flex flex-row'>
                <Text className='text-gray-300 text-lg mr-1'>Nombre:</Text>
                <Text className='text-white text-lg font-semibold'>{lastclient.at(-1)?.Nombre ? lastclient.at(-1)?.Nombre : 'Cargando...'}</Text>
            </View>
            <View className='flex flex-row'>
                <Text className='text-gray-300 text-lg mr-1'>ID:</Text>
                <Text className='text-white text-lg font-semibold'>{lastclient.at(-1)?.ClienteID ? lastclient.at(-1)?.ClienteID : 'Cargando...'}</Text>
            </View>          
          </View>
        </View>

        <View className='rounded-lg mb-4 flex-row items-center justify-start w-screen'>
          <View className='mr-4 p-4 bg-stone-800 rounded-lg w-[44%] shadow-lg'>
            <Text className='text-xl font-semibold text-white'>MX</Text>
            <View className='flex flex-row mt-2'>
                <Text className='text-gray-300 text-lg mr-1'>Núm. de Clientes:</Text>
                <Text className='text-white text-lg font-semibold'>{clientMX.length ? clientMX.length : '...'}</Text>
            </View>
          </View>
          <View className='p-4 bg-stone-800 rounded-lg w-[44%] shadow-lg'>
            <Text className='text-xl font-semibold text-white'>USA</Text>
            <View className='flex flex-row mt-2'>
                <Text className='text-gray-300 text-lg mr-1'>Núm. de Clientes:</Text>
                <Text className='text-white text-lg font-semibold'>{clientUSA.length ? clientUSA.length : '...'}</Text>
            </View>
          </View>
        </View>

        <View className='bg-stone-800 p-4 rounded-lg mb-10 shadow-lg'>
          <View className='flex flex-row justify-between items-center mb-4'>
            <View className='flex flex-row items-center'>
              <Text className='text-xl font-semibold text-white'>
                Ordenar por
              </Text>
              <TouchableOpacity onPress={() => handleTouchable('Seleccionar una forma de Ordenar | Clientes', 'ordenar')}>
                <View className='bg-slate-500 rounded-full p-2 ml-2 shadow-md'>
                  <MaterialIcons name="sort" size={18} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Barra de búsqueda */}
          <View className='mb-4'>
            <View className='bg-stone-900 rounded-lg flex-row items-center px-3 py-2'>
              <MaterialIcons name="search" size={24} color="white" className="mr-2" />
              <TextInput
                placeholder="Buscar clientes..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className='flex-1 text-white ml-2'
              />
            </View>
          </View>

          <ScrollView className={`${clientAvailable ? 'h-[30rem]' : 'h-12'} bg-stone-900 p-4 rounded-2xl`}>
            {clientAvailable ?
              <View>
                {filteredClients.map((data, key) => {
                  return (     
                    <View key={key} className='bg-slate-600 p-3 m-1 rounded-lg mb-2 flex-row items-center shadow-lg'>
                      <View className='w-[9%]'>
                        <MaterialIcons name="person" size={32} color="white" />
                      </View>
                      <View>            
                        <View className='ml-4 w-[72%]' key={key}>
                          <Text className='text-lg font-semibold text-white'>{data.Nombre}</Text>
                          <View className='flex flex-row'>
                            <Text className='text-gray-300 mr-1'>ID:</Text>
                            <Text className='text-white font-semibold'>{data.ClienteID}</Text>
                          </View>
                          <View className='flex flex-row'>
                            <Text className='text-gray-300 mr-1'>Teléfono:</Text>
                            <Text className='text-white font-semibold'>{data.Telefono}</Text>
                          </View>
                          <View className='flex flex-row'>
                            <Text className='text-gray-300 mr-1'>Correo:</Text>
                            <Text className='text-white font-semibold'>{data.Correo}</Text>
                          </View>
                          <View className='flex flex-row'>
                            <Text className='text-gray-300 mr-1'>Dirreción:</Text>
                            <Text className='text-white font-semibold'>{data.Direccion}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                })}
              </View>
              :          
              <View className='flex h-full w-full items-center justify-center'>
                <Text className='text-white font-semibold'>DATOS CARGANDO...</Text>
              </View>
            }
          </ScrollView>
        </View>
      </ScrollView>
      <View className='absolute bottom-0 right-0'>
        <TouchableOpacity onPress={() => setAddOpen(true)}>
          <View className='bg-slate-500 rounded-full mb-3 mr-3 shadow-md'>
            <MaterialIcons name="add" size={48} color="white"/>
          </View>
        </TouchableOpacity>
      </View>
      <MenuItems onSelectionChange={handleSelectionChange} isOpen={isOpen} setIsOpen={setIsOpen} topic={topic} />
      <AddClient isOpen={addOpen} setIsOpen={setAddOpen}/> 
    </View>
  );
}