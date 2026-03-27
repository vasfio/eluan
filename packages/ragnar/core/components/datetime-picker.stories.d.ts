import { Meta, StoryObj } from '@storybook/react';
import { DateTimePicker } from './datetime-picker';

declare const meta: Meta<typeof DateTimePicker>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithPreselected: Story;
export declare const WithLabel: Story;
