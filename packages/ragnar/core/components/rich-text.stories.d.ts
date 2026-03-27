import { Meta, StoryObj } from '@storybook/react';
import { RichText } from './rich-text';

declare const meta: Meta<typeof RichText>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithInitialContent: Story;
export declare const CustomMinHeight: Story;
export declare const Disabled: Story;
