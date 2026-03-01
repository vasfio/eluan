import type { Meta, StoryObj } from "@storybook/react"
import {
  TeamSection,
  TeamHeader,
  TeamTitle,
  TeamDescription,
  TeamGrid,
  TeamMember,
  TeamMemberImage,
  TeamMemberName,
  TeamMemberRole,
  TeamMemberBio,
  TeamMemberLinks,
  TeamMemberLink,
} from "./team-section"
import { Twitter, Linkedin, Github } from "lucide-react"

const meta: Meta<typeof TeamSection> = {
  title: "Web/TeamSection",
  component: TeamSection,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "Former Google engineer with 15 years of experience.",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Full-stack developer and open source contributor.",
  },
  {
    name: "Emily Davis",
    role: "Head of Design",
    bio: "Award-winning designer with a passion for UX.",
  },
  {
    name: "James Wilson",
    role: "VP of Engineering",
    bio: "Scaling teams and building great products.",
  },
]

export const Default: Story = {
  render: () => (
    <TeamSection>
      <TeamHeader>
        <TeamTitle>Meet our team</TeamTitle>
        <TeamDescription>
          We're a passionate group of people working to build the best developer tools.
        </TeamDescription>
      </TeamHeader>
      <TeamGrid>
        {teamMembers.map((member) => (
          <TeamMember key={member.name}>
            <TeamMemberImage alt={member.name} />
            <TeamMemberName>{member.name}</TeamMemberName>
            <TeamMemberRole>{member.role}</TeamMemberRole>
          </TeamMember>
        ))}
      </TeamGrid>
    </TeamSection>
  ),
}

export const WithBios: Story = {
  render: () => (
    <TeamSection>
      <TeamHeader>
        <TeamTitle>Our leadership</TeamTitle>
      </TeamHeader>
      <TeamGrid columns={3}>
        {teamMembers.slice(0, 3).map((member) => (
          <TeamMember key={member.name} variant="card">
            <TeamMemberImage alt={member.name} />
            <TeamMemberName>{member.name}</TeamMemberName>
            <TeamMemberRole>{member.role}</TeamMemberRole>
            <TeamMemberBio>{member.bio}</TeamMemberBio>
            <TeamMemberLinks>
              <TeamMemberLink href="#" label="Twitter">
                <Twitter className="h-4 w-4" />
              </TeamMemberLink>
              <TeamMemberLink href="#" label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </TeamMemberLink>
              <TeamMemberLink href="#" label="GitHub">
                <Github className="h-4 w-4" />
              </TeamMemberLink>
            </TeamMemberLinks>
          </TeamMember>
        ))}
      </TeamGrid>
    </TeamSection>
  ),
}

export const TwoColumns: Story = {
  render: () => (
    <TeamSection>
      <TeamHeader>
        <TeamTitle>The people behind the product</TeamTitle>
        <TeamDescription>
          A diverse team of builders, creators, and dreamers.
        </TeamDescription>
      </TeamHeader>
      <TeamGrid columns={2}>
        {teamMembers.slice(0, 2).map((member) => (
          <TeamMember key={member.name} variant="card">
            <TeamMemberImage alt={member.name} />
            <TeamMemberName>{member.name}</TeamMemberName>
            <TeamMemberRole>{member.role}</TeamMemberRole>
            <TeamMemberBio>{member.bio}</TeamMemberBio>
          </TeamMember>
        ))}
      </TeamGrid>
    </TeamSection>
  ),
}
