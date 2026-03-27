import { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from './code-block';

declare const meta: Meta<typeof CodeBlock>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const JavaScript: Story;
export declare const TypeScript: Story;
export declare const CSS: Story;
export declare const WithTitle: Story;
export declare const WithLineNumbers: Story;
export declare const Copyable: Story;
