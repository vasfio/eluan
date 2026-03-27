import { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './dropdown-menu';

declare const meta: Meta<typeof DropdownMenu>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithCheckboxes: Story;
export declare const WithRadioItems: Story;
export declare const WithSubmenu: Story;
