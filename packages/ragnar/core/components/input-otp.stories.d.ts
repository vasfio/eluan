import { Meta, StoryObj } from '@storybook/react';
import { InputOTP } from './input-otp';

declare const meta: Meta<typeof InputOTP>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithSeparator: Story;
export declare const FourDigits: Story;
export declare const WithLabel: Story;
