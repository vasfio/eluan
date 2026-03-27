import { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './spinner';

declare const meta: Meta<typeof Spinner>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Sizes: Story;
export declare const WithText: Story;
export declare const InButton: Story;
