import { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './pagination';

declare const meta: Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Simple: Story;
export declare const ManyPages: Story;
