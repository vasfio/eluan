import { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './number-input';

declare const meta: Meta<typeof NumberInput>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithMinMax: Story;
export declare const WithStep: Story;
export declare const WithoutControls: Story;
export declare const PositiveOnly: Story;
export declare const Quantity: Story;
export declare const Disabled: Story;
