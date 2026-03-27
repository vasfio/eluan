import { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './stepper';

declare const meta: Meta<typeof Stepper>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Vertical: Story;
export declare const NoInteraction: Story;
