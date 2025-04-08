/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Select, Text } from "@radix-ui/themes";
import { ReactNode } from "react";
import { BandPresentation, Direction, getIconComponent, JustificationText } from "ux-ui";
import useCalculatePresentation from "ux-ui/src/components/input/Calculations";
import { MessageField } from "ux-ui/src/components/input/Menssages";

/**
 * Interfaz para la presentacion de la tabla.
 */
interface IPresentationInputSelect {
    items: Array<{
        order: number;
        separator?: boolean;
        justification?: JustificationText;
        value?: string;
        title?: string;
        disabled?: boolean | undefined;
        width?: string;
        color?: string;
        iconName?: string;
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
            <Flex direction={"column"} style={{ marginBottom: '1vh', width: presentation.width }} >
                <Select.Root onValueChange={handleValueChange} value={value || ""} >
                    <Select.Trigger placeholder={placeholder} />
                    <Select.Content >
                        {items.items.map((item) => (
                            item.separator ? (
                                <Select.Separator key={item.order} />
                            ) : (
                                <>
                                    <Select.Item
                                        disabled={item.disabled || false}
                                        key={item.order}
                                        value={item.value || ""}
                                        style={{ color: item.color || 'inherit' }}
                                    >
                                        {item.iconName ? (
                                            <Flex justify="center" align="center" gap="2" >
                                                {getIconComponent(item.iconName || "", "18", "18")}
                                                {item.title}
                                            </Flex>) : item.title}
                                    </Select.Item>
                                </>
                            )
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

