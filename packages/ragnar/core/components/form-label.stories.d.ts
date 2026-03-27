import { Meta, StoryObj } from '@storybook/react';
import { FormLabel } from './form-label';

declare const meta: Meta<typeof FormLabel>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Required: Story;
export declare const WithDescription: Story;
export declare const Disabled: Story;
