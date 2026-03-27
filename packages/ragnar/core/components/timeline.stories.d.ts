import { Meta, StoryObj } from '@storybook/react';
import { Timeline } from './timeline';

declare const meta: Meta<typeof Timeline>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithVariants: Story;
export declare const Horizontal: Story;
