import { Meta, StoryObj } from '@storybook/react';
import { Select } from './select';

declare const meta: Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithGroups: Story;
export declare const Disabled: Story;
