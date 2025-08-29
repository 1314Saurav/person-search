import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="border-t bg-muted/30 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-1">
              <div className="bg-background rounded p-1">
                <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PD
                </span>
              </div>
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              PersonDash
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="mailto:contact@persondash.com">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} PersonDash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

