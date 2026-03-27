import { Meta, StoryObj } from '@storybook/react';
import { Image } from './media';

declare const meta: Meta<typeof Image>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const ImageDefault: Story;
export declare const ImageRounded: Story;
export declare const ImageWithFallback: Story;
export declare const VideoDefault: Story;
