import { ArrowUpRightIcon, Github, Instagram, Linkedin, Twitter } from "lucide-react"

const footerLinks = [
    {
        title: "Twitter",
        icon: Twitter,
        href: 'https://x.com/low_Key_noob?t=Chyfvl5S2X_2FbZlBDSp3A&s=08'
    },
    {
        title: "Instagram",
        icon: Instagram,
        href: "https://www.instagram.com/omgupta7632?igsh=MWRjMjExMG5kY2h3NA=="
    },
    {
        title: "Linkedin",
        icon: Linkedin,
        href: "https://www.linkedin.com/in/omxdev?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
        title: "Github",
        icon: Github,
        href: "https://github.com/OmXDev/"
    }
]

export const FooterSection = () => {
    return (
        <footer id="footer" className="relative z-10 overflow-x-clip">
            <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 
             bg-emerald-300/30 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10"></div>
            <div className="container  max-w-5xl mx-auto px-4">
                <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8">
                    <div className="text-slate-950">
                        &copy; 2025. All rights reserved.
                    </div>
                    <nav className="flex flex-col md:flex-row items-center justify-center gap-8">
                        {footerLinks.map((link) => (
                            <a
                                key={link.title}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative inline-flex items-center gap-1.5"
                            >
                                <link.icon className="size-4" />
                                <span className="font-semibold">{link.title}</span>
                                <ArrowUpRightIcon className="size-4" />
                            </a>
                        ))}
                    </nav>

                </div>
            </div>
        </footer>
    )
}