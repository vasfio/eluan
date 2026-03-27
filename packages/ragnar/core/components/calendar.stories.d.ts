import { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './calendar';

declare const meta: Meta<typeof Calendar>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Multiple: Story;
export declare const Range: Story;
export declare const Disabled: Story;
