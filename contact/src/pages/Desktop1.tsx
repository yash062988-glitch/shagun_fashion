import { FunctionComponent, useState } from "react";
import { motion } from "framer-motion";
import Component1Icon from "../components/Component1Icon";
import InstagramCard from "../components/InstagramCard";
import LoopEmpowering from "../components/LoopEmpowering";
import CallModal from "../components/CallModal";
import AnimatedParagraph from "../components/AnimatedParagraph";
import styles from "./Desktop1.module.css";

export type Desktop1Type = {};

const Desktop1: FunctionComponent<Desktop1Type> = ({}) => {
  // Staggered background stripes variants
  const [isCallModalOpen, setCallModalOpen] = useState(false);
  const stripeVariants = {
    hidden: { y: "-100%" },

    visible: (custom: number) => ({
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 35,
        stiffness: 90,
        delay: custom * 0.04,
      },
    }),
  };


  // Cards row section stagger variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8,
      },
    },
  };

  // Staggered cards variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
  };

  // Card hover animation settings
  const cardHover = {
    y: -8,
    scale: 1.03,
    borderColor: "rgba(255, 255, 255, 0.4)",
    boxShadow: "0px 12px 30px rgba(0, 43, 185, 0.3)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  };

  // Button tap settings
  const btnTap = { scale: 0.95 };

  return (
    <div className={styles.desktop1}>
      <div className={styles.component1IconContainer}>
        <Component1Icon property1="Frame 13" />
      </div>

      {/* Background Columns / Stripes */}
      <div className={styles.stripeBackgroundContainer}>
        <motion.div custom={0} initial="hidden" animate="visible" variants={stripeVariants} className={styles.frameChild} />
        <motion.div custom={1} initial="hidden" animate="visible" variants={stripeVariants} className={styles.frameItem} />
        <motion.div custom={2} initial="hidden" animate="visible" variants={stripeVariants} className={styles.frameInner} />
        <motion.div custom={3} initial="hidden" animate="visible" variants={stripeVariants} className={styles.frameDiv} />
        <motion.div custom={4} initial="hidden" animate="visible" variants={stripeVariants} className={styles.frameChild2} />
        <motion.div custom={5} initial="hidden" animate="visible" variants={stripeVariants} className={styles.naviguerLaVilleSansFronti} />
        <motion.div custom={6} initial="hidden" animate="visible" variants={stripeVariants} className={styles.troisTapesSimplesVersLaut} />
        <motion.div custom={7} initial="hidden" animate="visible" variants={stripeVariants} className={styles.frameChild3} />
        <motion.div custom={8} initial="hidden" animate="visible" variants={stripeVariants} className={styles.frameChild4} />
        <motion.div custom={9} initial="hidden" animate="visible" variants={stripeVariants} className={styles.frameChild5} />
        <motion.div custom={10} initial="hidden" animate="visible" variants={stripeVariants} className={styles.frameChild6} />
        <motion.div custom={11} initial="hidden" animate="visible" variants={stripeVariants} className={styles.frameChild7} />
      </div>

      <main className={styles.headlineGroup}>
        {/* Decorative Hero Background Image */}
                {/* Decorative Hero Background Image Wrapper */}
        <div className={styles.backgroundWrapper}>
          <img
            src="/contact/design-references/background-call-image.png"
            alt=""
            className={`${styles.backgroundCallImage} ${styles.bgTransform}`}
          />
        </div>

          <div className={`${styles.heroSection} ${styles.heroShift}`}>
          <div className={styles.callCard}>
            <div className={styles.frameParent}>
              
              {/* Header Logo */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className={styles.limitentLeursSortiesParPeu}
              >
                <div>
                  <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none', color: 'inherit' }}>
                    <img src="/image-269@2x.png" alt="Logo" style={{ width: '50px', height: '70px', objectFit: 'cover' }} />
                    <h1 className={styles.shagunFashions}>SHAGUN FASHIONS</h1>
                  </a>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 226 }}
                  transition={{ duration: 0.8, ease: "easeInOut", delay: 0.7 }}
                  className={styles.personnesMalvoyantesDansLe}
                />
              </motion.div>

              {/* Home Button */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className={styles.homeButtonWrapper}
              >
                <a href="/" className={styles.homeButton}>
                  Home
                </a>
              </motion.div>

              

              {/* Over 10k customers Badge */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring" as const, damping: 20, stiffness: 100, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={btnTap}
                className={styles.frameGroup}
              >
                <img
                  className={styles.frameContainer}
                  alt=""
                  src="/contact/Group-39@2x.png"
                />
                <div className={styles.over10kCustomersWrapper}>
                  <div className={styles.over10kCustomers}>
                    OVER 10K CUSTOMERS
                  </div>
                </div>
              </motion.button>

              {/* Main Headline */}
              <div className={styles.letsBuildSomethingContainer}>
                <LoopEmpowering />
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                className={styles.wedLoveTo}
              >
                                <AnimatedParagraph />
              </motion.div>

              {/* Contact Cards Section */}
              <motion.section
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className={styles.frameSection}
              >
                {/* Location Card */}
                <motion.div
                  variants={cardVariants}
                  whileHover={cardHover}
                  className={styles.mergedAsset1Parent}
                >
                  <div className={styles.mergedAsset1}>
                    <div className={styles.premiumIconCircle}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                  </div>
                  <div className={styles.ourLocation}>Our Location</div>
                  <div className={styles.x2530RaghubharpuraGandhinag}>
                    <div className={styles.x2530RaghubharpuraGandhinag2}>
                      &nbsp;
                    </div>
                  </div>
                  <motion.button
                    whileTap={btnTap}
                    onClick={() => window.open("https://maps.app.goo.gl/VhW2eM9ncSimi2ES9", "_blank")}
                    className={styles.openLocationParent}
                  >
                    <div className={styles.openLocation}>{`Open Location `}</div>
                    <img
                      className={styles.vectorIcon}
                      alt=""
                      src="/contact/Vector.svg"
                    />
                  </motion.button>
                </motion.div>

                {/* Whatsapp Card */}
                <motion.div
                  variants={cardVariants}
                  whileHover={cardHover}
                  className={styles.mergedAsset2Parent}
                >
                  <div className={styles.mergedAsset2}>
                    <div className={styles.premiumIconCircle}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                      </svg>
                    </div>
                  </div>
                  <div className={styles.whatsapp}>Whatsapp</div>
                  <div className={styles.contactWithUsOnWhatsapp}>
                    <div className={styles.contactWithUs}>
                      Contact with us on whatsapp
                    </div>
                  </div>
                  <motion.button
                    whileTap={btnTap}
                    onClick={() => window.open("https://wa.me/9266379595", "_blank")}
                    className={styles.openLocationParent}
                  >
                    <div className={styles.openLocation}>Chat on Whatsapp</div>
                  </motion.button>
                </motion.div>

                {/* Call Us Card */}
                <motion.div
                  variants={cardVariants}
                  whileHover={cardHover}
                  className={styles.mergedAsset4Parent}
                >
                  <div className={styles.mergedAsset4}>
                    <div className={styles.premiumIconCircle}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                  </div>
                  <div className={styles.whatsapp}>Call Us</div>
                  <div className={styles.speakDirectlyWithUs91981}>
                    <div className={styles.speakDirectlyWithContainer}>
                      <span>
                        Talk directly with our team.
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileTap={btnTap}
                    onClick={() => setCallModalOpen(true)}
                    className={styles.openLocationParent}
                  >
                    <div className={styles.openLocation}>Call Now</div>
                    <img
                      className={styles.vectorIcon}
                      alt=""
                      src="/contact/Vector2.svg"
                    />
                  </motion.button>
                </motion.div>

                {/* Email Us Card */}
                <motion.div
                  variants={cardVariants}
                  whileHover={cardHover}
                  className={styles.mergedAsset5Parent}
                >
                  <div className={styles.mergedAsset5}>
                    <div className={styles.premiumIconCircle}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    </div>
                  </div>
                  <div className={styles.whatsapp}>Email Us</div>
                  <div className={styles.dropAnEMailWellReplySoo}>
                    <div className={styles.dropAnEMailContainer}>
                      <span>
                        Drop An E-mail
                        <br />
                        We'll reply soon
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileTap={btnTap}
                    onClick={() => window.location.href = "mailto:fashionshagun50@gmail.com"}
                    className={styles.openLocationParent}
                  >
                    <div className={styles.openLocation}>Send Email</div>
                    <img
                      className={styles.vectorIcon}
                      alt=""
                      src="/contact/Vector3.svg"
                    />
                  </motion.button>
                </motion.div>
                <InstagramCard />
              </motion.section>

              {/* Need Help Section */}
              <motion.header
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
                whileHover={{
                  borderColor: "rgba(255, 255, 255, 0.4)",
                  boxShadow: "0px 10px 35px rgba(0, 43, 185, 0.2)"
                }}
                className={`${styles.mergedAsset6Parent} ${styles.needHelpWide}`}
              >
                <div className={styles.mergedAsset6}>
                    <div className={`${styles.premiumIconCircle} ${styles.premiumIconCircleLarge}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                      </svg>
                    </div>
                </div>
                <div className={styles.frame649Column1}>
                  <div className={styles.whatsapp}>Need Help ?</div>
                  <div className={styles.ourTeamIs}>
                    Our team is always ready
                    <br />
                    to assist you with your queries
                  </div>
                </div>
                <div className={styles.lineWrapper}>
                  <div className={styles.lineDiv} />
                </div>
                <div className={styles.frame649Column3}>
                  <div className={styles.frame649Column32}>
                    <div className={styles.frame649Column33}>
                      <motion.button
                        whileTap={btnTap}
                        onClick={() => window.open("https://wa.me/9266379595", "_blank")}
                        className={styles.frame649Column3Inner}
                      >
                        <div className={styles.sendUsAMessageParent}>
                          <div
                            className={styles.sendUsA}
                          >{`Send us a Message `}</div>
                          <img
                            className={styles.vectorIcon}
                            alt=""
                            src="/contact/Vector4.svg"
                          />
                        </div>
                      </motion.button>
                      <div className={styles.weTypicallyReply}>
                        We typically reply within 
                        <br/>
                        a few minutes
                      </div>
                    </div>
                  </div>
                </div>
              </motion.header>
            </div>
          </div>
                <CallModal isOpen={isCallModalOpen} onClose={() => setCallModalOpen(false)} />
      </div>
      </main>
    </div>
  );
};

export default Desktop1;
