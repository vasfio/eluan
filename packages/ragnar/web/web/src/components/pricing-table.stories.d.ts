import { Meta, StoryObj } from '@storybook/react';
import { PricingTable } from './pricing-table';

declare const meta: Meta<typeof PricingTable>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const CustomTitle: Story;
