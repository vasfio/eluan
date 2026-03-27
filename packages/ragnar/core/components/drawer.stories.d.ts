import { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './drawer';

declare const meta: Meta<typeof Drawer>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const FromLeft: Story;
export declare const FromRight: Story;
export declare const FromTop: Story;
