import { Meta, StoryObj } from '@storybook/react';
import { Toaster } from './sonner';

declare const meta: Meta<typeof Toaster>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const AllVariants: Story;
export declare const WithAction: Story;
export declare const WithPromise: Story;
export declare const CustomDuration: Story;
