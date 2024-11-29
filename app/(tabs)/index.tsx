import { View, Text, ScrollView, Modal, Pressable, TextInput } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { generarReporteCompras, generarReporteVentas, generarReporteMuebles } from '../../utils/pdfGenerator';
import { Alert } from 'react-native';

const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`http://localhost:3000/${endpoint}`);
    if (!response.ok) throw new Error(`Error al obtener datos de ${endpoint}`);
    return await response.json();
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error);
    throw error;
  }
};

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [ventasModalVisible, setVentasModalVisible] = useState(false);
  const [mueblesModalVisible, setMueblesModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    fecha: ''
  });
  const [ventasFormData, setVentasFormData] = useState({ fecha: '' });
  const [mueblesFormData, setMueblesFormData] = useState({ sucursal: '' });
  const [ventaDelDia, setVentaDelDia] = useState<{ VENTAS_DEL_DIA : string, CANTIDAD_TOTAL_VENTA: string }[]>([]);
  const [inventarioTotal, setInventarioTotal] = useState<{ Total_Productos : string, Valor_Total: string }[]>([]);


  const fetchViewVentaDia = async () => {
    try {
      const response = await fetch(`http://localhost:3000/ventadeldia`);
      if (!response.ok) throw new Error(`Error al obtener datos de la venta del dia`);
      const data = await response.json();
      if(Array.isArray(data)) {
        const ventas = data.map((event) => ({
          ...event
        }));
        setVentaDelDia(ventas);
      }
    } catch(e) {
      setVentaDelDia([]);
    }
  };


  const fetchInventarioTotal = async () => {
    try {
      const response = await fetch(`http://localhost:3000/inventariototal`);
      if (!response.ok) throw new Error(`Error al obtener datos de la venta del dia`);
      const data = await response.json();
      if(Array.isArray(data)) {
        const inventario = data.map((event) => ({
          ...event
        }));
        setInventarioTotal(inventario);
      }
    } catch(e) {
      setInventarioTotal([]);
    }
  };

  useEffect(() => {
    fetchViewVentaDia();
    const intervalId = setInterval(fetchViewVentaDia, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchInventarioTotal();
    const intervalId = setInterval(fetchInventarioTotal, 1000);
    return () => clearInterval(intervalId);
  }, []);
  

  return (
    <View className='w-full h-full flex items-center justify-center bg-slate-800'>
        <View className="h-[12%] w-full bg-stone-800 flex justify-center items-center px-4">
          <FontAwesome
            name="user-circle"
            size={30}
            color="white"
            className="absolute left-6 bottom-3"
          />
          <Text className="text-2xl font-semibold text-white mt-14">
            ¡Hola, Abraham!
          </Text>
        </View>
      <ScrollView className='p-5 flex-1 w-full'>
        <Text className='text-2xl font-semibold text-white mb-5 text-start'>
          Resumen General
        </Text>
      
        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center shadow-lg'>
          <MaterialIcons name="attach-money" size={32} color="#015c1b" />
          <View className='ml-4'>
            <Text className='text-xl font-semibold text-white'>Venta del Día</Text>
            <View className='flex flex-row'>
              <Text className='text-gray-300 text-lg mr-1'>Total de Ventas:</Text>
              <Text className='text-white font-semibold text-lg'> {ventaDelDia[0]?.VENTAS_DEL_DIA ? `$${ventaDelDia[0]?.VENTAS_DEL_DIA}`  : 'Cargando...'}  </Text>
            </View>
            <View className='flex flex-row'>
              <Text className='text-gray-300 text-lg mr-1'>Productos Vendidos:</Text>
              <Text className='text-white font-semibold text-lg'> {ventaDelDia[0]?.CANTIDAD_TOTAL_VENTA ? `${ventaDelDia[0]?.CANTIDAD_TOTAL_VENTA}`  : 'Cargando...'}  </Text>
            </View>
          </View>
        </View>

        <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center shadow-lg'>
          <FontAwesome name="archive" size={32} color="gray" />
          <View className='ml-4'>
            <Text className='text-xl font-semibold text-white'>Inventario Total</Text>
            <View className='flex flex-row'>
              <Text className='text-gray-300 text-lg mr-1'>Valor Total en Inventario:</Text>
              <Text className='text-white font-semibold text-lg'> {inventarioTotal[0]?.Valor_Total ? `$${inventarioTotal[0]?.Valor_Total}`  : 'Cargando...'}  </Text>
            </View>
            <View className='flex flex-row'>
              <Text className='text-gray-300 text-lg mr-1'>Productos en Inventario:</Text>
              <Text className='text-white font-semibold text-lg'> {inventarioTotal[0]?.Total_Productos ? `${inventarioTotal[0]?.Total_Productos}`  : 'Cargando...'}  </Text>
            </View>
          </View>
        </View>
        <View className="my-4 border-t border-gray-600" />
    
        <Text className='text-2xl font-semibold text-white mb-5 text-start'>
          Reportes Disponibles
        </Text>

        <Pressable onPress={() => setModalVisible(true)}>
          <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center justify-between shadow-lg'>
            <View className='flex-row flex items-center'>
              <FontAwesome name="money" size={32} color="#015c1b" />
              <View className='ml-4 w-[80%]'>
                <Text className='text-xl font-semibold text-white'>Compras Mensuales</Text>
              </View>
            </View>
            <View>
              <FontAwesome name="arrow-right" size={18} color="white" />
            </View>
          </View>
        </Pressable>

        <Pressable onPress={() => setVentasModalVisible(true)}>
          <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center justify-between shadow-lg'>
            <View className='flex-row flex items-center'>
              <FontAwesome name="money" size={32} color="#015c1b" />
              <View className='ml-4 w-[80%]'>
                <Text className='text-xl font-semibold text-white'>Ventas Mensuales</Text>
              </View>
            </View>
            <View>
              <FontAwesome name="arrow-right" size={18} color="white" />
            </View>
          </View>
        </Pressable>

        <Pressable onPress={() => setMueblesModalVisible(true)}>
          <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center justify-between shadow-lg'>
            <View className='flex-row flex items-center'>
              <MaterialIcons name="chair" size={32} color="#9e0618" />
              <View className='ml-4 w-[80%]'>
                <Text className='text-xl font-semibold text-white'>Muebles Faltantes por Sucursal</Text>
              </View>
            </View>
            <View>
              <FontAwesome name="arrow-right" size={18} color="white" />
            </View>
          </View>
        </Pressable>

        <Pressable onPress={() => null}>
          <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center justify-between shadow-lg'>
            <View className='flex-row flex items-center'>
              <FontAwesome name="user" size={32} color="#9e0618" />
              <View className='ml-4 w-[80%]'>
                <Text className='text-xl font-semibold text-white'>Clientes en Estado de Crédito</Text>
              </View>
            </View>
            <View>
              <FontAwesome name="arrow-right" size={18} color="white" />
            </View>
          </View>
        </Pressable>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className='flex-1 justify-center items-center bg-black/50'>
            <View className='bg-stone-900 p-6 rounded-lg w-[90%]'>
              <Text className='text-xl font-bold mb-4 text-white'>Generar Reporte de Compras</Text>
              
              <TextInput
                className='border border-stone-700 p-2 rounded-lg mb-4'
                placeholder="Fecha (MM/YYYY)"
                placeholderTextColor={'gray'}
                value={formData.fecha}
                onChangeText={(text) => setFormData({...formData, fecha: text})}
              />

              <View className='flex-row justify-center space-x-4 w-full'>
                <Pressable
                  className='bg-red-500 px-4 py-2 rounded-lg mr-3'
                  onPress={() => setModalVisible(false)}
                >
                  <Text className='text-white'>Cancelar</Text>
                </Pressable>
                
                <Pressable
                  className='bg-blue-500 px-4 py-2 rounded-lg'
                  onPress={async () => {
                    try {
                      // Extraer mes y año de la fecha
                      const [mes, anio] = formData.fecha.split('/');
                      
                      // Construir el query string
                      const queryString = `comprasmensuales?mes=${mes}&anio=${anio}`;
                      
                      // Obtener datos con el nuevo query string
                      const datosAPI = await fetchData(queryString);
                      
                      // Formateamos los datos
                      const datosReporte = {
                        fecha: formData.fecha,
                        reportes: datosAPI.map((reporte: { distribuidor: any; mueble: any; cantidad: any; costoUnitario: any; costoTotal: any; }) => ({
                          distribuidor: reporte.distribuidor,
                          mueble: reporte.mueble,
                          cantidad: reporte.cantidad,
                          costoUnitario: reporte.costoUnitario,
                          costoTotal: reporte.costoTotal
                        }))
                      };

                      const success = await generarReporteCompras(datosReporte);
                      
                      if (success) {
                        Alert.alert('Éxito', 'PDF generado correctamente');
                        setModalVisible(false);
                      }
                    } catch (error) {
                      console.error('Error:', error);
                      Alert.alert('Error', 'No se pudo generar el reporte');
                    }
                  }}
                >
                  <Text className='text-white'>Generar PDF</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={ventasModalVisible}
          onRequestClose={() => setVentasModalVisible(false)}
        >
          <View className='flex-1 justify-center items-center bg-black/50'>
            <View className='bg-stone-900 p-6 rounded-lg w-[90%]'>
              <Text className='text-xl font-bold mb-4 text-white'>Generar Reporte de Ventas</Text>
              <TextInput
                className='border border-stone-700 p-2 rounded-lg mb-4'
                placeholder="Fecha (MM/YYYY)"
                placeholderTextColor={'gray'}
                value={ventasFormData.fecha}
                onChangeText={(text) => setVentasFormData({...ventasFormData, fecha: text})}
              />
              <View className='flex-row justify-center space-x-4 w-full'>
                <Pressable
                  className='bg-red-500 px-4 py-2 rounded-lg mr-3'
                  onPress={() => setVentasModalVisible(false)}
                >
                  <Text className='text-white'>Cancelar</Text>
                </Pressable>
                <Pressable
                  className='bg-blue-500 px-4 py-2 rounded-lg'
                  onPress={async () => {
                    try {
                      // Extraer mes y año de la fecha
                      const [mes, anio] = ventasFormData.fecha.split('/');
                      
                      // Construir el query string
                      const queryString = `ventamensual?mes=${mes}&anio=${anio}`;
                      
                      // Obtener datos con el nuevo query string
                      const datosAPI = await fetchData(queryString);
                      
                      // Formateamos los datos
                      const datosReporte = {
                        fecha: ventasFormData.fecha,
                        ventas: datosAPI.map((reporte: { distribuidor: any; producto: any; cantidad: any; costoUnitario: any; costoTotal: any; }) => ({
                          distribuidor: reporte.distribuidor,
                          producto: reporte.producto,
                          cantidad: reporte.cantidad,
                          costoUnitario: reporte.costoUnitario,
                          costoTotal: reporte.costoTotal
                        }))
                      };

                      const success = await generarReporteVentas(datosReporte);
                      
                      if (success) {
                        Alert.alert('Éxito', 'PDF generado correctamente');
                        setVentasModalVisible(false);
                      }
                    } catch (error) {
                      console.error('Error:', error);
                      Alert.alert('Error', 'No se pudo generar el reporte');
                    }
                  }}
                >
                  <Text className='text-white'>Generar PDF</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={mueblesModalVisible}
          onRequestClose={() => setMueblesModalVisible(false)}
        >
          <View className='flex-1 justify-center items-center bg-black/50'>
            <View className='bg-stone-900 p-6 rounded-lg w-[90%]'>
              <Text className='text-xl font-bold mb-4 text-white'>Reporte de Muebles Faltantes</Text>
              <TextInput
                className='border border-stone-700 p-2 rounded-lg mb-4'
                placeholder="Número del establecimiento"
                placeholderTextColor={'gray'}
                value={mueblesFormData.sucursal}
                onChangeText={(text) => setMueblesFormData({...mueblesFormData, sucursal: text})}
              />
              <View className='flex-row justify-center space-x-4 w-full'>
                <Pressable
                  className='bg-red-500 px-4 py-2 rounded-lg mr-3'
                  onPress={() => setMueblesModalVisible(false)}
                >
                  <Text className='text-white'>Cancelar</Text>
                </Pressable>
                <Pressable
                  className='bg-blue-500 px-4 py-2 rounded-lg'
                  onPress={async () => {
                    try {
                      // Obtener datos de muebles faltantes
                      const queryString = `mueblesfaltantes?sucursal=${mueblesFormData.sucursal}`;
                      const datosAPI = await fetchData(queryString);
                      
                      // Formateamos los datos
                      const datosReporte = {
                        sucursal: mueblesFormData.sucursal,
                        fecha: new Date().toISOString().split('T')[0],
                        muebles: datosAPI.map((reporte: { mueble: string; precio: number; descripcion: string; }) => ({
                          nombre: reporte.mueble,
                          precio: reporte.precio,
                          descripcion: reporte.descripcion
                        }))
                      };

                      const success = await generarReporteMuebles(datosReporte);
                      
                      if (success) {
                        Alert.alert('Éxito', 'PDF generado correctamente');
                        setMueblesModalVisible(false);
                      }
                    } catch (error) {
                      console.error('Error:', error);
                      Alert.alert('Error', 'No se pudo generar el reporte');
                    }
                  }}
                >
                  <Text className='text-white'>Generar PDF</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        

      </ScrollView>

    </View>
  );
}