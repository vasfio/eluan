import { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from './aspect-ratio';

declare const meta: Meta<typeof AspectRatio>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Square: Story;
export declare const Portrait: Story;
export declare const Ratios: Story;
