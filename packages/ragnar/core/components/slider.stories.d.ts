import { Meta, StoryObj } from '@storybook/react';
import { Slider } from './slider';

declare const meta: Meta<typeof Slider>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Range: Story;
export declare const WithSteps: Story;
export declare const Disabled: Story;
