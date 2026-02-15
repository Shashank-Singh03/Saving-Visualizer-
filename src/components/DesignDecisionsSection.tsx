import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './DesignDecisionsSection.css';

interface DesignDecisionsSectionProps {
    id?: string;
}

export function DesignDecisionsSection({ id }: DesignDecisionsSectionProps) {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

    const decisions = [
        {
            title: "Translating abstract numbers into tangible value",
            explanation: "Rather than annual percentage rates or financial jargon, we show daily actions (₹100/day) as concrete outcomes (₹4.5L in 3 years). This bridges present behavior and future reward."
        },
        {
            title: "Showing opportunity cost alongside returns",
            explanation: "The 'Opportunity Cost' metric leverages loss aversion. By visualizing what users lose to inflation by not investing, we create urgency without fear-mongering."
        },
        {
            title: "Mobile-first decision clarity",
            explanation: "Sticky CTA on mobile, large touch targets, and progressive disclosure ensure the experience works where users take action. Calculator adapts to thumb-zone ergonomics."
        },
        {
            title: "Transparent, adjustable calculations",
            explanation: "Every assumption (inflation rate, market returns) is visible and explainable. Real-time interactivity builds credibility through transparency, not obscurity."
        },
        {
            title: "Conversion widget, not full application",
            explanation: "Scoped to a single use case: converting landing page visitors into signup intent. No feature creep. This constraint forces focus on activation rate."
        }
    ];

    return (
        <motion.section
            id={id}
            ref={ref}
            className="design-decisions-section"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            aria-label="Design decisions and rationale"
        >
            <div className="section-header">
                <h2>Design Rationale</h2>
                <p className="section-subtitle">
                    Engineering reflections on key product choices
                </p>
            </div>

            <div className="decisions-container">
                {decisions.map((decision, index) => (
                    <div key={index} className="decision-item">
                        <h3 className="decision-title">{decision.title}</h3>
                        <p className="decision-explanation">{decision.explanation}</p>
                    </div>
                ))}
            </div>

            <div className="decisions-note">
                <p>
                    These decisions prioritize behavioral impact over visual novelty. Every element
                    serves the goal of reducing friction between curiosity and commitment.
                </p>
            </div>
        </motion.section>
    );
}
