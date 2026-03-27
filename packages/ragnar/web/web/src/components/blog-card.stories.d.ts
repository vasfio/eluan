import { Meta, StoryObj } from '@storybook/react';
import { BlogCard } from './blog-card';

declare const meta: Meta<typeof BlogCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Grid: Story;
export declare const Minimal: Story;
export declare const Featured: Story;
export declare const Elevated: Story;
