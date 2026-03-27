import { Meta, StoryObj } from '@storybook/react';
import { Card } from './card';

declare const meta: Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithActions: Story;
export declare const Simple: Story;
