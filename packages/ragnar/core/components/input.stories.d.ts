import { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

declare const meta: Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Email: Story;
export declare const Password: Story;
export declare const Disabled: Story;
export declare const WithLabel: Story;
export declare const WithHelperText: Story;
export declare const File: Story;
export declare const AllTypes: Story;
