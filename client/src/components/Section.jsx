export default function Sections() {
    return (
        <div className="relative w-full isolate overflow-hidden bg-white">
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] pointer-events-none bg-gradient-to-br from-purple-300 via-pink-300 to-orange-100 opacity-50 rounded-full blur-[180px] -z-10" />
            <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] pointer-events-none bg-gradient-to-tr from-blue-300 via-green-300 to-yellow-100 opacity-50 rounded-full blur-[180px] -z-10" />

            <div className="relative z-10 w-full py-20 px-6 space-y-24">
                <section id="services" className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {[
                            {
                                title: "Web Design",
                                desc: "Beautiful and responsive designs tailored for your business goals.",
                            },
                            {
                                title: "Development",
                                desc: "Full-stack web development using modern frameworks and best practices.",
                            },
                            {
                                title: "SEO & Marketing",
                                desc: "Boost your visibility with SEO and digital marketing strategies.",
                            },
                        ].map((service, i) => (
                            <div
                                key={i}
                                className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-white/50 flex flex-col items-start"
                            >
                                <div className="mb-4 p-3 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center">
                                    <span className="w-6 h-6 bg-gray-400 rounded-full"></span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                                <p className="text-gray-600">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="contact" className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Contact Us</h2>
                    <p className="text-gray-600 mb-8">Have a question or want to start a project? Let’s talk!</p>

                    {/* Replace with your own Formspree endpoint */}
                    <form
                        action="https://formspree.io/f/xqallvvz"
                        method="POST"
                        className="grid gap-6 bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-white/60 shadow-lg"
                    >
                        <div className="grid w-full items-center gap-1.5 text-left">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name</label>
                            <input
                                required
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Your Name"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="grid w-full items-center gap-1.5 text-left">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Your Email</label>
                            <input
                                required
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Your Email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <textarea
                            required
                            name="message"
                            placeholder="Your Message"
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 resize-none"
                        ></textarea>

                        <button
                            type="submit"
                            className="bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </section>

            </div>
        </div>
    );
}
