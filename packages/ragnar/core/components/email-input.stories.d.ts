import { Meta, StoryObj } from '@storybook/react';
import { EmailInput } from './email-input';

declare const meta: Meta<typeof EmailInput>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithValidation: Story;
export declare const Disabled: Story;
