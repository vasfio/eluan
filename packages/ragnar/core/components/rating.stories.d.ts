import { Meta, StoryObj } from '@storybook/react';
import { Rating } from './rating';

declare const meta: Meta<typeof Rating>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const ReadOnly: Story;
export declare const Sizes: Story;
export declare const HalfStars: Story;
export declare const CustomCount: Story;
export declare const WithLabel: Story;
