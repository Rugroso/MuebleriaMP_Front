import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import MenuItems from '@/components/MenuItems';

import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const [topic, setTopic] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [inventario, setInventario] = React.useState<{ Cantidad: number, Nombre: string, Precio: number } []>([]);
  const [ultimoInventario, setUltimoInventario] = React.useState<{ Cantidad: number, Nombre_Mueble: string, Precio: number } []>([]);
  const [ultimoInventarioAvailable, setUltimoInventarioAvailable] = React.useState(false);
  const [establecimiento, setEstablecimiento] = React.useState(1);
  const [orderBy, setOrderBy] = React.useState('clienteID');
  const [ascDesc, setascDesc] = React.useState('ASC');
  const [inventarioAvailable, setinventarioAvailable] = React.useState(false);
  const [selectedSucursal, setSelectedSucursal] = React.useState('CDMX');

  const filteredInventario = React.useMemo(() => {
    if (!searchQuery) return inventario;
    
    const query = searchQuery.toLowerCase();
    return inventario.filter(item => {
      const nombre = item.Nombre?.toLowerCase() || '';
      const precio = item.Precio?.toString() || '';
      const cantidad = item.Cantidad?.toString() || '';

      return nombre.includes(query) ||
             precio.includes(query) ||
             cantidad.includes(query);
    });
  }, [inventario, searchQuery]);

  const fetchInventario = async () => {
    try{
      const response = await fetch(
        `http://localhost:3000/inventarioestablecimiento?EstablecimientoID=${establecimiento}&orderBy=${orderBy}&ascDesc=${ascDesc}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        const inventario = [
          ...data.map((event) => ({
            Cantidad: event.Cantidad,
            Nombre: event.Nombre,
            Precio: event.Precio,
          })),
        ];
        setInventario(inventario);
        setinventarioAvailable(true);
      } else{
        console.error("Expected an array, received:", data);
        setinventarioAvailable(false);
        setInventario([]);
      }
    } catch(e) {
      setinventarioAvailable(false);
      setInventario([]);
    }
  };

  const fetchUltimoInventario = async () => {
    try{
      const response = await fetch(
        `http://localhost:3000/comprasestablecimiento?EstablecimientoID=${establecimiento}&orderBy=FechaVenta&ascDesc=ASC`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        const inventario = [
          ...data.map((event) => ({
            Cantidad: event.Cantidad,
            Nombre_Mueble: event.Nombre_Mueble,
            Precio: event.Precio,
          })),
        ];
        setUltimoInventario(inventario);
        setUltimoInventarioAvailable(true);
      } else{
        console.error("Expected an array, received:", data);
        setUltimoInventarioAvailable(false);
        setUltimoInventario([]);
      }
    } catch(e) {
      setUltimoInventarioAvailable(false);
      setUltimoInventario([]);
    }
  };

  React.useEffect(() => {
    fetchUltimoInventario();
    const intervalId = setInterval(fetchUltimoInventario, 1000);
    return () => clearInterval(intervalId);
  }, [establecimiento]);

  React.useEffect(() => {
    fetchInventario();
    const intervalId = setInterval(fetchInventario, 1000);
    return () => clearInterval(intervalId);
  }, [establecimiento, orderBy, ascDesc]);

  React.useEffect(() => {
    fetchInventario()
  }, [orderBy, ascDesc]);

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
    if (topic==='Seleccionar una forma de Ordenar | Inventario') {
      if(value==='Nombre - A-Z') {
        setOrderBy('Nombre');
        setascDesc('ASC');
      }
      else if(value==='Nombre - Z-A') {
        setOrderBy('Nombre');
        setascDesc('DESC');
      }
      else if(value==='Precio - Menor a Mayor') {
        setOrderBy('Precio');
        setascDesc('ASC');
      }
      else if(value==='Precio - Mayor a Menor') {
        setOrderBy('Precio');
        setascDesc('DESC');
      }
      else if(value==='Cantidad - Menor a Mayor') {
        setOrderBy('Cantidad');
        setascDesc('ASC');
      }
      else if(value==='Cantidad - Mayor a Menor') {
        setOrderBy('Cantidad');
        setascDesc('DESC');
      }
    }
    setIsOpen(false);
  };

  const handleTouchable = (topic:string, itemsType:string) => {
    setTopic(topic);
    setIsOpen(true);
  }

  return (
    <View className='w-full h-full flex items-center justify-center bg-slate-800'>
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

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center shadow-lg' >
            <View className='w-[32px]'>
                <MaterialIcons name="inventory" size={32} color="white" />
            </View>
          <View className='ml-4 w-[90%]'>
            <Text className='text-xl font-bold text-white'>Último Mueble Añadido a Inventario</Text>
            <View className='flex flex-row'>
              <Text className='text-gray-300 text-lg mr-1'>Producto:</Text>
              <Text className='text-white font-semibold text-lg'>{ultimoInventario.at(-1)?.Nombre_Mueble ? ultimoInventario.at(-1)?.Nombre_Mueble : 'Cargando...'}</Text>
            </View>
            <View className='flex flex-row'>
              <Text className='text-gray-300 text-lg mr-1'>Cantidad:</Text>
              <Text className='text-white font-semibold text-lg'>{ultimoInventario.at(-1)?.Cantidad ? ultimoInventario.at(-1)?.Cantidad : 'Cargando...'}</Text>
            </View>
            <View className='flex flex-row'>
              <Text className='text-gray-300 text-lg mr-1'>Precio Unitario:</Text>
              <Text className='text-white font-semibold text-lg'>{ultimoInventario.at(-1)?.Precio ? `$${ultimoInventario.at(-1)?.Precio}` : 'Cargando...'}</Text>
            </View>
          </View>
        </View>

        <View className='bg-stone-800 p-4 rounded-lg mb-10 shadow-lg'>
          <View className='flex flex-row justify-between items-center mb-4'>
            <View className='flex flex-row items-center'>
              <Text className='text-xl font-semibold text-white'>
                Ordenar por
              </Text>
              <TouchableOpacity onPress={() => handleTouchable('Seleccionar una forma de Ordenar | Inventario', 'ordenar')}>
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
                placeholder="Buscar en inventario..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className='flex-1 text-white ml-2'
              />
            </View>
          </View>

          <ScrollView className={`${inventarioAvailable ? 'h-[30rem]' : 'h-12'} bg-stone-900 p-4 rounded-2xl`}>
          {inventarioAvailable ?
          <View>
          {filteredInventario.map((data, key) => {
            return (
              <View key={key} className='bg-slate-600 p-3 m-1 rounded-lg mb-2 flex-row items-center shadow-md'>
                <View className='w-[9%]'>
                  <MaterialIcons name="inventory" size={32} color="white" />
                </View>
                <View>            
                  <View className='ml-4 w-[95%]'>
                    <Text className='text-lg font-semibold text-white'>{data.Nombre}</Text>
                    <View className='flex flex-row'>
                      <Text className='text-gray-300 mr-1'>Precio Unitario:</Text>
                      <Text className='text-white font-semibold'>${data.Precio}</Text>
                    </View>
                    <View className='flex flex-row'>
                      <Text className='text-gray-300 mr-1'>Cantidad:</Text>
                      <Text className='text-white font-semibold'>{data.Cantidad}</Text>
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
      <MenuItems onSelectionChange={handleSelectionChange} isOpen={isOpen} setIsOpen={setIsOpen} topic={topic} />
    </View>
  );
}