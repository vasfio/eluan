import { Meta, StoryObj } from '@storybook/react';
import { DecimalInput } from './decimal-input';

declare const meta: Meta<typeof DecimalInput>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Currency: Story;
export declare const Percentage: Story;
export declare const Units: Story;
export declare const CustomDecimals: Story;
export declare const WithMinMax: Story;
export declare const AllowNegative: Story;
export declare const Disabled: Story;
