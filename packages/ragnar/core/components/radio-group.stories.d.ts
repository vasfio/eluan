import { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './radio-group';

declare const meta: Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Horizontal: Story;
export declare const WithDescriptions: Story;
