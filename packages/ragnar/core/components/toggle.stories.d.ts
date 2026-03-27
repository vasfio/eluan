import { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './toggle';

declare const meta: Meta<typeof Toggle>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Outline: Story;
export declare const WithText: Story;
export declare const Disabled: Story;
export declare const Sizes: Story;
export declare const Pressed: Story;
