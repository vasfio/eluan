import { Meta, StoryObj } from '@storybook/react';
import { FeatureSpot } from './feature-spot';

declare const meta: Meta<typeof FeatureSpot>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Grid: Story;
export declare const SplitLayout: Story;
export declare const ReverseSplit: Story;
