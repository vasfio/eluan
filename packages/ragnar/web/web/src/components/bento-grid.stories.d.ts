import { Meta, StoryObj } from '@storybook/react';
import { BentoGrid } from './bento-grid';

declare const meta: Meta<typeof BentoGrid>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithBadges: Story;
export declare const GhostVariant: Story;
export declare const DottedVariant: Story;
export declare const PresetLayouts: Story;
