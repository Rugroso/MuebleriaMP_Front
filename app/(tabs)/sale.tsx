import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import MenuItems from '@/components/MenuItems';
import AddSale from '@/components/addSale';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
interface Item {
  name: string;
};

export default function HomeScreen() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const [topic, setTopic] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [ventas, setVentas] = React.useState<{ Cantidad: number, Nombre_Mueble: string, Precio: number, Nombre_Cliente: string, FechaVenta: Dayjs, Venta_Total:number, CantidadPagada: number}[]>([]);
  const [ultimaVenta, setUltimaVenta] = React.useState<{ Cantidad: number, Nombre_Mueble: string, Precio: number, Nombre_Cliente: string, FechaVenta: Dayjs, Venta_Total:number, CantidadPagada: number}[]>([]);
  const [ventasAvailable, setVentasAvailable] = React.useState(false);
  const [ultimaVentaAvailable, setUltimaVentaAvailable] = React.useState(false);
  const [establecimiento, setEstablecimiento] = React.useState(1);
  const [selectedSucursal, setSelectedSucursal] = React.useState('CDMX');
  const [orderBy, setOrderBy] = React.useState('FechaVenta');
  const [ascDesc, setascDesc] = React.useState('DESC');

  const filteredVentas = React.useMemo(() => {
    if (!searchQuery) return ventas;
    
    const query = searchQuery.toLowerCase();
    return ventas.filter(venta => {
      const nombreMueble = venta.Nombre_Mueble?.toLowerCase() || '';
      const nombreCliente = venta.Nombre_Cliente?.toLowerCase() || '';
      const precio = venta.Venta_Total?.toString() || '';
      const cantidad = venta.Cantidad?.toString() || '';
      const cantidadPagada = venta.CantidadPagada?.toString() || '';

      return nombreMueble.includes(query) ||
             nombreCliente.includes(query) ||
             precio.includes(query) ||
             cantidad.includes(query) ||
             cantidadPagada.includes(query);
    });
  }, [ventas, searchQuery]);

  const fetchVentas = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/ventasestablecimiento?EstablecimientoID=${establecimiento}&orderBy=${orderBy}&ascDesc=${ascDesc}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        const ventas = data.map((event) => ({
          ...event,
          FechaVenta: dayjs.utc(event.FechaVenta),
          Venta_Total: event.Venta_Total,
          CantidadPagada: event.CantidadPagada
        }));
        setVentas(ventas);
        setVentasAvailable(true);
      } else {
        console.error("Expected an array, received:", data);
        setVentasAvailable(false);
        setVentas([]);
      }
    } catch (error) {
      setVentasAvailable(false);
      setVentas([]);
    }
  };

  const fetchUltimaVenta = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/ventasestablecimiento?EstablecimientoID=${establecimiento}&orderBy=FechaVenta&ascDesc=ASC`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        const ventas = data.map((event) => ({
          ...event,
          FechaVenta: dayjs.utc(event.FechaVenta),
          Venta_Total: event.Venta_Total,
          CantidadPagada: event.CantidadPagada
        }));
        setUltimaVenta(ventas);
        setUltimaVentaAvailable(true);
      } else {
        console.error("Expected an array, received:", data);
        setUltimaVentaAvailable(false);
        setUltimaVenta([]);
      }
    } catch (error) {
      setUltimaVentaAvailable(false);
      setUltimaVenta([]);
    }
  };

  React.useEffect(() => {
    fetchUltimaVenta();
    const intervalId = setInterval(fetchUltimaVenta, 1000); 
    return () => clearInterval(intervalId);
  }, [establecimiento]);

  React.useEffect(() => {
    fetchVentas();
    const intervalId = setInterval(fetchVentas, 1000); 
    return () => clearInterval(intervalId);
  }, [establecimiento, orderBy, ascDesc]);

  React.useEffect(() => {
    console.log(orderBy);
    console.log(ascDesc)
    fetchVentas();
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
    if (topic === 'Seleccionar una forma de Ordenar') {
      if (value === 'Fecha - Menor a Mayor') {
        setOrderBy('FechaVenta');
        setascDesc('ASC');
      }
      else if (value === 'Fecha - Mayor a Menor') {
        setOrderBy('FechaVenta');
        setascDesc('DESC');
      }
      else if (value === 'Precio - Menor a Mayor') {
        setOrderBy('Precio');
        setascDesc('ASC');
      } else if (value === 'Precio - Mayor a Menor') {
        setOrderBy('Precio');
        setascDesc('DESC');
      } else if (value === 'Cantidad - Menor a Mayor') {
        setOrderBy('Cantidad');
        setascDesc('ASC');
      } else if (value === 'Cantidad - Mayor a Menor') {
        setOrderBy('Cantidad');
        setascDesc('DESC');
      } else if (value === 'Nombre - A-Z') {
        setOrderBy('Nombre');
        setascDesc('ASC');
      } else if (value === 'Nombre - Z-A') {
        setOrderBy('Nombre');
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
          Ventas
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

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center shadow-lg'>
            <View className='w-[9%]'>
                <MaterialIcons name="receipt" size={32} color="white" />
            </View>
          <View className='ml-4'>
            <Text className='text-xl font-semibold text-white'>Último Mueble Vendido</Text>
            {ventasAvailable && ultimaVenta.length > 0 ? (
              <>
                <View className='flex flex-row'>
                  <Text className='text-gray-300 text-lg mr-1'>Producto:</Text>
                  <Text className='text-white font-semibold text-lg'>{ultimaVenta.at(-1)?.Nombre_Mueble}</Text>
                </View>
                <View className='flex flex-row'>
                  <Text className='text-gray-300 text-lg mr-1'>Cantidad:</Text>
                  <Text className='text-white font-semibold text-lg'>{ultimaVenta.at(-1)?.Cantidad}</Text>
                </View>
                <View className='flex flex-row'>
                  <Text className='text-gray-300 text-lg mr-1'>Total:</Text>
                  <Text className='text-white font-semibold text-lg'>${ultimaVenta.at(-1)?.Venta_Total}</Text>
                </View>
                <View className='flex flex-row'>
                  <Text className='text-gray-300 text-lg mr-1'>Cantidad Pagada:</Text>
                  <Text className='text-white font-semibold text-lg'>${ultimaVenta.at(-1)?.CantidadPagada}</Text>
                </View>
                <View className='flex flex-row'>
                  <Text className='text-gray-300 text-lg mr-1'>Fecha:</Text>
                  <Text className='text-white font-semibold text-lg'>{ultimaVenta.at(-1)?.FechaVenta.format('DD/MM/YYYY HH:mm')}</Text>
                </View>
              </>
            ) : (
              <>
                <View className='flex flex-row'>
                  <Text className='text-gray-300 text-lg mr-1'>Producto:</Text>
                  <Text className='text-white font-semibold text-lg'>Cargando...</Text>
                </View>
                <View className='flex flex-row'>
                  <Text className='text-gray-300 text-lg mr-1'>Cantidad:</Text>
                  <Text className='text-white font-semibold text-lg'>Cargando...</Text>
                </View>
                <View className='flex flex-row'>
                  <Text className='text-gray-300 text-lg mr-1'>Total:</Text>
                  <Text className='text-white font-semibold text-lg'>Cargando...</Text>
                </View>
                <View className='flex flex-row'>
                  <Text className='text-gray-300 text-lg mr-1'>Cantidad Pagada:</Text>
                  <Text className='text-white font-semibold text-lg'>Cargando...</Text>
                </View>
                <View className='flex flex-row'>
                  <Text className='text-gray-300 text-lg mr-1'>Fecha:</Text>
                  <Text className='text-white font-semibold text-lg'>Cargando...</Text>
                </View>
              </>
            )}
          </View>
        </View>

        <View className='bg-stone-800 p-4 rounded-lg mb-10 shadow-lg'>
          <View className='flex flex-row justify-between items-center mb-4'>
            <View className='flex flex-row items-center'>
              <Text className='text-xl font-semibold text-white'>
                Ordenar por
              </Text>
              <TouchableOpacity onPress={() => handleTouchable('Seleccionar una forma de Ordenar', 'ordenar')}>
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
                placeholder="Buscar ventas..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className='flex-1 text-white ml-2'
              />
            </View>
          </View>

          <ScrollView className={`${ventasAvailable ? 'h-[30rem]' : 'h-12'} bg-stone-900 p-4 rounded-2xl`}>
            {ventasAvailable ? (
              <View>
                {filteredVentas.map((data, key) => {
                  return (
                    <View key={key} className='bg-slate-600 p-3 m-1 rounded-lg mb-2 flex-row items-center shadow-lg'>
                      <View className='w-[9%]'>
                        <MaterialIcons name="receipt" size={32} color="white" />
                      </View>
                      <View>            
                        <View className='ml-4 w-[95%]'>
                        <Text className='text-lg font-semibold text-white'>{data.Nombre_Mueble}</Text>
                        <View className='flex flex-row'>
                          <Text className='text-gray-300 mr-1'>Cliente:</Text>
                          <Text className='text-white font-semibold'>{data.Nombre_Cliente}</Text>
                        </View>
                        <View className='flex flex-row'>
                          <Text className='text-gray-300 mr-1'>Cantidad:</Text>
                          <Text className='text-white font-semibold'>{data.Cantidad}</Text>
                        </View>
                        <View className='flex flex-row'>
                          <Text className='text-gray-300 mr-1'>Total:</Text>
                          <Text className='text-white font-semibold'>${data.Venta_Total}</Text>
                        </View>
                        <View className='flex flex-row'>
                          <Text className='text-gray-300 mr-1'>Cantidad Pagada:</Text>
                          <Text className='text-white font-semibold'>${data.CantidadPagada}</Text>
                        </View>
                        <View className='flex flex-row'>
                          <Text className='text-gray-300 mr-1'>Fecha:</Text>
                          <Text className='text-white font-semibold'>{data.FechaVenta.format('DD/MM/YYYY HH:mm')}</Text>
                        </View>
                        </View>
                      </View>
                    </View>
                  )
                })}
              </View>
            ) : (
              <View className='flex h-full w-full items-center justify-center'>
                <Text className='text-white font-semibold'>DATOS CARGANDO...</Text>
              </View>
            )}
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
      <AddSale isOpen={addOpen} setIsOpen={setAddOpen} establecimientoID={establecimiento}></AddSale>
    </View>
  );
}