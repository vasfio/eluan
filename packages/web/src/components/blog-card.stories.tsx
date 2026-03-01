import type { Meta, StoryObj } from "@storybook/react"
import {
  BlogGrid,
  BlogCard,
  BlogCardImage,
  BlogCardContent,
  BlogCardMeta,
  BlogCardCategory,
  BlogCardDate,
  BlogCardReadTime,
  BlogCardTitle,
  BlogCardExcerpt,
  BlogCardFooter,
  BlogCardAuthor,
  BlogCardAuthorAvatar,
  BlogCardAuthorName,
  BlogCardLink,
  BlogCardFeatured,
} from "./blog-card"

const meta: Meta<typeof BlogCard> = {
  title: "Web/BlogCard",
  component: BlogCard,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="max-w-sm">
      <BlogCard href="#">
        <BlogCardImage aspectRatio="video" />
        <BlogCardContent>
          <BlogCardMeta>
            <BlogCardCategory>Technology</BlogCardCategory>
            <BlogCardDate dateTime="2024-01-15">Jan 15, 2024</BlogCardDate>
          </BlogCardMeta>
          <BlogCardTitle>Getting Started with React Server Components</BlogCardTitle>
          <BlogCardExcerpt>
            Learn how to leverage React Server Components to build faster, more
            efficient web applications.
          </BlogCardExcerpt>
          <BlogCardFooter>
            <BlogCardAuthor>
              <BlogCardAuthorAvatar alt="John Doe" />
              <BlogCardAuthorName>John Doe</BlogCardAuthorName>
            </BlogCardAuthor>
            <BlogCardLink />
          </BlogCardFooter>
        </BlogCardContent>
      </BlogCard>
    </div>
  ),
}

export const Grid: Story = {
  render: () => (
    <BlogGrid columns={3}>
      {[1, 2, 3].map((i) => (
        <BlogCard key={i} href="#">
          <BlogCardImage aspectRatio="video" />
          <BlogCardContent>
            <BlogCardMeta>
              <BlogCardCategory>Development</BlogCardCategory>
              <BlogCardDate>Jan {10 + i}, 2024</BlogCardDate>
              <BlogCardReadTime>5 min read</BlogCardReadTime>
            </BlogCardMeta>
            <BlogCardTitle>Blog Post Title {i}</BlogCardTitle>
            <BlogCardExcerpt>
              A brief excerpt describing the content of this blog post.
            </BlogCardExcerpt>
          </BlogCardContent>
        </BlogCard>
      ))}
    </BlogGrid>
  ),
}

export const Minimal: Story = {
  render: () => (
    <div className="max-w-sm">
      <BlogCard variant="minimal" href="#">
        <BlogCardContent className="p-0">
          <BlogCardMeta>
            <BlogCardCategory>Design</BlogCardCategory>
            <BlogCardDate>Jan 20, 2024</BlogCardDate>
          </BlogCardMeta>
          <BlogCardTitle>The Future of UI Design</BlogCardTitle>
          <BlogCardExcerpt>
            Exploring upcoming trends in user interface design.
          </BlogCardExcerpt>
          <BlogCardLink className="mt-4" />
        </BlogCardContent>
      </BlogCard>
    </div>
  ),
}

export const Featured: Story = {
  render: () => (
    <BlogCardFeatured href="#">
      <BlogCardImage aspectRatio="square" className="md:aspect-auto" />
      <BlogCardContent>
        <BlogCardMeta>
          <BlogCardCategory>Featured</BlogCardCategory>
          <BlogCardDate>Jan 25, 2024</BlogCardDate>
          <BlogCardReadTime>10 min read</BlogCardReadTime>
        </BlogCardMeta>
        <BlogCardTitle className="text-2xl">
          Building Scalable Design Systems
        </BlogCardTitle>
        <BlogCardExcerpt className="line-clamp-4">
          A comprehensive guide to creating and maintaining design systems that
          scale with your organization. Learn best practices, common pitfalls,
          and real-world examples from industry leaders.
        </BlogCardExcerpt>
        <BlogCardFooter>
          <BlogCardAuthor>
            <BlogCardAuthorAvatar alt="Jane Smith" />
            <BlogCardAuthorName>Jane Smith</BlogCardAuthorName>
          </BlogCardAuthor>
          <BlogCardLink />
        </BlogCardFooter>
      </BlogCardContent>
    </BlogCardFeatured>
  ),
}

export const Elevated: Story = {
  render: () => (
    <div className="max-w-sm">
      <BlogCard variant="elevated" href="#">
        <BlogCardImage aspectRatio="video" />
        <BlogCardContent>
          <BlogCardMeta>
            <BlogCardCategory>Tutorial</BlogCardCategory>
            <BlogCardDate>Feb 1, 2024</BlogCardDate>
          </BlogCardMeta>
          <BlogCardTitle>Mastering TypeScript Generics</BlogCardTitle>
          <BlogCardExcerpt>
            Deep dive into TypeScript generics with practical examples.
          </BlogCardExcerpt>
        </BlogCardContent>
      </BlogCard>
    </div>
  ),
}
