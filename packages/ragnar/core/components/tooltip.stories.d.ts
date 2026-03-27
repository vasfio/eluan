import { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './tooltip';

declare const meta: Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Positions: Story;
export declare const WithIcon: Story;
