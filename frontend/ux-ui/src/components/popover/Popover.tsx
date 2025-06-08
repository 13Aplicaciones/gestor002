import { IconButton, Popover } from "@radix-ui/themes";
import { ReactNode } from "react";
import { IconComponent } from "../icon/IconDynamic";

/**
 * Componente para mostrar un Popover.
 * 
 * @author @omargo33
 */
/**
 * Componente para mostrar un Popover.
 * 
 * @param childrenTigger Hijos disparadores del Popover
 * @param childrenContent Hijos del contenido del Popover
 * 
 * @returns 
 */
const PopoverEmbeber = ({ childrenTigger, childrenContent} : 
		{ childrenTigger: ReactNode, childrenContent: ReactNode }) => {
	return (
		<Popover.Root>
			<Popover.Trigger>
				{childrenTigger}
			</Popover.Trigger>
			<Popover.Content>
			{childrenContent}
				<div style={{ position: 'fixed', top: '2vh', right: '2vh' }}>
					<Popover.Close>
						<IconButton size="2" radius="full" variant="soft">
							<IconComponent iconName="Cross1Icon" width="16" height="16" />
						</IconButton>
					</Popover.Close>
				</div>
			</Popover.Content>
		</Popover.Root>
	);
};

export default PopoverEmbeber;
