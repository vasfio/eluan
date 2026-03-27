import { Meta, StoryObj } from '@storybook/react';
import { ResizablePanelGroup } from './resizable';

declare const meta: Meta<typeof ResizablePanelGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Vertical: Story;
export declare const ThreePanels: Story;
export declare const Nested: Story;
