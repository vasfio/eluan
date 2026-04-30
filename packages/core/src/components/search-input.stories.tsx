import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { SearchInput, CommandSearch, AutocompleteSearch } from "./search-input"
import { Code, FileText, Image, Music, Video } from "lucide-react"

const meta: Meta<typeof SearchInput> = {
  title: "Components/Search Input",
  component: SearchInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A collection of search input variants including a basic search input with clear button, a command palette search with keyboard shortcut, and an autocomplete search with filterable dropdown.

**Import**
\`\`\`tsx
import { SearchInput, CommandSearch, AutocompleteSearch } from "@vasf/ragnar-core"
\`\`\`

**Usage**
\`\`\`tsx
<SearchInput
  placeholder="Search..."
  onSearch={(value) => console.log(value)}
  debounceMs={300}
/>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Basic search input with onChange and onSearch callbacks and a clear button.",
      },
    },
  },
  render: () => (
    <div className="w-[300px]">
      <SearchInput
        placeholder="Search..."
        onChange={(value) => console.log("Value:", value)}
        onSearch={(value) => console.log("Search:", value)}
      />
    </div>
  ),
}

export const WithDebounce: Story = {
  parameters: {
    docs: {
      description: {
        story: "Search input with 300ms debounce that delays the onSearch callback.",
      },
    },
  },
  render: () => (
    <div className="w-[300px] space-y-2">
      <SearchInput
        placeholder="Type to search (300ms debounce)"
        debounceMs={300}
        onSearch={(value) => console.log("Debounced search:", value)}
      />
      <p className="text-sm text-muted-foreground">Check console for debounced output</p>
    </div>
  ),
}

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: "Search input in a loading state showing a spinner instead of the clear button.",
      },
    },
  },
  render: () => (
    <div className="w-[300px]">
      <SearchInput placeholder="Searching..." loading value="react components" />
    </div>
  ),
}

export const CommandPalette: Story = {
  parameters: {
    docs: {
      description: {
        story: "CommandSearch variant with a keyboard shortcut badge that focuses the input on Cmd+K.",
      },
    },
  },
  render: () => (
    <div className="w-[300px] space-y-2">
      <CommandSearch placeholder="Search commands..." shortcutKey="K" />
      <p className="text-sm text-muted-foreground">Press ⌘K to focus</p>
    </div>
  ),
}

export const CommandPaletteCustomKey: Story = {
  parameters: {
    docs: {
      description: {
        story: "CommandSearch with a custom shortcut key (Cmd+P).",
      },
    },
  },
  render: () => (
    <div className="w-[300px] space-y-2">
      <CommandSearch placeholder="Search files..." shortcutKey="P" />
      <p className="text-sm text-muted-foreground">Press ⌘P to focus</p>
    </div>
  ),
}

const autocompleteOptions = [
  { value: "react", label: "React", description: "A JavaScript library for building user interfaces" },
  { value: "vue", label: "Vue", description: "The Progressive JavaScript Framework" },
  { value: "angular", label: "Angular", description: "Platform for building mobile and desktop web apps" },
  { value: "svelte", label: "Svelte", description: "Cybernetically enhanced web apps" },
  { value: "solid", label: "SolidJS", description: "Simple and performant reactivity" },
  { value: "next", label: "Next.js", description: "The React Framework for Production" },
  { value: "nuxt", label: "Nuxt", description: "The Intuitive Vue Framework" },
  { value: "astro", label: "Astro", description: "Build fast websites, faster" },
]

export const Autocomplete: Story = {
  parameters: {
    docs: {
      description: {
        story: "AutocompleteSearch with a filterable dropdown of framework options.",
      },
    },
  },
  render: () => (
    <div className="w-[350px]">
      <AutocompleteSearch
        placeholder="Search frameworks..."
        options={autocompleteOptions}
        onSelect={(option) => console.log("Selected:", option)}
      />
    </div>
  ),
}

export const AutocompleteWithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: "Autocomplete options with leading icons for different file types.",
      },
    },
  },
  render: () => (
    <div className="w-[350px]">
      <AutocompleteSearch
        placeholder="Search files..."
        options={[
          { value: "doc1", label: "Document.pdf", description: "PDF Document", icon: <FileText className="h-4 w-4 text-red-500" /> },
          { value: "img1", label: "Photo.jpg", description: "Image file", icon: <Image className="h-4 w-4 text-green-500" /> },
          { value: "vid1", label: "Video.mp4", description: "Video file", icon: <Video className="h-4 w-4 text-purple-500" /> },
          { value: "mus1", label: "Song.mp3", description: "Audio file", icon: <Music className="h-4 w-4 text-pink-500" /> },
          { value: "code1", label: "App.tsx", description: "TypeScript React", icon: <Code className="h-4 w-4 text-blue-500" /> },
        ]}
        onSelect={(option) => console.log("Selected:", option)}
      />
    </div>
  ),
}

export const AutocompleteGrouped: Story = {
  parameters: {
    docs: {
      description: {
        story: "Autocomplete results grouped by ecosystem using the groupBy prop.",
      },
    },
  },
  render: () => (
    <div className="w-[350px]">
      <AutocompleteSearch
        placeholder="Search frameworks..."
        options={[
          { value: "react", label: "React", description: "JavaScript library" },
          { value: "redux", label: "Redux", description: "State management" },
          { value: "vue", label: "Vue", description: "Progressive framework" },
          { value: "vuex", label: "Vuex", description: "State management for Vue" },
          { value: "angular", label: "Angular", description: "Platform" },
          { value: "ngrx", label: "NgRx", description: "Reactive state for Angular" },
        ]}
        groupBy={(option) => {
          if (option.value.startsWith("react") || option.value === "redux") return "React Ecosystem"
          if (option.value.startsWith("vue") || option.value === "vuex") return "Vue Ecosystem"
          return "Angular Ecosystem"
        }}
        onSelect={(option) => console.log("Selected:", option)}
      />
    </div>
  ),
}

export const AutocompleteMinChars: Story = {
  parameters: {
    docs: {
      description: {
        story: "Autocomplete that requires at least 2 characters before showing results.",
      },
    },
  },
  render: () => (
    <div className="w-[350px] space-y-2">
      <AutocompleteSearch
        placeholder="Type at least 2 characters..."
        options={autocompleteOptions}
        minChars={2}
        showAllOnFocus={false}
        onSelect={(option) => console.log("Selected:", option)}
      />
      <p className="text-sm text-muted-foreground">Dropdown appears after typing 2+ characters</p>
    </div>
  ),
}

export const AutocompleteLoading: Story = {
  parameters: {
    docs: {
      description: {
        story: "Simulates async autocomplete search with a 500ms loading delay.",
      },
    },
  },
  render: function AutocompleteLoadingStory() {
    const [loading, setLoading] = React.useState(false)
    const [options, setOptions] = React.useState<typeof autocompleteOptions>([])

    const handleChange = (value: string) => {
      if (value.length >= 2) {
        setLoading(true)
        setTimeout(() => {
          setOptions(autocompleteOptions.filter((opt) => opt.label.toLowerCase().includes(value.toLowerCase())))
          setLoading(false)
        }, 500)
      } else {
        setOptions([])
      }
    }

    return (
      <div className="w-[350px] space-y-2">
        <AutocompleteSearch
          placeholder="Search (async)..."
          options={options}
          loading={loading}
          minChars={2}
          showAllOnFocus={false}
          onChange={handleChange}
          onSelect={(option) => console.log("Selected:", option)}
        />
        <p className="text-sm text-muted-foreground">Simulates async search with 500ms delay</p>
      </div>
    )
  },
}

export const AutocompleteDisabledOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: "Autocomplete with some options marked as disabled and unselectable.",
      },
    },
  },
  render: () => (
    <div className="w-[350px]">
      <AutocompleteSearch
        placeholder="Search frameworks..."
        options={[
          { value: "react", label: "React", description: "Available" },
          { value: "vue", label: "Vue", description: "Coming soon", disabled: true },
          { value: "angular", label: "Angular", description: "Available" },
          { value: "svelte", label: "Svelte", description: "Coming soon", disabled: true },
        ]}
        onSelect={(option) => console.log("Selected:", option)}
      />
    </div>
  ),
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "Search input in a disabled state.",
      },
    },
  },
  render: () => (
    <div className="w-[300px]">
      <SearchInput placeholder="Search disabled" disabled />
    </div>
  ),
}
