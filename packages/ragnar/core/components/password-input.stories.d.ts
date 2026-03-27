import { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from './password-input';

declare const meta: Meta<typeof PasswordInput>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithStrengthIndicator: Story;
export declare const CustomRequirements: Story;
export declare const MinimalRequirements: Story;
export declare const Disabled: Story;
