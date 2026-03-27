import { Meta, StoryObj } from '@storybook/react';
import { PhoneInput } from './phone-input';

declare const meta: Meta<typeof PhoneInput>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithDefaultCountry: Story;
export declare const WithCallback: Story;
export declare const LimitedCountries: Story;
export declare const Disabled: Story;
