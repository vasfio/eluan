import { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './carousel';

declare const meta: Meta<typeof Carousel>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const MultipleItems: Story;
export declare const Vertical: Story;
