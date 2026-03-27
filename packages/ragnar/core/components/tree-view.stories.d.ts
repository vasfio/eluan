import { Meta, StoryObj } from '@storybook/react';
import { TreeView } from './tree-view';

declare const meta: Meta<typeof TreeView>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithCustomIcons: Story;
export declare const WithoutIcons: Story;
export declare const ControlledExpansion: Story;
export declare const LargerIndent: Story;
