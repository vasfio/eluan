import { Meta, StoryObj } from '@storybook/react';
import { FAQSection } from './faq-accordion';

declare const meta: Meta<typeof FAQSection>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const CardStyle: Story;
export declare const WithContactButton: Story;
