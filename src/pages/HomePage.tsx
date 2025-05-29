
import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { NeonTitle, NeonButton } from "@/components/ui/neon-elements";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      {/* Background blurry elements - matching games page */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-neon-yellow rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-neon-teal rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-neon-orange rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-3000"></div>
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-neon-purple rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <NeonTitle size="2xl" color="yellow" className="mb-6">
              Climb <span className="text-neon-teal">Up</span>
            </NeonTitle>
            <NeonTitle size="md" color="teal" className="mb-4 font-medium">
              Your Career Roadmap Starts Here
            </NeonTitle>
            <p className="text-white/80 mb-8 max-w-xl mx-auto text-lg">
              Personalized career roadmaps that guide students to success, from choosing a path to landing your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeonButton size="lg" color="yellow" variant="solid" asChild>
                <Link to="/roadmap">Get Your Roadmap</Link>
              </NeonButton>
              <NeonButton size="lg" color="teal" variant="outline" asChild>
                <Link to="/quiz">Take Career Quiz</Link>
              </NeonButton>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <NeonTitle size="xl" color="orange" className="text-center mb-12">
            How It Works
          </NeonTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-neon-yellow/30 p-8 text-center hover:shadow-[0_0_20px_theme(colors.neon.yellow)] transition-all">
              <h3 className="font-display text-xl mb-4 text-neon-yellow tracking-wider">Choose your goal</h3>
              <p className="text-white/70 mb-4">Select your dream career path or explore options</p>
              <div className="aspect-square bg-gradient-to-br from-neon-yellow/20 to-neon-yellow/10 rounded-2xl flex items-center justify-center border border-neon-yellow/30">
                <span className="text-5xl font-bold text-neon-yellow font-display">1</span>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-neon-teal/30 p-8 text-center hover:shadow-[0_0_20px_theme(colors.neon.teal)] transition-all">
              <h3 className="font-display text-xl mb-4 text-neon-teal tracking-wider">See your roadmap</h3>
              <p className="text-white/70 mb-4">Get step-by-step guidance on your path</p>
              <div className="aspect-square bg-gradient-to-br from-neon-teal/20 to-neon-teal/10 rounded-2xl flex items-center justify-center border border-neon-teal/30">
                <span className="text-5xl font-bold text-neon-teal font-display">2</span>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-neon-orange/30 p-8 text-center hover:shadow-[0_0_20px_theme(colors.neon.orange)] transition-all">
              <h3 className="font-display text-xl mb-4 text-neon-orange tracking-wider">Start climbing</h3>
              <p className="text-white/70 mb-4">Follow your plan and track your progress</p>
              <div className="aspect-square bg-gradient-to-br from-neon-orange/20 to-neon-orange/10 rounded-2xl flex items-center justify-center border border-neon-orange/30">
                <span className="text-5xl font-bold text-neon-orange font-display">3</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Top Roadmaps Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <NeonTitle size="xl" color="yellow" className="text-center mb-4">
            Top Roadmaps You Can Explore
          </NeonTitle>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto text-lg">
            Discover proven paths to success in these popular career options, with step-by-step guidance from experts.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Software Engineer Card */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-neon-yellow/40 hover:shadow-[0_0_20px_theme(colors.neon.yellow)] transition-all group overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-neon-yellow/30 to-neon-yellow/10 flex items-center justify-center border-b border-neon-yellow/30">
                <h3 className="font-display text-2xl text-neon-yellow tracking-wider">Software Engineer</h3>
              </div>
              <div className="p-6">
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-white/80">
                    <Check size={16} className="text-neon-yellow mr-2" />
                    <span>Computer Science Fundamentals</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check size={16} className="text-neon-yellow mr-2" />
                    <span>Programming Languages</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check size={16} className="text-neon-yellow mr-2" />
                    <span>Web & Mobile Development</span>
                  </li>
                </ul>
                <NeonButton color="yellow" variant="outline" className="w-full" asChild>
                  <Link to="/roadmap/software-engineer">
                    View Roadmap
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </NeonButton>
              </div>
            </div>
            
            {/* Data Scientist Card */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-neon-teal/40 hover:shadow-[0_0_20px_theme(colors.neon.teal)] transition-all group overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-neon-teal/30 to-neon-teal/10 flex items-center justify-center border-b border-neon-teal/30">
                <h3 className="font-display text-2xl text-neon-teal tracking-wider">Data Scientist</h3>
              </div>
              <div className="p-6">
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-white/80">
                    <Check size={16} className="text-neon-teal mr-2" />
                    <span>Mathematics & Statistics</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check size={16} className="text-neon-teal mr-2" />
                    <span>Machine Learning</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check size={16} className="text-neon-teal mr-2" />
                    <span>Data Visualization</span>
                  </li>
                </ul>
                <NeonButton color="teal" variant="outline" className="w-full" asChild>
                  <Link to="/roadmap/data-scientist">
                    View Roadmap
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </NeonButton>
              </div>
            </div>
            
            {/* IAS Officer Card */}
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-neon-orange/40 hover:shadow-[0_0_20px_theme(colors.neon.orange)] transition-all group overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-neon-orange/30 to-neon-orange/10 flex items-center justify-center border-b border-neon-orange/30">
                <h3 className="font-display text-2xl text-neon-orange tracking-wider">IAS Officer</h3>
              </div>
              <div className="p-6">
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-white/80">
                    <Check size={16} className="text-neon-orange mr-2" />
                    <span>UPSC Exam Preparation</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check size={16} className="text-neon-orange mr-2" />
                    <span>Current Affairs Strategy</span>
                  </li>
                  <li className="flex items-center text-white/80">
                    <Check size={16} className="text-neon-orange mr-2" />
                    <span>Mock Interviews</span>
                  </li>
                </ul>
                <NeonButton color="orange" variant="outline" className="w-full" asChild>
                  <Link to="/roadmap/ias-officer">
                    View Roadmap
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </NeonButton>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <NeonButton color="teal" variant="outline" asChild>
              <Link to="/roadmap">Browse All Roadmaps</Link>
            </NeonButton>
          </div>
        </div>
      </section>
      
      {/* Career Quiz Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-black/40 backdrop-blur-sm rounded-3xl border border-neon-yellow/40 p-8 md:p-12 relative overflow-hidden">
            {/* Background gradient circles */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-neon-teal/20 rounded-full opacity-60"></div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-neon-orange/20 rounded-full opacity-60"></div>
            
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <NeonTitle size="xl" color="teal" className="mb-6">
                Take the Career Discovery Quiz
              </NeonTitle>
              <p className="text-white/70 mb-8 text-lg">
                Not sure which path to choose? Our AI-powered quiz will help you discover careers matching your interests, skills, and values.
              </p>
              <NeonButton size="lg" color="teal" variant="solid" asChild>
                <Link to="/quiz">Start Quiz</Link>
              </NeonButton>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <NeonTitle size="xl" color="orange" className="text-center mb-12">
            FAQs
          </NeonTitle>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="border border-neon-yellow/30 rounded-lg mb-4 bg-black/30 backdrop-blur-sm">
                <AccordionTrigger className="px-6 py-4 hover:bg-neon-yellow/10 text-white font-medium font-display tracking-wide">
                  What roadmaps do you cover?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-white/70">
                  We offer comprehensive roadmaps for various career paths including Engineering, Medical, Civil Services, Business, Design, and many more. Each roadmap is carefully crafted by experts to provide a clear path from education to employment.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border border-neon-teal/30 rounded-lg mb-4 bg-black/30 backdrop-blur-sm">
                <AccordionTrigger className="px-6 py-4 hover:bg-neon-teal/10 text-white font-medium font-display tracking-wide">
                  Can my solution scale with my roadmap?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-white/70">
                  Yes, all our roadmaps are designed to be flexible and can adapt as you progress. You can revisit and adjust your roadmap at any time as your goals evolve or as you gain new skills and experiences.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border border-neon-orange/30 rounded-lg mb-4 bg-black/30 backdrop-blur-sm">
                <AccordionTrigger className="px-6 py-4 hover:bg-neon-orange/10 text-white font-medium font-display tracking-wide">
                  How do you create my roadmap?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-white/70">
                  Our roadmaps are created through a combination of expert knowledge, industry research, and data analysis. We consider your current education level, career goals, and preferences to generate a personalized step-by-step plan that guides you toward your objectives.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border border-neon-yellow/30 rounded-lg mb-4 bg-black/30 backdrop-blur-sm">
                <AccordionTrigger className="px-6 py-4 hover:bg-neon-yellow/10 text-white font-medium font-display tracking-wide">
                  Do you offer dedicated courses for exam preparation?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-white/70">
                  While we don't create courses ourselves, our roadmaps include curated recommendations for the best courses, study materials, and resources for exam preparation. We partner with top education providers to give you access to quality learning materials.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-neon-yellow/20 to-neon-teal/20 relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-orange rounded-full mix-blend-overlay opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-neon-yellow rounded-full mix-blend-overlay opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <NeonTitle size="xl" color="teal" className="mb-6">
            Get in Touch Today
          </NeonTitle>
          <p className="max-w-xl mx-auto mb-8 text-white/80 text-lg">
            Ready to start your journey towards a successful career? Reach out to us for personalized guidance and support.
          </p>
          <NeonButton size="lg" color="orange" variant="solid" asChild>
            <Link to="/contact">Contact Us</Link>
          </NeonButton>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
