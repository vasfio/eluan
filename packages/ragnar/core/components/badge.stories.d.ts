import { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

declare const meta: Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Secondary: Story;
export declare const Destructive: Story;
export declare const Outline: Story;
export declare const AllVariants: Story;
