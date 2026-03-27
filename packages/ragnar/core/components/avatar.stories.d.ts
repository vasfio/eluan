import { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './avatar';

declare const meta: Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const WithImage: Story;
export declare const Fallback: Story;
export declare const Sizes: Story;
export declare const Group: Story;
