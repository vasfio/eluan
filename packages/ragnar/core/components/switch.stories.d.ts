import { Meta, StoryObj } from '@storybook/react';
import { Switch } from './switch';

declare const meta: Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithLabel: Story;
export declare const Disabled: Story;
export declare const CheckedByDefault: Story;
export declare const SettingsExample: Story;
