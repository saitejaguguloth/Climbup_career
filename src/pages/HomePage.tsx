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
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
          <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl mb-6 text-gray-900 font-extrabold py-[146px] px-0 mx-[31px] my-[7px] md:text-9xl">
              Climb <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Up</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-4 bg-gradient-to-r from-blue-700 to-violet-700 bg-clip-text text-transparent">
              Your Career Roadmap Starts Here
            </p>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Personalized career roadmaps that guide students to success, from choosing a path to landing your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg" asChild>
                <Link to="/roadmap">Get Your Roadmap</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-gray-200 hover:border-gray-300 shadow-sm" asChild>
                <Link to="/quiz">Take Career Quiz</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5"></div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent -z-10"></div>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">How It Works</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 text-center hover:shadow-2xl transition-all">
              <h3 className="font-bold text-xl mb-4 text-gray-800">Choose your goal</h3>
              <p className="text-gray-600 mb-4">Select your dream career path or explore options</p>
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-violet-100 rounded-2xl flex items-center justify-center">
                <span className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text">1</span>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 text-center hover:shadow-2xl transition-all">
              <h3 className="font-bold text-xl mb-4 text-gray-800">See your roadmap</h3>
              <p className="text-gray-600 mb-4">Get step-by-step guidance on your path</p>
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-violet-100 rounded-2xl flex items-center justify-center">
                <span className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text">2</span>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 text-center hover:shadow-2xl transition-all">
              <h3 className="font-bold text-xl mb-4 text-gray-800">Start climbing</h3>
              <p className="text-gray-600 mb-4">Follow your plan and track your progress</p>
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-violet-100 rounded-2xl flex items-center justify-center">
                <span className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text">3</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Top Roadmaps Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Top Roadmaps You Can Explore</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover proven paths to success in these popular career options, with step-by-step guidance from experts.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Software Engineer Card */}
            <div className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow group relative">
              <div className="h-40 bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center">
                <h3 className="font-bold text-2xl text-white">Software Engineer</h3>
              </div>
              <div className="p-6">
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-gray-700">
                    <Check size={16} className="text-emerald-500 mr-2" />
                    <span>Computer Science Fundamentals</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check size={16} className="text-emerald-500 mr-2" />
                    <span>Programming Languages</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check size={16} className="text-emerald-500 mr-2" />
                    <span>Web & Mobile Development</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full hover:bg-blue-50 hover:text-blue-700 group-hover:border-blue-300 transition-colors" asChild>
                  <Link to="/roadmap/software-engineer">
                    View Roadmap
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Data Scientist Card */}
            <div className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow group relative">
              <div className="h-40 bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center">
                <h3 className="font-bold text-2xl text-white">Data Scientist</h3>
              </div>
              <div className="p-6">
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-gray-700">
                    <Check size={16} className="text-emerald-500 mr-2" />
                    <span>Mathematics & Statistics</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check size={16} className="text-emerald-500 mr-2" />
                    <span>Machine Learning</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check size={16} className="text-emerald-500 mr-2" />
                    <span>Data Visualization</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full hover:bg-violet-50 hover:text-violet-700 group-hover:border-violet-300 transition-colors" asChild>
                  <Link to="/roadmap/data-scientist">
                    View Roadmap
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* IAS Officer Card */}
            <div className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow group relative">
              <div className="h-40 bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center">
                <h3 className="font-bold text-2xl text-white">IAS Officer</h3>
              </div>
              <div className="p-6">
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-gray-700">
                    <Check size={16} className="text-emerald-500 mr-2" />
                    <span>UPSC Exam Preparation</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check size={16} className="text-emerald-500 mr-2" />
                    <span>Current Affairs Strategy</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check size={16} className="text-emerald-500 mr-2" />
                    <span>Mock Interviews</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full hover:bg-blue-50 hover:text-blue-700 group-hover:border-blue-300 transition-colors" asChild>
                  <Link to="/roadmap/ias-officer">
                    View Roadmap
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button variant="outline" className="border-2 border-gray-200 hover:border-gray-300" asChild>
              <Link to="/roadmaps">Browse All Roadmaps</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Career Quiz Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-white/50 relative overflow-hidden">
            {/* Background gradient circles */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100 rounded-full opacity-60"></div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-violet-100 rounded-full opacity-60"></div>
            
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Take the Career Discovery Quiz</h2>
              <p className="text-gray-600 mb-8">
                Not sure which path to choose? Our AI-powered quiz will help you discover careers matching your interests, skills, and values.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg" asChild>
                <Link to="/quiz">Start Quiz</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">FAQs</span>
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="border border-gray-200 rounded-lg mb-4 shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-gray-800 font-medium">
                  What roadmaps do you cover?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  We offer comprehensive roadmaps for various career paths including Engineering, Medical, Civil Services, Business, Design, and many more. Each roadmap is carefully crafted by experts to provide a clear path from education to employment.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border border-gray-200 rounded-lg mb-4 shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-gray-800 font-medium">
                  Can my solution scale with my roadmap?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  Yes, all our roadmaps are designed to be flexible and can adapt as you progress. You can revisit and adjust your roadmap at any time as your goals evolve or as you gain new skills and experiences.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border border-gray-200 rounded-lg mb-4 shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-gray-800 font-medium">
                  How do you create my roadmap?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  Our roadmaps are created through a combination of expert knowledge, industry research, and data analysis. We consider your current education level, career goals, and preferences to generate a personalized step-by-step plan that guides you toward your objectives.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border border-gray-200 rounded-lg mb-4 shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-gray-800 font-medium">
                  Do you offer dedicated courses for exam preparation?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  While we don't create courses ourselves, our roadmaps include curated recommendations for the best courses, study materials, and resources for exam preparation. We partner with top education providers to give you access to quality learning materials.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-violet-600 text-white relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-overlay opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Get in Touch Today</h2>
          <p className="max-w-xl mx-auto mb-8">
            Ready to start your journey towards a successful career? Reach out to us for personalized guidance and support.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>;
};
export default HomePage;