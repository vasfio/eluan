import { Meta, StoryObj } from '@storybook/react';
import { AppDownloadSection } from './app-download';

declare const meta: Meta<typeof AppDownloadSection>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Dark: Story;
export declare const Gradient: Story;
export declare const WithQRCode: Story;
export declare const SimpleBadges: Story;
