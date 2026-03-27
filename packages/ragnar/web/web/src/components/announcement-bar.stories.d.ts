import { Meta, StoryObj } from '@storybook/react';
import { AnnouncementBar } from './announcement-bar';

declare const meta: Meta<typeof AnnouncementBar>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithLink: Story;
export declare const WithIcon: Story;
export declare const Variants: Story;
export declare const Sizes: Story;
export declare const Rotating: Story;
export declare const Countdown: Story;
export declare const NonDismissible: Story;
