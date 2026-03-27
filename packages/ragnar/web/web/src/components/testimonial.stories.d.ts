import { Meta, StoryObj } from '@storybook/react';
import { Testimonial } from './testimonial';

declare const meta: Meta<typeof Testimonial>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Card: Story;
export declare const Featured: Story;
export declare const Grid: Story;
export declare const Carousel: Story;
