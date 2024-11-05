import React from 'react';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { Adapt, Select, Sheet, YStack,  } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'

interface MenuItemsProps {
  items: { name: string }[]; 
  onSelectionChange: (value: string) => void;
  isOpen: boolean; 
  setIsOpen: (value: boolean) => void;
  topic: string
}

const MenuItems: React.FC<MenuItemsProps> = ({ items, onSelectionChange, isOpen, setIsOpen, topic }) => {  

  const [val, setVal] = React.useState('San Luis Río Colorado')

  const handleValueChange = (value:any) => {
    setVal(value);
    onSelectionChange(value);
  };

  return (
    <Select value={val} onValueChange={handleValueChange} open={isOpen} onOpenChange={setIsOpen}>
          <Adapt platform="touch">
            <Sheet
              native={false}
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
export default MenuItems