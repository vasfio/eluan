import { Meta, StoryObj } from '@storybook/react';
import { Marquee } from './marquee';

declare const meta: Meta<typeof Marquee>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const ReverseDirection: Story;
export declare const NoFade: Story;
export declare const Testimonials: Story;
export declare const Vertical: Story;
