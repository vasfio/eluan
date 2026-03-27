import { Meta, StoryObj } from '@storybook/react';
import { Hero } from './hero';

declare const meta: Meta<typeof Hero>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const LeftAligned: Story;
export declare const FullHeight: Story;
export declare const WithImage: Story;
