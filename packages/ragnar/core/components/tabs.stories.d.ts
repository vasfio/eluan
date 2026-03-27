import { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './tabs';

declare const meta: Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const MultipleTabs: Story;
export declare const DisabledTab: Story;
