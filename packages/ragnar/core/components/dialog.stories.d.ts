import { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './dialog';

declare const meta: Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const SimpleDialog: Story;
