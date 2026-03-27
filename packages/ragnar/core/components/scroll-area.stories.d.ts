import { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from './scroll-area';

declare const meta: Meta<typeof ScrollArea>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Vertical: Story;
export declare const Horizontal: Story;
export declare const Both: Story;
