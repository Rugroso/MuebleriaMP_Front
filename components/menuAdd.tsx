import React from 'react';
import { Check, ChevronUp, ChevronDown } from '@tamagui/lucide-icons'
import { Adapt, Select, Sheet, YStack,  } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'

interface MenuItemsProps {

  topic: string
}
interface Item {
  name: string;
};

const MenuAdd: React.FC<MenuItemsProps> = ({ topic }) => {  

const Sucursales = [
  { name: 'San Luis Río Colorado' },
  { name: 'Mexicali' },
  { name: 'Ensenada' },
  { name: 'Tecate' },
  { name: 'Rosarito' },
  { name: 'Tijuana' },
  { name: 'Calexico' },
  { name: 'Yuma' },
  { name: 'El Centro' },
  { name: 'San Diego' },
]
const Ordenar = [
  { name: "Precio - Menor a Mayor"},
  { name: "Precio - Mayor a Menor"},
  { name: "Cantidad - Menor a Mayor"},
  { name: "Cantidad - Mayor a Menor"},
  { name: "Nombre - A-Z"},
  { name: "Nombre - Z-A"}
];
  const [val, setVal] = React.useState('')
  const [items, setItems] = React.useState<Item[]>([
    { name: 'Test' },
  ]);
  React.useEffect(()=> {
    if (topic==='Seleccionar una Sucursal') {
      setItems(Sucursales)
    }
    else if (topic==='Seleccionar una forma de Ordenar') {
      setItems(Ordenar)
    }
  },[topic])

  return (
    <Select value={val} >
        <Select.Trigger width={170} iconAfter={ChevronDown}>
            <Select.Value placeholder="Something" />
        </Select.Trigger>
          <Adapt when="sm"  platform="touch">
            <Sheet
              native={true}
              modal
              dismissOnSnapToBottom
              animationConfig={{
                type: 'spring',
                damping: 100,
                mass: 1,
                stiffness: 250,
              }}
            >
              
              <Sheet.Frame backgroundColor={'#292524'}>
                <Sheet.ScrollView>
                  <Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>
              <Sheet.Overlay
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            </Sheet>
          </Adapt>

          <Select.Content zIndex={200000} >
            <Select.ScrollUpButton
              alignItems="center"
              justifyContent="center"
              position="relative"
              width="100%"
              height="$3"
            >
              <YStack zIndex={10}>
                <ChevronUp size={20} />
              </YStack>
              <LinearGradient
                start={[0, 0]}
                end={[0, 1]}
                fullscreen
                colors={['$background', 'transparent']}
                borderRadius="$4"
              />
            </Select.ScrollUpButton>

            <Select.Viewport
              minWidth={200}
            >
              <Select.Group>
                <Select.Label backgroundColor={'#262220'} color={'white'}>{`${topic}`}</Select.Label>
                {React.useMemo(
                  () =>
                    items.map((item, i) => {
                      return (
                        <Select.Item
                          backgroundColor={'#292524'}
                          index={i}
                          key={item.name}
                          value={item.name}
                        >
                          <Select.ItemText backgroundColor={'transparent'} color={'white'}>{item.name}</Select.ItemText>
                          <Select.ItemIndicator backgroundColor={'#292524'} marginLeft="auto">
                            <Check size={16} color={'white'}/>
                          </Select.ItemIndicator>
                        </Select.Item>
                      )
                    }),
                  [items]
                )}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select>
  );
}
export default MenuAdd