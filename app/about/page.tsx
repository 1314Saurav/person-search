import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Github, Linkedin, Twitter, Users, BarChart3, Settings, Database, Shield, Zap } from 'lucide-react'

function ProjectOverview() {
  const features = [
    { icon: Users, label: "User Management", description: "Complete CRUD operations for user data" },
    { icon: BarChart3, label: "Analytics Dashboard", description: "Insights and data visualization" },
    { icon: Database, label: "Database Integration", description: "Prisma ORM with PostgreSQL" },
    { icon: Shield, label: "Authentication", description: "NextAuth.js with Google OAuth" },
    { icon: Settings, label: "Management Tools", description: "Bulk operations and data export" },
    { icon: Zap, label: "Real-time Search", description: "Fast and responsive filtering" }
  ]

  const technologies = [
    "Next.js 15", "React 19", "TypeScript", "Prisma", "NextAuth.js", 
    "Tailwind CSS", "shadcn/ui", "PostgreSQL", "Vercel", "MCP"
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2">
              <Users className="h-5 w-5 text-white" />
            </div>
            PersonDash Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            PersonDash is a comprehensive user management platform built with modern web technologies. 
            It showcases advanced features including authentication, database integration, and analytics.
          </p>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-muted rounded-lg p-2">
                  <feature.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">{feature.label}</div>
                  <div className="text-sm text-muted-foreground">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Technologies Used</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Built with cutting-edge technologies and best practices for modern web development.
          </p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm text-muted-foreground">
            <div><strong>Frontend:</strong> Next.js 15 with React 19 and TypeScript</div>
            <div><strong>Backend:</strong> Prisma ORM with PostgreSQL database</div>
            <div><strong>Authentication:</strong> NextAuth.js with Google OAuth</div>
            <div><strong>Styling:</strong> Tailwind CSS with shadcn/ui components</div>
            <div><strong>Deployment:</strong> Vercel with automatic deployments</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DeveloperInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About the Developer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <p className="mb-4 text-muted-foreground">
              Hi, I&apos;m <span className="font-semibold text-foreground">Callum Bir</span>, the developer behind PersonDash. 
              I&apos;m passionate about creating efficient, user-friendly web applications using the latest technologies.
            </p>
            <p className="mb-4 text-muted-foreground">
              This project demonstrates full-stack development skills including database design, 
              authentication systems, API development, and modern UI/UX principles.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="default" size="sm">
                <Link href="https://www.linkedin.com/in/callumbir/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="https://github.com/gocallum" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Link>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <Link href="https://x.com/callumbir" target="_blank" rel="noopener noreferrer">
                  <Twitter className="mr-2 h-4 w-4" /> Contact
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-2">About PersonDash</h1>
          <p className="text-xl text-muted-foreground">
            A modern user management platform with analytics and authentication
          </p>
        </div>
        
        <div className="space-y-8">
          <ProjectOverview />
          <DeveloperInfo />
        </div>
      </main>
    </div>
  )
}

