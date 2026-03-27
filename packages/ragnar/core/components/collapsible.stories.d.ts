import { Meta, StoryObj } from '@storybook/react';
import { Collapsible } from './collapsible';

declare const meta: Meta<typeof Collapsible>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const OpenByDefault: Story;
