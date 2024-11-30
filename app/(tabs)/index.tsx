import { View, Text, ScrollView, Modal, Pressable, Alert, TextInput } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { generarReporteCompras, generarReporteVentas, generarReporteMuebles, generarReporteCredito } from '../../utils/pdfGenerator';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list'


const fetchData = async (endpoint: string) => {
  try {
    const endpoint_local = "localhost:3000"
    console.log(`http://${endpoint_local}/${endpoint}`)
    const response = await fetch(`http://${endpoint_local}/${endpoint}`);
    if (!response.ok) throw new Error(`Error al obtener datos de ${endpoint}`);
    return await response.json();
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error);
    throw error;
  }
};

type Resultado = {
  Precio_Mensual: string;
};

interface FurnitureOption {
  key: number;
  value: string;
}


export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [ventasModalVisible, setVentasModalVisible] = useState(false);
  const [mueblesModalVisible, setMueblesModalVisible] = useState(false);
  const [calculadoraModalVisible, setCalculadoraModalVisible] = useState(false);
  const [mueblesFormData, setMueblesFormData] = useState({ sucursal: '' });
  const [ventaDelDia, setVentaDelDia] = useState<{ VENTAS_DEL_DIA : string, CANTIDAD_TOTAL_VENTA: string, RECAUDADO:string }[]>([]);
  const [inventarioTotal, setInventarioTotal] = useState<{ Total_Productos : string, Valor_Total: string }[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showDatePickerVentas, setShowDatePickerVentas] = useState(true);
  const [selectedDateVentas, setSelectedDateVentas] = useState<Date | undefined>(undefined);
  const [selected, setSelected] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [meses, setMeses] = useState("");
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [sucursales, setSucursales] = useState([
    { key: 1, value: 'Sucursal 1' },
    { key: 2, value: 'Sucursal 2' },
  ]);
  const [selectedSucursal, setSelectedSucursal] = useState("");
  const [furnitureOptions, setFurnitureOptions] = useState<FurnitureOption[]>([]);


  const getMuebles = async () => {
    try {
      const response = await fetch('http://localhost:3000/muebles');
      if (response.ok) {
        const muebles = await response.json();
        if (Array.isArray(muebles)) {
          const options = muebles.map((mueble) => ({
            key: mueble.MuebleID,
            value: mueble.Nombre,
          }));
          setFurnitureOptions(options);
        }
      } else {
        console.error('Error al obtener los muebles');
      }
    } catch (error) {
      console.error('Error al obtener los muebles:', error);
    }
  };


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

  const fetchSucursales = async () => {
    try {
      const response = await fetch('http://localhost:3000/sucursales');
      if (!response.ok) throw new Error('Error al obtener sucursales');
      const data = await response.json();
      const formattedData = data.map((sucursal: { EstablecimientoID: string, Ciudad: string }) => ({
        key: sucursal.EstablecimientoID,
        value: `${sucursal.Ciudad} - ID: ${sucursal.EstablecimientoID}`
      }));
      setSucursales(formattedData);
    } catch (error) {
      console.error('Error:', error);
      setSucursales([]);
    }
  };

  useEffect(() => {
    if (mueblesModalVisible) {
      fetchSucursales();
    }
  }, [mueblesModalVisible]);


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

  useEffect(() => {
    getMuebles();
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
            <View className='flex flex-row'>
              <Text className='text-gray-300 text-lg mr-1'>Total Recaudado:</Text>
              <Text className='text-white font-semibold text-lg'> {ventaDelDia[0]?.RECAUDADO ? `$${ventaDelDia[0]?.RECAUDADO}`  : 'Cargando...'}  </Text>
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
          Calculadora de Intereses
        </Text>


        <Pressable onPress={() => setCalculadoraModalVisible(true)}>
          <View className='bg-stone-800 p-4 rounded-lg mb-4 flex-row items-center justify-between shadow-lg'>
            <View className='flex-row flex items-center'>
              <FontAwesome name="calculator" size={32} color="#015c1b" />
              <View className='ml-4 w-[80%]'>
                <Text className='text-xl font-semibold text-white'>Calcula tu pago mensual</Text>
              </View>
            </View>
            <View>
              <FontAwesome name="arrow-right" size={18} color="white" />
            </View>
          </View>
        </Pressable>

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

        <Pressable onPress={async () => {
          try {
            // Obtener datos de clientes en crédito
            const endpointlocal = "http://localhost:3000"
            const response = await fetch(`${endpointlocal}/clientecredito`); // Asegúrate de que este endpoint existe
            const datosAPI = await response.json();
            console.log(datosAPI);
            // Formateamos los datos
            const datosReporte = {
              fecha: new Date().toLocaleDateString(), // O la fecha que desees
              clientes: datosAPI.map((cliente: { Cliente: string; Direccion: string; Telefono: string; TOTAL_ADEUDO: number; Meses_Restantes: number; }) => ({
                nombre: cliente.Cliente,
                direccion: cliente.Direccion,
                telefono: cliente.Telefono,
                adeudo: cliente.TOTAL_ADEUDO,
                mesesRestantes: cliente.Meses_Restantes
              }))
            };

            const success = await generarReporteCredito(datosReporte);

            if (success) {
              Alert.alert('Éxito', 'PDF generado correctamente');
            }
          } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'No se pudo generar el reporte');
          }
        }}>
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
              
              <Pressable onPress={() => setShowDatePicker(true)}>
                <Text className='text-white'>Seleccionar Fecha</Text>
              </Pressable>

              {showDatePicker && (
                <View>
                  <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                      if (event.type === 'set' && date) {
                        setSelectedDate(date);
                      }
                      setShowDatePicker(true);
                    }}
                    themeVariant="dark"
                  />

                  <View className='flex-row justify-between w-full mt-4'>
                    <Pressable
                      className='bg-blue-500 px-4 py-2 rounded-lg'
                      onPress={async () => {
                        if (!selectedDate) {
                          Alert.alert('Error', 'Por favor, selecciona una fecha.');
                          return;
                        }
                        try {
                          // Extraer mes y año de la fecha seleccionada
                          const mes = selectedDate.getMonth() + 1;
                          const anio = selectedDate.getFullYear();
                          
                          // Construir el query string
                          const queryString = `comprasmensuales?mes=${mes}&anio=${anio}`;
                          
                          // Obtener datos con el nuevo query string
                          const datosAPI = await fetchData(queryString);
                          console.log(datosAPI); // Verifica la estructura de datosAPI
                          
                          // Formateamos los datos
                          const datosReporte = {
                            fecha: `${mes}/${anio}`,
                            reportes: datosAPI.map((reporte: { Distribuidor: any; Mueble: any; CANTIDAD: any; Costo_Unitario: any; Costo_Total: any; }) => ({
                              distribuidor: reporte.Distribuidor,
                              mueble: reporte.Mueble,
                              cantidad: reporte.CANTIDAD,
                              costoUnitario: reporte.Costo_Unitario,
                              costoTotal: reporte.Costo_Total
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

                    <Pressable onPress={() => {
                      setSelectedDate(undefined);
                      setModalVisible(false);
                    }}>
                      <Text className='text-red-500'>Cancelar</Text>
                    </Pressable>
                  </View>
                </View>
              )}
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
              
              <Pressable onPress={() => setShowDatePickerVentas(true)}>
                <Text className='text-white'>Seleccionar Fecha</Text>
              </Pressable>

              {showDatePickerVentas && (
                <View>
                  <DateTimePicker
                    value={selectedDateVentas || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                      if (event.type === 'set' && date) {
                        setSelectedDateVentas(date);
                      }
                    }}
                    themeVariant="dark"  // Añadimos esta línea
                  />
                  <View className='flex-row justify-between w-full mt-4'>
                    <Pressable
                      className='bg-blue-500 px-4 py-2 rounded-lg'
                      onPress={async () => {
                        if (!selectedDateVentas) {
                          Alert.alert('Error', 'Por favor, selecciona una fecha.');
                          return;
                        }
                        try {
                          // Extraer mes y año de la fecha seleccionada
                          const mes = selectedDateVentas.getMonth() + 1;
                          const anio = selectedDateVentas.getFullYear();
                          
                          // Construir el query string
                          const queryString = `ventamensual?mes=${mes}&anio=${anio}`;
                          
                          // Obtener datos con el nuevo query string
                          const datosAPI = await fetchData(queryString);
                          console.log(datosAPI); // Verifica la estructura de datosAPI
                          
                          // Formateamos los datos
                          const datosReporte = {
                            fecha: `${mes}/${anio}`,
                            ventas: datosAPI.map((reporte: { Mueble: any; CANTIDAD: any; Costo_Unitario: any; Costo_Total: any; Victima: any; }) => ({
                              nombre: reporte.Victima,
                              mueble: reporte.Mueble,
                              cantidad: reporte.CANTIDAD,
                              costoUnitario: reporte.Costo_Unitario,
                              costoTotal: reporte.Costo_Total
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

                    <Pressable onPress={() => {
                      setSelectedDateVentas(undefined);
                      setVentasModalVisible(false);
                    }}>
                      <Text className='text-red-500'>Cancelar</Text>
                    </Pressable>
                  </View>
                </View>
              )}
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
              <Text className='text-lg text-white mb-1'>Selecciona una sucursal</Text>
              <SelectList 
                setSelected={(val: string) => setSelectedSucursal(val)}
                data={sucursales}
                save="key"
                boxStyles={{ backgroundColor: '#1f2937' }}
                dropdownStyles={{ backgroundColor: '#1f2937' }}
                dropdownTextStyles={{color: 'white'}}
                placeholder='Selecciona una sucursal'
                inputStyles={{color: 'white'}}
              />
              <View className='flex-row justify-center space-x-4 w-full mt-4'>
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
                      if (!selectedSucursal) {
                        Alert.alert('Error', 'Por favor selecciona una sucursal');
                        return;
                      }
                      // Obtener datos de muebles faltantes
                      const queryString = `mueblefaltante?id=${selectedSucursal}`;
                      const datosAPI = await fetchData(queryString);
                      console.log(datosAPI);
                      // Formateamos los datos
                      const datosReporte = { 
                        sucursal: selectedSucursal,
                        fecha: new Date().toISOString().split('T')[0],
                        muebles: datosAPI.map((reporte: { NOMBRE: string; PRECIO: number; DESCRIPCION: string; }) => ({
                          nombre: reporte.NOMBRE,
                          precio: reporte.PRECIO,
                          descripcion: reporte.DESCRIPCION
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
        

        <Modal
          animationType='slide'
          transparent={true}
          visible={calculadoraModalVisible}
          onRequestClose={() => setCalculadoraModalVisible(false)}
        >
          <View className='flex-1 justify-center items-center bg-black/50'>
            <View className='bg-stone-900 p-6 rounded-lg w-[90%]'>
              <Text className='text-xl font-bold mb-2 text-white'>Calculadora de Intereses</Text>
              <Text className='text-lg text-white mb-1'>Mueble</Text>
              <SelectList 
                  setSelected={(val: any) => setSelected(val)} 
                  data={furnitureOptions} 
                  save="key"
                  placeholder='Selecciona un Mueble'
                  boxStyles={{ backgroundColor: '#1f2937' }}
                  dropdownStyles={{ backgroundColor: '#1f2937' }}
                  dropdownTextStyles={{color: 'white'}}
                  inputStyles={{color: 'white'}}
                  searchicon={<FontAwesome name="search" size={12} color={'white'} />} 
                  search={true}
                />
              <Text className='text-lg text-white mb-1'>Cantidad</Text>
              <TextInput
                placeholder='Cantidad de muebles'
                keyboardType='numeric'
                className='border border-stone-700 p-2 rounded-lg text-white'
                value={cantidad}
                onChangeText={setCantidad}
              />
              <Text className='text-lg text-white mb-1'>Plazo</Text>
              <TextInput
                placeholder='Plazo en meses'
                keyboardType='numeric'
                className='border border-stone-700 p-2 rounded-lg text-white'
                value={meses}
                onChangeText={setMeses}
              />
              <View className='flex-row justify-center space-x-4 w-full mt-5'>
                
                <Pressable
                  className='bg-red-500 px-4 py-2 rounded-lg mr-3'
                  onPress={() => setCalculadoraModalVisible(false)}
                >
                  <Text className='text-white'>Cancelar</Text>
                </Pressable>
                <Pressable
                  className='bg-blue-500 px-4 py-2 rounded-lg'
                  onPress={async () => {
                    try {
                      // Obtener datos de muebles usando la key seleccionada
                      const queryString = `mueblecoppel?id=${selected}&cantidad=${cantidad}&plazo=${meses}`;
                      const datosAPI = await fetchData(queryString);
                      console.log(datosAPI); // Verifica la estructura de datosAPI
                      
                      // Almacenar los resultados en un nuevo estado
                      setResultados(datosAPI); // Asegúrate de tener un estado para resultados
                      setMostrarResultados(true); // Controlar la visibilidad del cuadro de resultados
                    } catch (error) {
                      console.error('Error:', error);
                      Alert.alert('Error', 'No se pudo generar el reporte');
                    }
                  }}
                >
                  <Text className='text-white'>Generar pago mensual</Text>
                </Pressable>
              </View>

              {/* Cuadro de resultados */}
              {mostrarResultados && (
                <View className='bg-stone-800 p-4 rounded-lg mt-5'>
                  <Text className='text-xl font-semibold text-white'>Pago Mensual</Text>
                  {/* Aquí puedes mapear los resultados y mostrarlos */}
                  {resultados.map((resultado, index) => (
                    <Text key={index} className='text-white'>{resultado.Precio_Mensual}</Text>
                  ))}
                  <Pressable
                    className='bg-red-500 px-4 py-2 rounded-lg mt-4'
                    onPress={() => {
                      setMostrarResultados(false); // Ocultar el cuadro de resultados
                      setResultados([]); // Limpiar los resultados
                    }}
                  >
                    <Text className='text-white'>Retroceder</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </Modal>

      </ScrollView>

    </View>
  );
}