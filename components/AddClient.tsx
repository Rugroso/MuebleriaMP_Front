import { X } from '@tamagui/lucide-icons'
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
} from 'tamagui'

interface MenuItemsProps {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean; 
}

const AddClient: React.FC<MenuItemsProps> = ({ isOpen, setIsOpen }) => {  
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
              Id Cliente
            </Label>
            <Input keyboardType='numeric' flex={1} placeholder='Ej: 10' backgroundColor={'#292524'} borderColor={'#4b5563'} borderWidth={1} zIndex={-20}/>
          </Fieldset>

          <Fieldset gap="$4" horizontal zIndex={1000}>
            <Label color={'white'} width={180} justifyContent="flex-end" htmlFor="furniture">
              Nombre
            </Label>
            <Input  flex={1} placeholder='Ej: Abraham Saldivar' backgroundColor={'#292524'} borderColor={'#4b5563'} borderWidth={1} zIndex={-20}/>
          </Fieldset>

          <Fieldset gap="$4" horizontal zIndex={1000}>
            <Label color={'white'} width={180} justifyContent="flex-end" htmlFor="furniture">
              Teléfono
            </Label>
            <Input flex={1} placeholder='Ej: +52 653 974 2843' backgroundColor={'#292524'} borderColor={'#4b5563'} borderWidth={1} zIndex={-20}/>
          </Fieldset>

          <Fieldset gap="$4" horizontal zIndex={1000}>
            <Label color={'white'} width={180} justifyContent="flex-end" htmlFor="furniture">
              Correo
            </Label>
            <Input  flex={1} placeholder='Ej: abrahamsldev@gmail.com ' backgroundColor={'#292524'} borderColor={'#4b5563'} borderWidth={1} zIndex={-20}/>
          </Fieldset>

          <Fieldset gap="$4" horizontal zIndex={1000}>
            <Label color={'white'} width={180} justifyContent="flex-end" htmlFor="furniture">
              Dirreccion
            </Label>
            <Input flex={1} placeholder='Ej: Av. Bugambilias y 41, San Luis Río Colorado, Sonora, México' backgroundColor={'#292524'} borderColor={'#4b5563'} borderWidth={1} zIndex={-20}/>
          </Fieldset>

          <XStack alignSelf="flex-end" gap="$4" zIndex={-10}>
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close">
                VENDER
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
