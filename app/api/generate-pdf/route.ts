import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    let yPosition = margin;

    // Helper function to add new page if needed
    const checkPageBreak = (requiredSpace: number = 10) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };

    // Helper function to add text with word wrap
    const addText = (text: string, fontSize: number, isBold: boolean = false, color: [number, number, number] = [0, 0, 0], align: 'left' | 'center' = 'left') => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      doc.setTextColor(color[0], color[1], color[2]);

      const lines = doc.splitTextToSize(text, maxWidth);
      checkPageBreak(lines.length * fontSize * 0.5);

      if (align === 'center') {
        lines.forEach((line: string) => {
          doc.text(line, pageWidth / 2, yPosition, { align: 'center' });
          yPosition += fontSize * 0.5;
        });
      } else {
        doc.text(lines, margin, yPosition);
        yPosition += lines.length * fontSize * 0.5;
      }
      yPosition += 3;
    };

    const addHeading = (text: string, level: number = 1) => {
      checkPageBreak(15);
      const sizes = [24, 18, 14, 12];
      const colors: { [key: number]: [number, number, number] } = {
        1: [255, 77, 166],
        2: [255, 110, 180],
        3: [255, 77, 166],
        4: [255, 110, 180]
      };
      yPosition += 5;
      addText(text, sizes[level - 1] || 14, true, colors[level] || [255, 77, 166]);
      yPosition += 2;
    };

    const addBullet = (text: string) => {
      checkPageBreak(8);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      const lines = doc.splitTextToSize(text, maxWidth - 5);
      doc.text('•', margin, yPosition);
      doc.text(lines, margin + 5, yPosition);
      yPosition += lines.length * 5.5 + 2;
    };

    const addBox = (text: string, bgColor: [number, number, number] = [255, 235, 245]) => {
      checkPageBreak(20);
      doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
      const lines = doc.splitTextToSize(text, maxWidth - 10);
      const boxHeight = lines.length * 5 + 10;
      doc.rect(margin, yPosition, maxWidth, boxHeight, 'F');
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      yPosition += 7;
      doc.text(lines, margin + 5, yPosition);
      yPosition += lines.length * 5 + 8;
    };

    // COVER PAGE
    doc.setFillColor(255, 158, 216);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    yPosition = 60;
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(36);
    doc.setFont('helvetica', 'bold');
    doc.text('Self-Love Journal', pageWidth / 2, yPosition, { align: 'center' });

    yPosition += 15;
    doc.setFontSize(28);
    doc.text('for Women', pageWidth / 2, yPosition, { align: 'center' });

    yPosition += 25;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    const subtitle = doc.splitTextToSize('30 Days of Daily Affirmations, Guided Prompts, and Self-Care Exercises to Build Confidence and Inner Strength', maxWidth - 20);
    doc.text(subtitle, pageWidth / 2, yPosition, { align: 'center' });

    yPosition += 35;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.text('"Your journey to self-discovery and unconditional', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 7;
    doc.text('self-love begins here"', pageWidth / 2, yPosition, { align: 'center' });

    // TABLE OF CONTENTS
    doc.addPage();
    yPosition = margin;
    doc.setTextColor(0, 0, 0);

    addHeading('Complete KDP Blueprint for Self-Love Journal', 1);
    addText('This comprehensive guide provides everything you need to publish a successful Self-Love Journal for Women on Amazon KDP.', 11);

    // SECTION 1: TITLE & SUBTITLE
    addHeading('1. Title & Subtitle Strategy', 1);

    addHeading('Main Title', 3);
    addText('Self-Love Journal for Women', 12, true);

    addHeading('Recommended Full Title for Amazon KDP', 3);
    addBox('Self-Love Journal for Women: 30 Days of Daily Affirmations, Guided Prompts, and Self-Care Exercises to Build Confidence and Inner Strength');

    addHeading('Alternative Subtitle Options', 3);
    addBullet('30 Days of Daily Affirmations, Gratitude, and Confidence Boosting Exercises');
    addBullet('Guided Journal for Self-Care, Mindset Shifts, and Inner Strength');
    addBullet('Daily Prompts to Build Confidence, Self-Worth, and Positive Habits');
    addBullet('Transform Your Life with Daily Practices for Self-Love and Empowerment');

    addHeading('Keywords for Amazon Backend', 3);
    addText('self love journal, journal for women, confidence journal, self care journal, affirmation journal, gratitude journal, mindfulness journal, self improvement, positive affirmations, daily journal prompts, mental wellness, empowerment journal, inner strength', 10);

    // SECTION 2: TARGET AUDIENCE
    addHeading('2. Target Audience', 1);

    addHeading('Demographics', 3);
    addBullet('Women aged 18-45');
    addBullet('Primary markets: United States, UK, Canada, Australia');
    addBullet('Range from college students to working professionals');
    addBullet('Stay-at-home moms to entrepreneurs');

    addHeading('Interests & Pain Points', 3);
    addBullet('Self-improvement and personal growth enthusiasts');
    addBullet('Struggling with low self-esteem or confidence');
    addBullet('Dealing with negative self-talk');
    addBullet('Seeking to build self-worth and inner strength');
    addBullet('Recovering from toxic relationships or experiences');

    addHeading('Motivations', 3);
    addBullet('Want structured journaling guidance');
    addBullet('Seeking daily motivation and inspiration');
    addBullet('Looking for practical self-care practices');
    addBullet('Desire positive mindset transformation');
    addBullet('Want to develop sustainable self-love habits');

    // SECTION 3: JOURNAL STRUCTURE
    doc.addPage();
    yPosition = margin;

    addHeading('3. Journal Structure (120 Pages)', 1);

    addHeading('Section 1: Introduction (Pages 1-6)', 2);
    addBox('Welcome Message: "Welcome to your Self-Love Journey! This journal is your sacred space for 30 days of intentional self-care, reflection, and growth. Each page is designed to help you reconnect with yourself, build unshakeable confidence, and cultivate deep self-love. Remember: you are worthy of love, especially from yourself."');

    addBullet('How to Use This Journal - Daily practice guidelines');
    addBullet('The Power of Self-Love - Why it matters');
    addBullet('Setting Your Intentions - Goal-setting exercise');
    addBullet('Self-Love Commitment Contract - Personal pledge');

    addHeading('Section 2: 30-Day Guided Journal (Pages 7-96)', 2);
    addText('Each day includes 3 pages with structured prompts:', 11, true);

    addHeading('Daily Page Format', 3);

    addText('Page 1 - Daily Affirmation & Morning Reflection', 11, true);
    addBullet('Today\'s Affirmation (bold, inspiring statement)');
    addBullet('"I am..." prompt (3 positive self-statements)');
    addBullet('Today I will show myself love by...');
    addBullet('Gratitude: 3 things I\'m grateful for today');

    addText('Page 2 - Deep Reflection Prompt', 11, true);
    addText('Themed questions rotating through:', 11);
    addBullet('Self-worth & boundaries');
    addBullet('Body positivity & acceptance');
    addBullet('Forgiveness & letting go');
    addBullet('Dreams & aspirations');
    addBullet('Relationships & self-respect');

    addText('Page 3 - Evening Reflection & Self-Care Check', 11, true);
    addBullet('How did I honor myself today?');
    addBullet('What challenged me? How did I respond?');
    addBullet('Self-care activities completed (checkboxes)');
    addBullet('Tomorrow I will...');

    doc.addPage();
    yPosition = margin;

    addHeading('Section 3: Bonus Content (Pages 97-120)', 2);
    addBullet('100 Affirmations for Self-Love (4 pages) - Quick reference list');
    addBullet('Self-Care Ideas Checklist (3 pages) - 50+ activities');
    addBullet('Monthly Reflection Pages (6 pages) - Track progress over time');
    addBullet('Building Your Self-Love Toolkit (4 pages) - Resources & practices');
    addBullet('Letter to Your Future Self (3 pages) - Closing exercise');

    // SECTION 4: SAMPLE PROMPTS
    addHeading('4. Sample Daily Prompts', 1);

    addHeading('Day 1: Beginning Your Journey', 3);
    addBox('What does self-love mean to you? How would your life change if you loved yourself unconditionally?');

    addHeading('Day 7: Embracing Imperfection', 3);
    addBox('What "flaws" are you ready to accept about yourself? How can these make you uniquely beautiful?');

    addHeading('Day 14: Setting Boundaries', 3);
    addBox('Where in your life do you need stronger boundaries? What would you say if you weren\'t afraid?');

    addHeading('Day 21: Celebrating You', 3);
    addBox('List 10 things you love about yourself. Write a love letter to yourself celebrating your strength.');

    addHeading('Day 30: Your Transformation', 3);
    addBox('How have you grown in 30 days? What self-love practices will you continue? Who are you becoming?');

    doc.addPage();
    yPosition = margin;

    addHeading('Daily Affirmation Examples', 2);
    addBox('Day 1: "I am worthy of love, respect, and kindness—especially from myself."');
    addBox('Day 5: "I release the need for perfection and embrace my authentic self."');
    addBox('Day 10: "My voice matters. My feelings are valid. I honor my truth."');
    addBox('Day 15: "I am enough, exactly as I am in this moment."');
    addBox('Day 20: "I choose to see myself through eyes of compassion and love."');
    addBox('Day 25: "I am the author of my story, and I choose a narrative of love."');
    addBox('Day 30: "I am transformed. I am powerful. I am loved. I am free."');

    // SECTION 5: BOOK COVER DESIGN
    doc.addPage();
    yPosition = margin;

    addHeading('5. Book Cover Design Specifications', 1);

    addHeading('Cover Design Elements', 2);

    addHeading('Color Palette', 3);
    addBullet('Primary: Soft pink (#FF9ED8) to rose gold gradient');
    addBullet('Secondary: Warm peach (#FFB4A2)');
    addBullet('Accent: Gold foil effect (#D4AF37)');
    addBullet('Text: White and deep burgundy (#800020)');

    addHeading('Cover Layout', 3);
    addBullet('Top 1/3: "Self-Love Journal" in elegant serif font (48-60pt)');
    addBullet('Middle: Decorative floral/botanical illustration');
    addBullet('Center Element: Heart symbol or mandala design');
    addBullet('Bottom 1/3: "for Women" and subtitle in clean sans-serif');
    addBullet('Corner Elements: Small decorative flourishes');

    addHeading('Design Style Guidelines', 3);
    addBullet('Aesthetic: Feminine, elegant, inspiring, warm');
    addBullet('Mood: Empowering yet calming, luxurious yet accessible');
    addBullet('Typography: Mix of elegant serif and modern sans-serif');
    addBullet('Imagery: Abstract florals, watercolor effects, geometric patterns');
    addBullet('Avoid: Overly busy designs, harsh colors, childish graphics');

    addHeading('KDP Cover Dimensions', 3);
    addBullet('Trim Size: 6" x 9" (standard journal size)');
    addBullet('Page Count: 120 pages');
    addBullet('Paper: White interior, matte or glossy cover');
    addBullet('Spine Width: ~0.27" (for 120 pages, 60# paper)');
    addBullet('Full Cover Dimensions: 12.275" x 9.25" (including bleed)');

    // SECTION 6: PRICING & MARKETING
    doc.addPage();
    yPosition = margin;

    addHeading('6. Pricing & Marketing Strategy', 1);

    addHeading('Recommended Pricing', 3);
    addBullet('Print: $9.99 - $12.99');
    addBullet('eBook: $2.99 - $4.99');
    addBullet('KDP Select: Recommended for initial launch');

    addHeading('Amazon Categories (Choose 2)', 3);
    addBullet('Self-Help > Personal Transformation');
    addBullet('Self-Help > Self-Esteem');
    addBullet('Self-Help > Journal Writing');
    addBullet('Health & Wellness > Mental Health');

    addHeading('Marketing Keywords', 3);
    addText('self love journal for women, confidence building journal, self care planner, affirmation journal, guided journal for women, self improvement journal, gratitude journal women, empowerment journal, mindfulness journal, daily journal prompts', 10);

    addHeading('Book Description Template', 3);
    addBox('Transform Your Life with 30 Days of Intentional Self-Love\n\nDo you struggle with negative self-talk? Feel like you\'re not enough? It\'s time to rewrite your story.\n\nBenefits:\n• Build unshakeable confidence through daily affirmations\n• Develop a deeper relationship with yourself\n• Release perfectionism and embrace your authentic beauty\n• Transform your mindset with guided prompts\n• Create lasting self-care habits\n\nWhat\'s Inside:\n• 30 days of structured journal prompts\n• Daily affirmations to reprogram your mindset\n• Reflection exercises for deep transformation\n• 100+ bonus affirmations\n• Self-care activity checklists\n\nYour journey to unconditional self-love starts now!');

    // SECTION 7: INTERIOR FORMATTING
    doc.addPage();
    yPosition = margin;

    addHeading('7. Interior Formatting Guidelines', 1);

    addHeading('Page Layout Specifications', 3);
    addBullet('Page Size: 6" x 9"');
    addBullet('Margins: Inside 0.75", Outside 0.5", Top/Bottom 0.625"');
    addBullet('Font - Headings: Playfair Display or Cormorant Garamond, 16-20pt');
    addBullet('Font - Body/Prompts: Open Sans or Lato, 11-12pt');
    addBullet('Line Spacing: 1.5 for prompts, double spacing for writing areas');
    addBullet('Color: Black text, occasional accent colors (light pink borders)');

    addHeading('Page Elements', 3);
    addBullet('Headers: "Day X" with small decorative element');
    addBullet('Daily Affirmation: Centered, in decorative box/border');
    addBullet('Prompt Questions: Bold, with ample writing space below');
    addBullet('Writing Lines: Light gray, evenly spaced');
    addBullet('Checkboxes: For self-care tracking');
    addBullet('Page Numbers: Bottom center, small decorative font');

    // SECTION 8: LAUNCH STRATEGY
    addHeading('8. Launch Strategy', 1);

    addHeading('Pre-Launch Checklist', 3);
    addBullet('Complete manuscript formatted to KDP specifications');
    addBullet('Professional cover design created');
    addBullet('Proofread all content for typos and consistency');
    addBullet('Research competitor pricing ($8-15 range)');
    addBullet('Prepare 7 backend keywords');
    addBullet('Write compelling book description with bullet points');
    addBullet('Order author copy to check print quality');

    addHeading('Launch Week Actions', 3);
    addBullet('Share on social media with "just launched" announcement');
    addBullet('Offer limited-time discount or free promo days');
    addBullet('Email friends/family for honest reviews');
    addBullet('Run Amazon ads targeting relevant keywords');
    addBullet('Post in relevant Facebook groups');
    addBullet('Create Pinterest pins with journal pages/quotes');

    doc.addPage();
    yPosition = margin;

    addHeading('Long-Term Growth Strategy', 3);
    addBullet('Build an email list offering free journal pages as lead magnet');
    addBullet('Create companion products (workbooks, planners)');
    addBullet('Develop series (Vol 2, Gratitude Journal, etc.)');
    addBullet('Use social proof from reviews in marketing');
    addBullet('Consider expanding to Etsy (printable versions)');

    // SECTION 9: BONUS AFFIRMATIONS
    addHeading('9. 50 Bonus Affirmations', 1);

    const affirmations = [
      'I radiate confidence and grace.',
      'I trust myself to make good decisions.',
      'My happiness is my responsibility and my choice.',
      'I deserve rest, peace, and joy.',
      'I am beautiful inside and out.',
      'I release comparison and embrace my unique journey.',
      'I am proud of how far I\'ve come.',
      'My needs and desires are important.',
      'I speak to myself with kindness and compassion.',
      'I am worthy of all the good things life offers.',
      'I forgive myself for past mistakes.',
      'I am strong, resilient, and capable.',
      'I choose to focus on what I can control.',
      'I am the creator of my reality.',
      'I trust the timing of my life.',
      'I am growing and evolving every day.',
      'My voice deserves to be heard.',
      'I celebrate my uniqueness.',
      'I am becoming the woman I\'m meant to be.',
      'I choose peace over perfection.'
    ];

    affirmations.forEach(aff => {
      addBox(aff);
    });

    // SECTION 10: MANUSCRIPT OUTLINE
    doc.addPage();
    yPosition = margin;

    addHeading('10. Complete Manuscript Outline', 1);

    addHeading('Full 120-Page Structure', 2);

    addText('Pages 1-2: Title Page & Copyright', 11, true);
    addText('Pages 3-4: Welcome Message & How to Use This Journal', 11, true);
    addText('Pages 5-6: Setting Intentions & Self-Love Commitment', 11, true);

    addText('Pages 7-96: 30 Days of Guided Prompts (3 pages per day)', 11, true);
    addBullet('Day 1-10: Foundation (Self-awareness, acceptance, gratitude)');
    addBullet('Day 11-20: Growth (Boundaries, forgiveness, body positivity)');
    addBullet('Day 21-30: Transformation (Confidence, dreams, celebration)');

    addText('Pages 97-100: 100 Affirmations for Self-Love', 11, true);
    addText('Pages 101-103: Self-Care Ideas Checklist', 11, true);
    addText('Pages 104-109: Monthly Reflection Pages', 11, true);
    addText('Pages 110-113: Building Your Self-Love Toolkit', 11, true);
    addText('Pages 114-116: Letter to Your Future Self', 11, true);
    addText('Pages 117-120: Closing Message & Resources', 11, true);

    // FINAL PAGE
    addHeading('Final Tips for KDP Success', 1);

    addBox('"The most powerful relationship you will ever have is the relationship with yourself." - Steve Maraboli');

    addBullet('Quality First: Invest in professional cover design and thorough proofreading');
    addBullet('Reviews Matter: Encourage early readers to leave honest reviews');
    addBullet('Keywords: Research bestselling journals and analyze their strategies');
    addBullet('Series Potential: Consider this as Book 1 in a self-love series');
    addBullet('Stay Consistent: Regular marketing efforts compound over time');
    addBullet('Track Data: Monitor your KDP dashboard to see what\'s working');
    addBullet('Iterate: Use feedback to improve future editions');
    addBullet('Build Brand: Create an author platform around self-care niche');

    yPosition += 15;
    doc.setFillColor(255, 158, 216);
    doc.rect(margin, yPosition, maxWidth, 20, 'F');
    yPosition += 12;
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('You have everything you need to create a bestselling Self-Love Journal!', pageWidth / 2, yPosition, { align: 'center' });

    yPosition += 8;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Good luck with your KDP journey!', pageWidth / 2, yPosition, { align: 'center' });

    const pdfBuffer = doc.output('arraybuffer');

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Self-Love-Journal-for-Women-KDP-Blueprint.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
