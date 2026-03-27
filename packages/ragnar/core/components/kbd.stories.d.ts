import { Meta, StoryObj } from '@storybook/react';
import { Kbd } from './kbd';

declare const meta: Meta<typeof Kbd>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithKeys: Story;
export declare const MultipleKeys: Story;
export declare const Variants: Story;
export declare const Sizes: Story;
export declare const CommonShortcuts: Story;
export declare const KeyGroup: Story;
export declare const InContext: Story;
