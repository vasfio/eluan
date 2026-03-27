import { Meta, StoryObj } from '@storybook/react';
import { ContentSpot } from './content-spot';

declare const meta: Meta<typeof ContentSpot>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const LeftAligned: Story;
export declare const LargeSize: Story;
