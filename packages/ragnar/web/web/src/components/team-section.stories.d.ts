import { Meta, StoryObj } from '@storybook/react';
import { TeamSection } from './team-section';

declare const meta: Meta<typeof TeamSection>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithBios: Story;
export declare const TwoColumns: Story;
