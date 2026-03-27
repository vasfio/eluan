import { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from './time-picker';

declare const meta: Meta<typeof TimePicker>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const TwelveHourFormat: Story;
export declare const TwentyFourHourFormat: Story;
export declare const WithMinuteStep: Story;
export declare const WithDefaultValue: Story;
export declare const SimpleInput: Story;
export declare const Disabled: Story;
