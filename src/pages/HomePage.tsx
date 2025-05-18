import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const HomePage = () => {
  return <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Blurry background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-neon-teal rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-neon-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-neon-teal rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
          <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-neon-teal rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl mb-6 text-neon-yellow font-extrabold py-[146px] px-0 mx-[31px] my-[7px] md:text-9xl">
              Climb <span className="bg-gradient-to-r from-neon-teal to-neon-yellow bg-clip-text text-transparent">Up</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-4 bg-gradient-to-r from-neon-teal to-neon-yellow bg-clip-text text-transparent">
              Your Career Roadmap Starts Here
            </p>
            <p className="text-neon-yellow mb-8 max-w-xl mx-auto">
              Personalized career roadmaps that guide students to success, from choosing a path to landing your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-neon-teal to-neon-yellow hover:from-neon-teal hover:to-neon-yellow text-black shadow-lg" asChild>
                <Link to="/roadmap">Get Your Roadmap</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-neon-yellow text-neon-yellow hover:border-neon-teal hover:text-neon-teal shadow-sm" asChild>
                <Link to="/quiz">Take Career Quiz</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5"></div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-teal/5 to-transparent -z-10"></div>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-neon-yellow">
            <span className="bg-gradient-to-r from-neon-teal to-neon-yellow bg-clip-text text-transparent">How It Works</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="backdrop-blur-sm rounded-2xl shadow-xl border border-neon-yellow/50 p-8 text-center hover:shadow-2xl transition-all bg-[#e5d0ac]">
              <h3 className="font-bold text-xl mb-4 text-neon-yellow">Choose your goal</h3>
              <p className="text-neon-yellow/80 mb-4">Select your dream career path or explore options</p>
              <div className="aspect-square bg-gradient-to-br from-neon-teal/20 to-neon-yellow/20 rounded-2xl flex items-center justify-center">
                <span className="text-5xl font-bold text-transparent bg-gradient-to-r from-neon-teal to-neon-yellow bg-clip-text">1</span>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="backdrop-blur-sm rounded-2xl shadow-xl border border-neon-yellow/50 p-8 text-center hover:shadow-2xl transition-all bg-[#e5d0ac]">
              <h3 className="font-bold text-xl mb-4 text-neon-yellow">See your roadmap</h3>
              <p className="text-neon-yellow/80 mb-4">Get step-by-step guidance on your path</p>
              <div className="aspect-square bg-gradient-to-br from-neon-teal/20 to-neon-yellow/20 rounded-2xl flex items-center justify-center">
                <span className="text-5xl font-bold text-transparent bg-gradient-to-r from-neon-teal to-neon-yellow bg-clip-text">2</span>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="backdrop-blur-sm rounded-2xl shadow-xl border border-neon-yellow/50 p-8 text-center hover:shadow-2xl transition-all bg-[#e5d0ac]">
              <h3 className="font-bold text-xl mb-4 text-neon-yellow">Start climbing</h3>
              <p className="text-neon-yellow/80 mb-4">Follow your plan and track your progress</p>
              <div className="aspect-square bg-gradient-to-br from-neon-teal/20 to-neon-yellow/20 rounded-2xl flex items-center justify-center">
                <span className="text-5xl font-bold text-transparent bg-gradient-to-r from-neon-teal to-neon-yellow bg-clip-text">3</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Top Roadmaps Section */}
      <section className="py-20 bg-gradient-to-b from-black to-black/80 relative rounded-3xl bg-[#a31d1d]">
        <div className="container bg-[transparentA#E5D0ACA] bg-[#e5d0ac] py-[37px] px-[33px] mx-0 rounded-3xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-neon-yellow">Top Roadmaps You Can Explore</h2>
          <p className="text-neon-yellow/80 text-center mb-12 max-w-2xl mx-auto">
            Discover proven paths to success in these popular career options, with step-by-step guidance from experts.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Software Engineer Card */}
            <div className="rounded-2xl overflow-hidden bg-black shadow-lg hover:shadow-xl transition-shadow group relative border border-neon-teal/50">
              <div className="h-40 bg-gradient-to-r from-neon-teal to-neon-yellow/70 flex items-center justify-center">
                <h3 className="font-bold text-2xl text-black">Software Engineer</h3>
              </div>
              <div className="p-6">
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-neon-yellow">
                    <Check size={16} className="text-neon-teal mr-2" />
                    <span>Computer Science Fundamentals</span>
                  </li>
                  <li className="flex items-center text-neon-yellow">
                    <Check size={16} className="text-neon-teal mr-2" />
                    <span>Programming Languages</span>
                  </li>
                  <li className="flex items-center text-neon-yellow">
                    <Check size={16} className="text-neon-teal mr-2" />
                    <span>Web & Mobile Development</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full hover:bg-neon-teal/20 text-neon-teal hover:text-neon-teal border-neon-teal group-hover:border-neon-teal transition-colors" asChild>
                  <Link to="/roadmap/software-engineer">
                    View Roadmap
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Data Scientist Card */}
            <div className="rounded-2xl overflow-hidden bg-black shadow-lg hover:shadow-xl transition-shadow group relative border border-neon-yellow/50">
              <div className="h-40 bg-gradient-to-r from-neon-yellow to-neon-teal flex items-center justify-center">
                <h3 className="font-bold text-2xl text-black">Data Scientist</h3>
              </div>
              <div className="p-6">
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-neon-yellow">
                    <Check size={16} className="text-neon-teal mr-2" />
                    <span>Mathematics & Statistics</span>
                  </li>
                  <li className="flex items-center text-neon-yellow">
                    <Check size={16} className="text-neon-teal mr-2" />
                    <span>Machine Learning</span>
                  </li>
                  <li className="flex items-center text-neon-yellow">
                    <Check size={16} className="text-neon-teal mr-2" />
                    <span>Data Visualization</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full hover:bg-neon-yellow/20 text-neon-yellow hover:text-neon-yellow border-neon-yellow group-hover:border-neon-yellow transition-colors" asChild>
                  <Link to="/roadmap/data-scientist">
                    View Roadmap
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* IAS Officer Card */}
            <div className="rounded-2xl overflow-hidden bg-black shadow-lg hover:shadow-xl transition-shadow group relative border border-neon-teal/50">
              <div className="h-40 bg-gradient-to-r from-neon-teal to-neon-yellow/70 flex items-center justify-center">
                <h3 className="font-bold text-2xl text-black">IAS Officer</h3>
              </div>
              <div className="p-6">
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-neon-yellow">
                    <Check size={16} className="text-neon-teal mr-2" />
                    <span>UPSC Exam Preparation</span>
                  </li>
                  <li className="flex items-center text-neon-yellow">
                    <Check size={16} className="text-neon-teal mr-2" />
                    <span>Current Affairs Strategy</span>
                  </li>
                  <li className="flex items-center text-neon-yellow">
                    <Check size={16} className="text-neon-teal mr-2" />
                    <span>Mock Interviews</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full hover:bg-neon-teal/20 text-neon-teal hover:text-neon-teal border-neon-teal group-hover:border-neon-teal transition-colors" asChild>
                  <Link to="/roadmap/ias-officer">
                    View Roadmap
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button variant="outline" className="border-2 border-neon-yellow text-neon-yellow hover:text-neon-teal hover:border-neon-teal" asChild>
              <Link to="/roadmaps">Browse All Roadmaps</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Career Quiz Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-black/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-neon-yellow/50 relative overflow-hidden">
            {/* Background gradient circles */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-neon-teal/20 rounded-full opacity-60"></div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-neon-yellow/20 rounded-full opacity-60"></div>
            
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <h2 className="text-3xl font-bold mb-6 text-neon-yellow">Take the Career Discovery Quiz</h2>
              <p className="text-neon-yellow/80 mb-8">
                Not sure which path to choose? Our AI-powered quiz will help you discover careers matching your interests, skills, and values.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-neon-teal to-neon-yellow hover:from-neon-teal hover:to-neon-yellow text-black shadow-lg" asChild>
                <Link to="/quiz">Start Quiz</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-black/50 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-neon-yellow">
            <span className="bg-gradient-to-r from-neon-teal to-neon-yellow bg-clip-text text-transparent">FAQs</span>
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="border border-neon-yellow/30 rounded-lg mb-4 shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:bg-black/30 text-neon-yellow font-medium">
                  What roadmaps do you cover?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-neon-yellow/70">
                  We offer comprehensive roadmaps for various career paths including Engineering, Medical, Civil Services, Business, Design, and many more. Each roadmap is carefully crafted by experts to provide a clear path from education to employment.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border border-neon-yellow/30 rounded-lg mb-4 shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:bg-black/30 text-neon-yellow font-medium">
                  Can my solution scale with my roadmap?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-neon-yellow/70">
                  Yes, all our roadmaps are designed to be flexible and can adapt as you progress. You can revisit and adjust your roadmap at any time as your goals evolve or as you gain new skills and experiences.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border border-neon-yellow/30 rounded-lg mb-4 shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:bg-black/30 text-neon-yellow font-medium">
                  How do you create my roadmap?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-neon-yellow/70">
                  Our roadmaps are created through a combination of expert knowledge, industry research, and data analysis. We consider your current education level, career goals, and preferences to generate a personalized step-by-step plan that guides you toward your objectives.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border border-neon-yellow/30 rounded-lg mb-4 shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:bg-black/30 text-neon-yellow font-medium">
                  Do you offer dedicated courses for exam preparation?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-neon-yellow/70">
                  While we don't create courses ourselves, our roadmaps include curated recommendations for the best courses, study materials, and resources for exam preparation. We partner with top education providers to give you access to quality learning materials.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-neon-teal/20 to-neon-yellow/20 text-neon-yellow relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-teal rounded-full mix-blend-overlay opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-neon-yellow rounded-full mix-blend-overlay opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Get in Touch Today</h2>
          <p className="max-w-xl mx-auto mb-8">
            Ready to start your journey towards a successful career? Reach out to us for personalized guidance and support.
          </p>
          <Button size="lg" className="bg-black text-neon-yellow border border-neon-yellow hover:bg-neon-yellow/10 shadow-lg" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>;
};
export default HomePage;