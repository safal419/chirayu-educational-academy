import { Eye, Target } from "lucide-react";

export default function MissionVisionHome() {
  return (
    <section className="py-20 bg-white relative">
      {/* Section Divider - Bottom */}
      <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Mission{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              & Vision
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Guiding principles that shape our educational philosophy and drive
            our commitment to excellence
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="flex items-center mb-6">
              <Target className="w-10 h-10 text-blue-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition-shadow duration-300">
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                To provide quality education that nurtures intellectual
                curiosity, critical thinking, and moral values in our students.
                We are committed to creating a supportive learning environment
                that empowers every child to reach their full potential and
                become responsible global citizens.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through innovative teaching methods, dedicated faculty, and
                comprehensive programs, we prepare our students for academic
                success and lifelong learning while fostering creativity,
                leadership, and social responsibility.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/bus.jpg"
              alt="Students in classroom"
              className="rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-2">
            <div className="flex items-center mb-6">
              <Eye className="w-10 h-10 text-blue-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition-shadow duration-300">
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                To be recognized as a leading educational institution in Nepal,
                known for academic excellence, character development, and
                innovative teaching practices. We envision a future where our
                graduates become confident, compassionate, and capable leaders
                who contribute positively to society.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We aspire to create an educational ecosystem that celebrates
                diversity, promotes inclusivity, and prepares students for the
                challenges and opportunities of the 21st century through
                holistic development and cutting-edge learning experiences.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Creating a future where every student thrives and contributes
                meaningfully to society through transformative education,
                innovative learning, and strong moral foundations.
              </p>
            </div>
          </div>
          <div className="lg:order-1 relative">
            <img
              src="/play.jpg"
              alt="Graduation ceremony"
              className="rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
