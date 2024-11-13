import { X } from '@tamagui/lucide-icons'
import React, { FormEvent, FormEventHandler } from 'react';
import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Label,
  Sheet,
  Unspaced,
  XStack,
  Input
} from 'tamagui';
import { Alert } from 'react-native';

interface MenuItemsProps {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean; 
}

const AddClient: React.FC<MenuItemsProps> = ({ isOpen, setIsOpen }) => {
  const [nombre, setNombre] = React.useState('')
  const [telefono, setTelefono] = React.useState('')
  const [correo, setCorreo] = React.useState('')
  const [direccion, setDireccion] = React.useState('')

    const handleSubmit = async () => {
      try {
        const formJson = {
          nombre,
          telefono,
          correo,
          direccion
        };
          const response = await fetch('http://localhost:3000/clientes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formJson)
        });
        
        if (response.ok) {
          Alert.alert("Éxito", "Cliente agregado exitosamente");
        } else {
          Alert.alert("Error", "No se pudo agregar el cliente");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Hubo un problema al enviar el formulario");
      }
    };
  
  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen} >
      <Adapt when="sm" platform="touch" >
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom >
          <Sheet.Frame padding="$4" gap="$4" backgroundColor={'#292524'}>
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content" 
          animateOnly={['transform', 'opacity']}
          animation={[
            'quicker',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title color={'white'} fontSize={'30px'} fontWeight={500}>Registrar un Cliente</Dialog.Title>
          <Dialog.Description color={'white'} >
            Llena el formulario para registrar un cliente
          </Dialog.Description >

          <Fieldset gap="$4" horizontal zIndex={1000}>
            <Label color={'white'} width={180} justifyContent="flex-end" htmlFor="furniture">
              Nombre
            </Label>
            <Input value={nombre} onChangeText={setNombre}  flex={1} placeholder='Ej: Abraham Saldivar' backgroundColor={'#292524'} borderColor={'#4b5563'} borderWidth={1} zIndex={-20} color={'white'}/>
          </Fieldset>

          <Fieldset gap="$4" horizontal zIndex={1000}>
            <Label color={'white'} width={180} justifyContent="flex-end" htmlFor="furniture">
              Teléfono
            </Label>
            <Input value={telefono} onChangeText={setTelefono} flex={1} placeholder='Ej: +52 653 974 2843' backgroundColor={'#292524'} borderColor={'#4b5563'} borderWidth={1} zIndex={-20} color={'white'}/>
          </Fieldset>

          <Fieldset gap="$4" horizontal zIndex={1000}>
            <Label color={'white'} width={180} justifyContent="flex-end" htmlFor="furniture">
              Correo
            </Label>
            <Input value={correo} onChangeText={setCorreo}  flex={1} placeholder='Ej: abrahamsldev@gmail.com ' backgroundColor={'#292524'} borderColor={'#4b5563'} borderWidth={1} zIndex={-20} color={'white'}/>
          </Fieldset>

          <Fieldset gap="$4" horizontal zIndex={1000}>
            <Label color={'white'} width={180} justifyContent="flex-end" htmlFor="furniture">
              Dirreccion
            </Label>
            <Input value={direccion} onChangeText={setDireccion} flex={1} placeholder='Ej: Av. Bugambilias y 41, San Luis Río Colorado, Sonora, México' backgroundColor={'#292524'} borderColor={'#4b5563'} borderWidth={1} zIndex={-20} color={'white'}/>
          </Fieldset>

          <XStack alignSelf="flex-end" gap="$4" zIndex={-10}>
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close" onPress={handleSubmit}>
                REGISTRAR
              </Button>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

export default AddClient;
