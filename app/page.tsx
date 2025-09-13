"use client";

import { motion } from "framer-motion";
import Hero from "@/components/home/hero";
import QuickStats from "@/components/home/quick-stats";
import WhyChooseUs from "@/components/home/why-choose-us";
import AcademicHighlights from "@/components/home/academic-highlights";
import FacilitiesOverview from "@/components/home/facilities-overview";
import LatestNotices from "@/components/home/latest-notices";
import UpcomingEvents from "@/components/home/upcoming-events";
import NewsUpdates from "@/components/home/news-updates";
import SEEResults from "@/components/home/see-results";
import PhotoGallery from "@/components/home/photo-gallery";
import PopupImage from "@/components/PopupImage";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function HomePage() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <PopupImage />
      <motion.div variants={sectionVariants}>
        <Hero />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <QuickStats />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <WhyChooseUs />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <LatestNotices />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <AcademicHighlights />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <FacilitiesOverview />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <UpcomingEvents />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <PhotoGallery />
      </motion.div>
    </motion.div>
  );
}
