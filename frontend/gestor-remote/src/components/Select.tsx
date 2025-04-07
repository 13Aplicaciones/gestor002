/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Select, Text } from "@radix-ui/themes";
import { ReactNode} from "react";
import { BandPresentation, Direction, JustificationText } from "ux-ui";
import useCalculatePresentation from "ux-ui/src/components/input/Calculations";
import { MessageField } from "ux-ui/src/components/input/Menssages";

/**
 * Interfaz para la presentacion de la tabla.
 */
interface IPresentationInputSelect {
    items: Array<{
        order: number;
        justification: JustificationText;
        value?: string;
        title: string;
        width: string;
        onAction?: { onAction: (row: any) => void };
        component?: (row: any, children: ReactNode) => ReactNode;
    }>;
}

const InputSelect = ({
    title,
    placeholder,
    messageError,
    columns,
    directionLabel,
    items,
    value,
    onChange,
}: {
    title?: string;
    placeholder?: string;
    messageError?: string;
    columns?: BandPresentation;
    directionLabel?: Direction | Direction.horizontal;
    items: IPresentationInputSelect;
    value: any;
    onChange?: (newValue: any) => void;
}) => {

    const presentation = useCalculatePresentation(directionLabel || Direction.horizontal, columns, '60vw');
    items.items.sort((a, b) => a.order - b.order);

    /**
     * Función para manejar el cambio de valor.
     * 
     * @param newValue 
     */
    const handleValueChange = (newValue: string) => {
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <Flex direction={presentation.direction} gap="3" style={{ alignItems: presentation.align }} >
            <Flex width="calc(150px * var(--scaling))" style={{ justifyContent: presentation.justify }}>
                <Text size="2" as="div" weight="bold" truncate trim="normal">{title}</Text>
            </Flex>
            <Flex direction={"column"} >
                <Select.Root onValueChange={handleValueChange} value={value || ""}>
                    <Select.Trigger placeholder={placeholder} />
                    <Select.Content>
                        {items.items.map((item) => (
                            <Select.Item key={item.order} value={item.value}>
                                {item.title}
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Root>
                <MessageField message={messageError} />
            </Flex>
        </Flex>
    )
};

export { InputSelect };
export type { IPresentationInputSelect };