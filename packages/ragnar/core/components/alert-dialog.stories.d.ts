import { Meta, StoryObj } from '@storybook/react';
import { AlertDialog } from './alert-dialog';

declare const meta: Meta<typeof AlertDialog>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Destructive: Story;
