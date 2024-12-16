import { easeIn, easeInOut, easeOut } from "motion";
import { color, motion } from "motion/react"
import team1 from '../../assets/team/team1.jpg'
import team2 from '../../assets/team/team2.jpg'

const Banner = () => {
    return (
        <div className="hero bg-base-200 min-h-[70vh] ">
            <div className="hero-content w-[98%] mx-auto flex-col lg:flex-row-reverse">
                {/* motion images  */}
                <div className="flex-1">
                    <motion.img
                        src={team1}
                        animate={{
                            y: [0, "-20%", 0],

                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 7,
                            ease: easeInOut,
                        }}
                        className="max-w-sm w-72 rounded-t-[42px] rounded-br-[48px] border-b-8 border-l-8 border-blue-400  rounded-lg shadow-2xl" />
                    <motion.img
                        src={team2}
                        animate={{
                            x: [150, 400, 150],

                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 7,
                            delay:0,
                            ease: easeInOut,
                        }}
                        className="max-w-sm w-72 rounded-t-[42px] rounded-br-[48px] border-b-8 border-l-8 border-blue-400  rounded-lg shadow-2xl" />



                </div>

                {/* text contents with title  */}
                <div className="flex-1">
                    <motion.h1
                        animate={{
                            x: 50,
                            transition: {
                                duration: 2, // Slow and smooth
                                repeat: Infinity,
                                repeatType: "mirror",
                                delay: 0,
                                ease: "easeInOut",
                            },
                        }}
                        className="text-5xl font-bold"
                    >


                        Your <motion.span
                            animate={

                                {
                                    color: [
                                        "#ceff33",
                                        "#33d1ff",
                                        "#9033ff",
                                    ]
                                }
                            }
                            transition={
                                {
                                    repeat: Infinity,
                                    duration: 5,
                                    ease: easeIn,
                                }
                            }
                        >
                            Jobs
                        </motion.span> Are Here!



                    </motion.h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;