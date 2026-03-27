import { Meta, StoryObj } from '@storybook/react';
import { ContactSection } from './contact-form';

declare const meta: Meta<typeof ContactSection>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const SimpleForm: Story;
export declare const CardForm: Story;
