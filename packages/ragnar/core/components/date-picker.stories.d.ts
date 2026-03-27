import { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './date-picker';

declare const meta: Meta<typeof DatePicker>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithPreselected: Story;
export declare const WithPlaceholder: Story;
export declare const Disabled: Story;
