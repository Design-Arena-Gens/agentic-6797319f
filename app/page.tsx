'use client';

import { useState } from 'react';

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Self-Love-Journal-for-Women-KDP-Blueprint.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container">
      <div className="book-cover">
        <div className="book-cover-content">
          <div className="decorative-hearts">✨ 💖 ✨</div>
          <h1>Self-Love Journal<br/>for Women</h1>
          <div className="subtitle">
            30 Days of Daily Affirmations, Guided Prompts,<br/>
            and Self-Care Exercises to Build Confidence<br/>
            and Inner Strength
          </div>
          <div className="tagline">
            "Your journey to self-discovery and unconditional self-love begins here"
          </div>
          <div className="decorative-hearts">💝 🌸 💝</div>
        </div>
      </div>

      <div className="button-container">
        <button
          className="download-btn"
          onClick={generatePDF}
          disabled={isGenerating}
        >
          <span>📥</span>
          {isGenerating ? 'Generating PDF...' : 'Download Complete KDP Blueprint PDF'}
        </button>
      </div>

      <div className="section">
        <h2>📘 Complete KDP Blueprint Overview</h2>
        <p>
          This comprehensive blueprint provides everything you need to publish a successful Self-Love Journal for Women on Amazon KDP.
          The journal is designed for women aged 18-45 interested in self-improvement, confidence building, and mindfulness practices.
        </p>
        <div className="quote-box">
          "Self-love is not selfish; you cannot truly love another until you know how to love yourself." - Unknown
        </div>
      </div>

      <div className="section">
        <h2>🎯 Title & Subtitle Strategy</h2>
        <h3>Main Title</h3>
        <p><strong>Self-Love Journal for Women</strong></p>

        <h3>Recommended Full Title for Amazon KDP</h3>
        <div className="card">
          <p><strong>Self-Love Journal for Women: 30 Days of Daily Affirmations, Guided Prompts, and Self-Care Exercises to Build Confidence and Inner Strength</strong></p>
        </div>

        <h3>Alternative Subtitle Options</h3>
        <ul>
          <li>30 Days of Daily Affirmations, Gratitude, and Confidence Boosting Exercises</li>
          <li>Guided Journal for Self-Care, Mindset Shifts, and Inner Strength</li>
          <li>Daily Prompts to Build Confidence, Self-Worth, and Positive Habits</li>
          <li>Transform Your Life with Daily Practices for Self-Love and Empowerment</li>
        </ul>

        <h3>Keywords to Include (for Amazon Backend)</h3>
        <p>self love journal, journal for women, confidence journal, self care journal, affirmation journal, gratitude journal, mindfulness journal, self improvement, positive affirmations, daily journal prompts, mental wellness, empowerment journal, inner strength</p>
      </div>

      <div className="section">
        <h2>👥 Target Audience</h2>
        <div className="grid">
          <div className="card">
            <h4>Demographics</h4>
            <ul>
              <li>Women aged 18-45</li>
              <li>United States, UK, Canada, Australia</li>
              <li>College students to working professionals</li>
              <li>Stay-at-home moms to entrepreneurs</li>
            </ul>
          </div>
          <div className="card">
            <h4>Interests & Pain Points</h4>
            <ul>
              <li>Self-improvement and personal growth</li>
              <li>Struggling with low self-esteem</li>
              <li>Overcoming negative self-talk</li>
              <li>Building confidence and self-worth</li>
            </ul>
          </div>
          <div className="card">
            <h4>Motivations</h4>
            <ul>
              <li>Want structured journaling guidance</li>
              <li>Seeking daily motivation and inspiration</li>
              <li>Looking for self-care practices</li>
              <li>Desire positive mindset transformation</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>📖 Journal Structure (120 Pages)</h2>

        <h3>Section 1: Introduction (Pages 1-6)</h3>
        <div className="prompt-example">
          <p><strong>Welcome Message</strong></p>
          <p>"Welcome to your Self-Love Journey! This journal is your sacred space for 30 days of intentional self-care, reflection, and growth. Each page is designed to help you reconnect with yourself, build unshakeable confidence, and cultivate deep self-love. Remember: you are worthy of love, especially from yourself."</p>
        </div>
        <ul>
          <li><strong>How to Use This Journal</strong> - Daily practice guidelines</li>
          <li><strong>The Power of Self-Love</strong> - Why it matters</li>
          <li><strong>Setting Your Intentions</strong> - Goal-setting exercise</li>
          <li><strong>Self-Love Commitment Contract</strong> - Personal pledge</li>
        </ul>

        <h3>Section 2: 30-Day Guided Journal Prompts (Pages 7-96)</h3>
        <p>Each day includes 3 pages with structured prompts:</p>

        <h4>Daily Page Format (3 pages per day)</h4>

        <div className="affirmation">
          <p><strong>Page 1 - Daily Affirmation & Morning Reflection</strong></p>
          <ul>
            <li>Today's Affirmation (bold, inspiring statement)</li>
            <li>"I am..." prompt (3 positive self-statements)</li>
            <li>Today I will show myself love by...</li>
            <li>Gratitude: 3 things I'm grateful for today</li>
          </ul>
        </div>

        <div className="affirmation">
          <p><strong>Page 2 - Deep Reflection Prompt</strong></p>
          <p>Themed questions that rotate through topics:</p>
          <ul>
            <li>Self-worth & boundaries</li>
            <li>Body positivity & acceptance</li>
            <li>Forgiveness & letting go</li>
            <li>Dreams & aspirations</li>
            <li>Relationships & self-respect</li>
          </ul>
        </div>

        <div className="affirmation">
          <p><strong>Page 3 - Evening Reflection & Self-Care Check</strong></p>
          <ul>
            <li>How did I honor myself today?</li>
            <li>What challenged me? How did I respond?</li>
            <li>Self-care activities completed (checkboxes)</li>
            <li>Tomorrow I will...</li>
          </ul>
        </div>

        <h3>Section 3: Bonus Content (Pages 97-120)</h3>
        <ul>
          <li><strong>100 Affirmations for Self-Love</strong> (4 pages) - Quick reference list</li>
          <li><strong>Self-Care Ideas Checklist</strong> (3 pages) - 50+ activities</li>
          <li><strong>Monthly Reflection Pages</strong> (6 pages) - Track progress over time</li>
          <li><strong>Building Your Self-Love Toolkit</strong> (4 pages) - Resources & practices</li>
          <li><strong>Letter to Your Future Self</strong> (3 pages) - Closing exercise</li>
        </ul>
      </div>

      <div className="section">
        <h2>💭 Sample Daily Prompts (30 Days)</h2>

        <div className="grid">
          <div className="card">
            <h4>Day 1: Beginning Your Journey</h4>
            <p className="prompt-example">What does self-love mean to you? How would your life change if you loved yourself unconditionally?</p>
          </div>
          <div className="card">
            <h4>Day 7: Embracing Imperfection</h4>
            <p className="prompt-example">What "flaws" are you ready to accept about yourself? How can these make you uniquely beautiful?</p>
          </div>
          <div className="card">
            <h4>Day 14: Setting Boundaries</h4>
            <p className="prompt-example">Where in your life do you need stronger boundaries? What would you say if you weren't afraid?</p>
          </div>
          <div className="card">
            <h4>Day 21: Celebrating You</h4>
            <p className="prompt-example">List 10 things you love about yourself. Write a love letter to yourself celebrating your strength.</p>
          </div>
          <div className="card">
            <h4>Day 30: Your Transformation</h4>
            <p className="prompt-example">How have you grown in 30 days? What self-love practices will you continue? Who are you becoming?</p>
          </div>
        </div>

        <h3>Daily Affirmation Examples</h3>
        <div className="affirmation">Day 1: "I am worthy of love, respect, and kindness—especially from myself."</div>
        <div className="affirmation">Day 5: "I release the need for perfection and embrace my authentic self."</div>
        <div className="affirmation">Day 10: "My voice matters. My feelings are valid. I honor my truth."</div>
        <div className="affirmation">Day 15: "I am enough, exactly as I am in this moment."</div>
        <div className="affirmation">Day 20: "I choose to see myself through eyes of compassion and love."</div>
        <div className="affirmation">Day 25: "I am the author of my story, and I choose a narrative of love."</div>
        <div className="affirmation">Day 30: "I am transformed. I am powerful. I am loved. I am free."</div>
      </div>

      <div className="section">
        <h2>🎨 Book Cover Design Specifications</h2>

        <h3>Cover Design Elements</h3>
        <div className="card">
          <h4>Color Palette</h4>
          <ul>
            <li>Primary: Soft pink (#FF9ED8) to rose gold gradient</li>
            <li>Secondary: Warm peach (#FFB4A2)</li>
            <li>Accent: Gold foil effect (#D4AF37)</li>
            <li>Text: White and deep burgundy (#800020)</li>
          </ul>
        </div>

        <div className="card">
          <h4>Cover Layout</h4>
          <ul>
            <li><strong>Top 1/3:</strong> "Self-Love Journal" in elegant serif font (48-60pt)</li>
            <li><strong>Middle:</strong> Decorative floral/botanical illustration (lotus, roses, or leaves)</li>
            <li><strong>Center Element:</strong> Heart symbol or mandala design</li>
            <li><strong>Bottom 1/3:</strong> "for Women" and subtitle in clean sans-serif</li>
            <li><strong>Corner Elements:</strong> Small decorative flourishes or sparkles</li>
          </ul>
        </div>

        <h3>Design Style Guidelines</h3>
        <ul>
          <li><strong>Aesthetic:</strong> Feminine, elegant, inspiring, warm</li>
          <li><strong>Mood:</strong> Empowering yet calming, luxurious yet accessible</li>
          <li><strong>Typography:</strong> Mix of elegant serif (titles) and modern sans-serif (body)</li>
          <li><strong>Imagery:</strong> Abstract florals, watercolor effects, geometric patterns</li>
          <li><strong>Avoid:</strong> Overly busy designs, harsh colors, childish graphics</li>
        </ul>

        <h3>KDP Cover Dimensions</h3>
        <ul>
          <li><strong>Trim Size:</strong> 6" x 9" (standard journal size)</li>
          <li><strong>Page Count:</strong> 120 pages</li>
          <li><strong>Paper:</strong> White interior, matte or glossy cover</li>
          <li><strong>Spine Width:</strong> ~0.27" (for 120 pages, 60# paper)</li>
          <li><strong>Full Cover Dimensions:</strong> 12.275" x 9.25" (including bleed)</li>
        </ul>
      </div>

      <div className="section">
        <h2>💰 Pricing & Marketing Strategy</h2>

        <div className="grid">
          <div className="card">
            <h4>Recommended Pricing</h4>
            <ul>
              <li><strong>Print:</strong> $9.99 - $12.99</li>
              <li><strong>eBook:</strong> $2.99 - $4.99</li>
              <li><strong>KDP Select:</strong> Recommended for initial launch</li>
            </ul>
          </div>
          <div className="card">
            <h4>Categories (Choose 2)</h4>
            <ul>
              <li>Self-Help &gt; Personal Transformation</li>
              <li>Self-Help &gt; Self-Esteem</li>
              <li>Self-Help &gt; Journal Writing</li>
              <li>Health &amp; Wellness &gt; Mental Health</li>
            </ul>
          </div>
        </div>

        <h3>Marketing Keywords for Amazon Backend</h3>
        <p>self love journal for women, confidence building journal, self care planner, affirmation journal, guided journal for women, self improvement journal, gratitude journal women, empowerment journal, mindfulness journal, daily journal prompts</p>

        <h3>Book Description Template</h3>
        <div className="prompt-example">
          <p><strong>Headline:</strong> Transform Your Life with 30 Days of Intentional Self-Love</p>
          <p><strong>Hook:</strong> Do you struggle with negative self-talk? Feel like you're not enough? It's time to rewrite your story.</p>
          <p><strong>Benefits:</strong></p>
          <ul>
            <li>✨ Build unshakeable confidence through daily affirmations</li>
            <li>💖 Develop a deeper relationship with yourself</li>
            <li>🌸 Release perfectionism and embrace your authentic beauty</li>
            <li>✍️ Transform your mindset with guided prompts</li>
            <li>🌟 Create lasting self-care habits</li>
          </ul>
          <p><strong>What's Inside:</strong></p>
          <ul>
            <li>30 days of structured journal prompts</li>
            <li>Daily affirmations to reprogram your mindset</li>
            <li>Reflection exercises for deep transformation</li>
            <li>100+ bonus affirmations</li>
            <li>Self-care activity checklists</li>
          </ul>
          <p><strong>Call to Action:</strong> Your journey to unconditional self-love starts now. Scroll up and click "Buy Now" to begin your transformation today!</p>
        </div>
      </div>

      <div className="section">
        <h2>📝 Interior Formatting Guidelines</h2>

        <h3>Page Layout Specifications</h3>
        <ul>
          <li><strong>Page Size:</strong> 6" x 9"</li>
          <li><strong>Margins:</strong> Inside 0.75", Outside 0.5", Top/Bottom 0.625"</li>
          <li><strong>Font - Headings:</strong> Playfair Display or Cormorant Garamond, 16-20pt</li>
          <li><strong>Font - Body/Prompts:</strong> Open Sans or Lato, 11-12pt</li>
          <li><strong>Line Spacing:</strong> 1.5 for prompts, double spacing for writing areas</li>
          <li><strong>Color:</strong> Black text, occasional accent colors (light pink borders)</li>
        </ul>

        <h3>Page Elements</h3>
        <ul>
          <li><strong>Headers:</strong> "Day X" with small decorative element</li>
          <li><strong>Daily Affirmation:</strong> Centered, in decorative box/border</li>
          <li><strong>Prompt Questions:</strong> Bold, with ample writing space below</li>
          <li><strong>Writing Lines:</strong> Light gray, evenly spaced</li>
          <li><strong>Checkboxes:</strong> For self-care tracking</li>
          <li><strong>Page Numbers:</strong> Bottom center, small decorative font</li>
        </ul>
      </div>

      <div className="section">
        <h2>🚀 Launch Strategy</h2>

        <h3>Pre-Launch Checklist</h3>
        <ul>
          <li>✅ Complete manuscript formatted to KDP specifications</li>
          <li>✅ Professional cover design created (or use Canva templates)</li>
          <li>✅ Proofread all content for typos and consistency</li>
          <li>✅ Research competitor pricing ($8-15 range)</li>
          <li>✅ Prepare 7 backend keywords</li>
          <li>✅ Write compelling book description with bullet points</li>
          <li>✅ Order author copy to check print quality</li>
        </ul>

        <h3>Launch Week Actions</h3>
        <ul>
          <li>📢 Share on social media with "just launched" announcement</li>
          <li>💝 Offer limited-time discount or free promo days (if using KDP Select)</li>
          <li>📧 Email friends/family for honest reviews</li>
          <li>🎯 Run Amazon ads targeting relevant keywords</li>
          <li>📱 Post in relevant Facebook groups (self-care, journaling communities)</li>
          <li>✨ Create Pinterest pins with journal pages/quotes</li>
        </ul>

        <h3>Long-Term Growth</h3>
        <ul>
          <li>Build an email list offering free journal pages as lead magnet</li>
          <li>Create companion products (30-day challenge, workbooks)</li>
          <li>Develop series (Self-Love Journal Vol 2, Gratitude Journal, etc.)</li>
          <li>Use social proof from reviews in marketing materials</li>
          <li>Consider expanding to Etsy (printable versions)</li>
        </ul>
      </div>

      <div className="section">
        <h2>🎁 Bonus: 50 More Affirmations</h2>
        <div className="grid">
          <div className="affirmation">I radiate confidence and grace.</div>
          <div className="affirmation">I trust myself to make good decisions.</div>
          <div className="affirmation">My happiness is my responsibility and my choice.</div>
          <div className="affirmation">I deserve rest, peace, and joy.</div>
          <div className="affirmation">I am beautiful inside and out.</div>
          <div className="affirmation">I release comparison and embrace my unique journey.</div>
          <div className="affirmation">I am proud of how far I've come.</div>
          <div className="affirmation">My needs and desires are important.</div>
          <div className="affirmation">I speak to myself with kindness and compassion.</div>
          <div className="affirmation">I am worthy of all the good things life offers.</div>
          <div className="affirmation">I forgive myself for past mistakes.</div>
          <div className="affirmation">I am strong, resilient, and capable.</div>
          <div className="affirmation">I choose to focus on what I can control.</div>
          <div className="affirmation">I am the creator of my reality.</div>
          <div className="affirmation">I trust the timing of my life.</div>
        </div>
      </div>

      <div className="section">
        <h2>✨ Final Tips for KDP Success</h2>
        <div className="quote-box">
          "The most powerful relationship you will ever have is the relationship with yourself." - Steve Maraboli
        </div>

        <ul>
          <li><strong>Quality First:</strong> Invest in professional cover design and thorough proofreading</li>
          <li><strong>Reviews Matter:</strong> Encourage early readers to leave honest reviews</li>
          <li><strong>Keywords:</strong> Research bestselling journals and analyze their keyword strategies</li>
          <li><strong>Series Potential:</strong> Consider this as Book 1 in a self-love series</li>
          <li><strong>Stay Consistent:</strong> Regular marketing efforts compound over time</li>
          <li><strong>Track Data:</strong> Monitor your KDP dashboard to see what's working</li>
          <li><strong>Iterate:</strong> Use feedback to improve future editions or new books</li>
          <li><strong>Build Brand:</strong> Create an author platform around self-care/empowerment niche</li>
        </ul>
      </div>

      <div className="section">
        <h2>📋 Complete Manuscript Outline</h2>
        <h3>Full 120-Page Structure</h3>

        <p><strong>Pages 1-2:</strong> Title Page & Copyright</p>
        <p><strong>Pages 3-4:</strong> Welcome Message & How to Use This Journal</p>
        <p><strong>Pages 5-6:</strong> Setting Intentions & Self-Love Commitment</p>
        <p><strong>Pages 7-96:</strong> 30 Days of Guided Prompts (3 pages per day)</p>
        <ul>
          <li>Day 1-10: Foundation (Self-awareness, acceptance, gratitude)</li>
          <li>Day 11-20: Growth (Boundaries, forgiveness, body positivity)</li>
          <li>Day 21-30: Transformation (Confidence, dreams, celebration)</li>
        </ul>
        <p><strong>Pages 97-100:</strong> 100 Affirmations for Self-Love</p>
        <p><strong>Pages 101-103:</strong> Self-Care Ideas Checklist</p>
        <p><strong>Pages 104-109:</strong> Monthly Reflection Pages</p>
        <p><strong>Pages 110-113:</strong> Building Your Self-Love Toolkit</p>
        <p><strong>Pages 114-116:</strong> Letter to Your Future Self</p>
        <p><strong>Pages 117-120:</strong> Closing Message & Resources</p>
      </div>

      <div className="button-container">
        <button
          className="download-btn"
          onClick={generatePDF}
          disabled={isGenerating}
        >
          <span>📥</span>
          {isGenerating ? 'Generating PDF...' : 'Download Complete KDP Blueprint PDF'}
        </button>
        <p style={{ marginTop: '20px', color: '#666', fontSize: '0.95em' }}>
          Ready to publish? This blueprint gives you everything you need!
        </p>
      </div>

      <div style={{ textAlign: 'center', padding: '40px 0', color: '#ff6eb4', fontSize: '1.1em' }}>
        <p><strong>💖 You have everything you need to create a bestselling Self-Love Journal! 💖</strong></p>
        <p style={{ marginTop: '10px', color: '#888' }}>Good luck with your KDP journey!</p>
      </div>
    </div>
  );
}
