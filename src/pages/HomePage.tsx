
import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              Climb <span className="text-climbup-purple">Up</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-gray-700 mb-4">
              Your Career Roadmap Starts Here
            </p>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Personalized career roadmaps that guide students to success, from choosing a path to landing your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-button" asChild>
                <Link to="/roadmap">Get Your Roadmap</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/quiz">Take Career Quiz</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5"></div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="gradient-card p-8 text-center">
              <h3 className="font-bold text-xl mb-4 text-gray-800">Choose your goal</h3>
              <p className="text-gray-600 mb-4">Select your dream career path or explore options</p>
              <div className="aspect-square bg-gradient-to-br from-climbup-blue/20 to-climbup-purple/20 rounded-lg flex items-center justify-center">
                <span className="text-5xl font-bold text-climbup-blue">1</span>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="gradient-card p-8 text-center">
              <h3 className="font-bold text-xl mb-4 text-gray-800">See your roadmap</h3>
              <p className="text-gray-600 mb-4">Get step-by-step guidance on your path</p>
              <div className="aspect-square bg-gradient-to-br from-climbup-blue/20 to-climbup-purple/20 rounded-lg flex items-center justify-center">
                <span className="text-5xl font-bold text-climbup-blue">2</span>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="gradient-card p-8 text-center">
              <h3 className="font-bold text-xl mb-4 text-gray-800">Start climbing</h3>
              <p className="text-gray-600 mb-4">Follow your plan and track your progress</p>
              <div className="aspect-square bg-gradient-to-br from-climbup-blue/20 to-climbup-purple/20 rounded-lg flex items-center justify-center">
                <span className="text-5xl font-bold text-climbup-blue">3</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Top Roadmaps Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Top Roadmaps You Can Explore</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover proven paths to success in these popular career options, with step-by-step guidance from experts.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Software Engineer Card */}
            <div className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow group relative">
              <div className="h-40 bg-gradient-to-r from-climbup-blue to-climbup-purple flex items-center justify-center">
                <h3 className="font-bold text-2xl text-white">Software Engineer</h3>
              </div>
              <div className="p-6">
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-gray-700">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span>Computer Science Fundamentals</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span>Programming Languages</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span>Web & Mobile Development</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/roadmap/software-engineer">
                    View Roadmap
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Data Scientist Card */}
            <div className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow group relative">
              <div className="h-40 bg-gradient-to-r from-climbup-purple to-climbup-blue flex items-center justify-center">
                <h3 className="font-bold text-2xl text-white">Data Scientist</h3>
              </div>
              <div className="p-6">
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-gray-700">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span>Mathematics & Statistics</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span>Machine Learning</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span>Data Visualization</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/roadmap/data-scientist">
                    View Roadmap
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* IAS Officer Card */}
            <div className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow group relative">
              <div className="h-40 bg-gradient-to-r from-climbup-blue to-climbup-purple flex items-center justify-center">
                <h3 className="font-bold text-2xl text-white">IAS Officer</h3>
              </div>
              <div className="p-6">
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-gray-700">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span>UPSC Exam Preparation</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span>Current Affairs Strategy</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span>Mock Interviews</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/roadmap/ias-officer">
                    View Roadmap
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button variant="outline" asChild>
              <Link to="/roadmaps">Browse All Roadmaps</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Career Quiz Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Take the Career Discovery Quiz</h2>
              <p className="text-gray-600 mb-8">
                Not sure which path to choose? Our AI-powered quiz will help you discover careers matching your interests, skills, and values.
              </p>
              <Button size="lg" className="gradient-button" asChild>
                <Link to="/quiz">Start Quiz</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">FAQs</h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>What roadmaps do you cover?</AccordionTrigger>
                <AccordionContent>
                  We offer comprehensive roadmaps for various career paths including Engineering, Medical, Civil Services, Business, Design, and many more. Each roadmap is carefully crafted by experts to provide a clear path from education to employment.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Can my solution scale with my roadmap?</AccordionTrigger>
                <AccordionContent>
                  Yes, all our roadmaps are designed to be flexible and can adapt as you progress. You can revisit and adjust your roadmap at any time as your goals evolve or as you gain new skills and experiences.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>How do you create my roadmap?</AccordionTrigger>
                <AccordionContent>
                  Our roadmaps are created through a combination of expert knowledge, industry research, and data analysis. We consider your current education level, career goals, and preferences to generate a personalized step-by-step plan that guides you toward your objectives.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Do you offer dedicated courses for exam preparation?</AccordionTrigger>
                <AccordionContent>
                  While we don't create courses ourselves, our roadmaps include curated recommendations for the best courses, study materials, and resources for exam preparation. We partner with top education providers to give you access to quality learning materials.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-climbup-blue to-climbup-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch Today</h2>
          <p className="max-w-xl mx-auto mb-8">
            Ready to start your journey towards a successful career? Reach out to us for personalized guidance and support.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-climbup-blue hover:bg-gray-100" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
