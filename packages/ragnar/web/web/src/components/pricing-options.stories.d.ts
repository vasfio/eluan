import { Meta, StoryObj } from '@storybook/react';
import { PricingOptions } from './pricing-options';

declare const meta: Meta<typeof PricingOptions>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const TwoColumns: Story;
export declare const FourColumns: Story;
