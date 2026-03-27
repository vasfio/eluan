import { Meta, StoryObj } from '@storybook/react';
import { Command } from './command';

declare const meta: Meta<typeof Command>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Simple: Story;
export declare const WithShortcuts: Story;
