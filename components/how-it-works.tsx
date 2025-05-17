import { FileText, Search, AlertTriangle, CheckCircle } from "lucide-react"

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-accent/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our Shariah audit process uses advanced technology to analyze financial contracts and ensure they comply
            with Islamic finance principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-card rounded-xl p-6 h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "1. Submit Contract",
    description: "Paste your financial contract or product description into our audit tool.",
  },
  {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: "2. AI Analysis",
    description: "Our AI analyzes your contract against Islamic finance principles and standards.",
  },
  {
    icon: <AlertTriangle className="h-8 w-8 text-primary" />,
    title: "3. Identify Issues",
    description: "The system identifies potentially non-compliant clauses and rates their severity.",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: "4. Get Recommendations",
    description: "Receive detailed recommendations on how to make your contract Shariah compliant.",
  },
]
