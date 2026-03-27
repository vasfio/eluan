import { Meta, StoryObj } from '@storybook/react';
import { VideoPlayer } from './video-player';

declare const meta: Meta<typeof VideoPlayer>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const AutoPlay: Story;
export declare const YouTube: Story;
export declare const Vimeo: Story;
export declare const AspectRatios: Story;
export declare const RoundedVariants: Story;
export declare const Modal: Story;
export declare const BackgroundVideo: Story;
