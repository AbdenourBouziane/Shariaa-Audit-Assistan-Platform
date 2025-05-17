import { StarIcon as StarAndCrescent } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <StarAndCrescent className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Shariah Audit</h2>
                <p className="text-xs opacity-80">Islamic Finance Compliance</p>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-4 max-w-md">
              Our advanced AI-powered audit system helps ensure your financial contracts comply with Islamic finance
              principles and standards.
            </p>
            <p className="arabic-text text-xl mt-4">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="opacity-80 hover:opacity-100 transition-opacity">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#audit-tool" className="opacity-80 hover:opacity-100 transition-opacity">
                  Audit Tool
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  Standards
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="opacity-80">Email: info@shariahaudit.com</li>
              <li className="opacity-80">Phone: +1 (555) 123-4567</li>
              <li className="opacity-80">Address: 123 Finance St, Dubai, UAE</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-80">
            &copy; {new Date().getFullYear()} Shariah Audit Assistant. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
