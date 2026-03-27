import { Meta, StoryObj } from '@storybook/react';
import { EmailForm } from './email-form';

declare const meta: Meta<typeof EmailForm>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Stacked: Story;
export declare const Large: Story;
export declare const FullWidth: Story;
