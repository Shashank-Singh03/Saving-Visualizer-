import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './ExpectedImpactSection.css';

interface ExpectedImpactSectionProps {
    id?: string;
}

export function ExpectedImpactSection({ id }: ExpectedImpactSectionProps) {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

    return (
        <motion.section
            id={id}
            ref={ref}
            className="expected-impact-section"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Expected impact analysis"
        >
            <div className="section-header">
                <h2 className="section-title">Behavioral Mechanics</h2>
                <p className="section-subtitle">
                    Testable hypotheses on user engagement and conversion
                </p>
            </div>

            <div className="hypotheses-grid">
                <div className="hypothesis-card">
                    <div className="hypothesis-content">
                        <h3>Value Clarity</h3>
                        <div className="hypothesis-body">
                            <p className="mechanism">
                                <strong>Mechanism:</strong> Real-time, personalized projections make long-term outcomes immediately comprehensible.
                            </p>
                            <p className="impact">
                                <strong>Expected outcome:</strong> 40-60% reduction in cognitive load vs static explanations.
                            </p>
                            <p className="rationale">
                                Concrete numbers are processed faster than abstract concepts.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="hypothesis-card">
                    <div className="hypothesis-content">
                        <h3>Decision Confidence</h3>
                        <div className="hypothesis-body">
                            <p className="mechanism">
                                <strong>Mechanism:</strong> Personalized projections reduce uncertainty before commitment.
                            </p>
                            <p className="impact">
                                <strong>Expected outcome:</strong> 25-35% increase in CTA engagement.
                            </p>
                            <p className="rationale">
                                Interactive exploration builds intent to act.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="hypothesis-card">
                    <div className="hypothesis-content">
                        <h3>Opportunity Cost Awareness</h3>
                        <div className="hypothesis-body">
                            <p className="mechanism">
                                <strong>Mechanism:</strong> Inflation-adjusted comparison clarifies real value preservation.
                            </p>
                            <p className="impact">
                                <strong>Expected outcome:</strong> 30-45% bounce rate reduction.
                            </p>
                            <p className="rationale">
                                Loss aversion motivates more effectively than potential gains.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="measurement-section">
                <h3>Measurement Approach</h3>
                <ul className="metrics-list">
                    <li><strong>Time-to-first-interaction:</strong> Median time from page load to first slider adjustment</li>
                    <li><strong>CTA engagement:</strong> Conversion from widget interaction to signup initiation</li>
                    <li><strong>Scroll depth:</strong> Engagement depth as proxy for intent</li>
                    <li><strong>A/B cohort comparison:</strong> Control (static hero) vs Treatment (interactive widget)</li>
                </ul>
            </div>

            <div className="impact-note">
                <p>
                    These hypotheses are testable predictions, not guarantees. Real-world performance
                    depends on user segment, page context, and overall product-market fit.
                </p>
            </div>
        </motion.section>
    );
}
