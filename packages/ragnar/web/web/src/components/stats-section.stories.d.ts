import { Meta, StoryObj } from '@storybook/react';
import { StatsSection } from './stats-section';

declare const meta: Meta<typeof StatsSection>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Primary: Story;
export declare const WithCards: Story;
export declare const Bordered: Story;
