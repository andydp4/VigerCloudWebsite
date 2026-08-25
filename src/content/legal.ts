// Legal document bodies (working drafts).
//
// These are structured, plain-English drafts tailored to what this website actually does. They are
// NOT a substitute for professional legal review: items in [square brackets] must be confirmed by
// the business before publication, and each page is no-indexed until sign-off. Do not present these
// as final advice.

export interface LegalSection {
  heading?: string
  paragraphs?: string[]
  bullets?: string[]
}

const CONTROLLER =
  'Viger Cloud Ltd, a company registered in England and Wales (company number 17353296), registered office 101, 50 Apex Lofts, Warwick Street, Birmingham, B12 0BA'

const privacyViger: LegalSection[] = [
  {
    heading: 'Who we are',
    paragraphs: [
      `This notice explains how ${CONTROLLER} ("Viger Cloud", "we", "us") handles personal data collected through this corporate website and related enquiries. For personal data handled within the Arcarna product, see the separate Arcarna Privacy Notice.`,
      'For any privacy question or to exercise your rights, contact us at support@vigercloud.com.',
    ],
  },
  {
    heading: 'The information we collect',
    bullets: [
      'Enquiry details you submit through our forms: your name, work email, organisation (optional), your message, and your consent to be contacted.',
      'Context sent with an enquiry: the page you submitted from and any campaign parameters (for example utm_source) present in the link you followed.',
      'Technical information created automatically when you visit, such as your IP address and request logs held by our hosting and email providers for security and reliability.',
      'Strictly necessary cookies required for the site to function (see our Cookie Notice).',
    ],
  },
  {
    heading: 'How we use it, and our lawful bases',
    bullets: [
      'To respond to your enquiry and provide the trial, demonstration or information you asked for — on the basis of your consent and our legitimate interest in responding to you.',
      'To keep the website secure and working — on the basis of our legitimate interests and legal obligations.',
      'We do not use your enquiry details for automated decision-making, and we do not sell personal data.',
    ],
  },
  {
    heading: 'Service providers we share data with',
    paragraphs: [
      'We use a small number of providers to run the site and handle enquiries. Enquiries are delivered to our support inbox by email, the website is hosted on our server infrastructure, and content is managed through a content platform.',
    ],
    bullets: [
      'Email/enquiry delivery: our mail provider [provider to be confirmed].',
      'Hosting: our server/hosting provider [provider to be confirmed].',
      'Content management: Sanity (content platform).',
    ],
  },
  {
    heading: 'International transfers',
    paragraphs: [
      'Where a provider processes data outside the UK, we rely on appropriate safeguards such as UK adequacy regulations or the International Data Transfer Agreement. [Specific transfer mechanisms and provider locations to be confirmed.]',
    ],
  },
  {
    heading: 'How long we keep it',
    paragraphs: [
      'We keep enquiry correspondence only as long as needed to deal with your enquiry and for a reasonable period afterwards, then delete or anonymise it. [Specific retention periods to be confirmed.]',
    ],
  },
  {
    heading: 'Your rights',
    paragraphs: [
      'Subject to UK data protection law, you have the right to access, correct, delete or restrict our use of your personal data, to object to certain processing, to data portability, and to withdraw consent at any time.',
      'To exercise any right, email support@vigercloud.com. If you are not satisfied with our response you can complain to the Information Commissioner\u2019s Office (ICO) at ico.org.uk. [ICO registration number to be confirmed.]',
    ],
  },
  {
    heading: 'Changes to this notice',
    paragraphs: [
      'We will update this notice as our services and providers are confirmed, and we will change the version date above when we do.',
    ],
  },
]

const privacyArcarna: LegalSection[] = [
  {
    heading: 'Scope',
    paragraphs: [
      `This notice describes how ${CONTROLLER} handles personal data within the Arcarna product. Arcarna is in beta; this draft will be finalised alongside the Arcarna Subscription Terms and Data Processing Agreement.`,
    ],
  },
  {
    heading: 'Controller and processor roles',
    bullets: [
      'For account, sign-up and billing data about the customer we deal with, Viger Cloud is the controller.',
      'For the business data a customer connects to Arcarna (which may include personal data about that customer\u2019s own customers or staff), Viger Cloud acts as a processor on the customer\u2019s instructions, under a Data Processing Agreement.',
    ],
  },
  {
    heading: 'Information involved',
    bullets: [
      'Account and contact details for the people who administer or use a workspace.',
      'Usage and support data generated while using Arcarna (for example activity needed to operate the service and to help with support requests).',
      'Connected business data provided by the customer, such as sales, stock, orders and customer records, used to produce the insights the customer asks for.',
    ],
  },
  {
    heading: 'Customer responsibilities',
    paragraphs: [
      'Where a customer connects data containing personal data, the customer is responsible for having a lawful basis to do so and for informing the individuals concerned. We process that data only to provide the service and on the customer\u2019s instructions.',
    ],
  },
  {
    heading: 'Subprocessors, hosting and transfers',
    paragraphs: [
      'We use a limited set of subprocessors to host and operate Arcarna. A current list, hosting locations and transfer safeguards will be maintained and made available to customers. [Subprocessor list, hosting locations and transfer mechanisms to be confirmed.]',
    ],
  },
  {
    heading: 'Retention and deletion',
    paragraphs: [
      'Connected business data is retained for the life of the customer relationship and deleted or returned after termination, in line with the Data Processing Agreement. [Specific retention and deletion timelines to be confirmed.]',
    ],
  },
  {
    heading: 'Rights and contact',
    paragraphs: [
      'Individuals whose data is processed by Arcarna as a processor should contact the relevant customer (the controller). For data where Viger Cloud is the controller, contact support@vigercloud.com. You may also complain to the ICO (ico.org.uk).',
    ],
  },
]

const cookies: LegalSection[] = [
  {
    heading: 'About cookies',
    paragraphs: [
      'Cookies are small files stored on your device. Similar technologies (such as local storage) work in comparable ways. This notice explains what we use and how you can control it.',
    ],
  },
  {
    heading: 'Cookies we currently use',
    paragraphs: [
      'This website currently uses only strictly necessary technologies required to serve pages and keep the site secure. We do not currently run analytics, advertising or third-party tracking cookies.',
    ],
    bullets: [
      'Strictly necessary: used to deliver the website and protect it. These do not require consent.',
    ],
  },
  {
    heading: 'If we add analytics or marketing cookies',
    paragraphs: [
      'If we introduce analytics or marketing technologies in future, we will list each one here (provider, purpose and duration) and ask for your consent before any non-essential cookie is set. Our analytics are built to stay switched off until consent is given. [Specific analytics/marketing providers to be confirmed when enabled.]',
    ],
  },
  {
    heading: 'Managing cookies',
    paragraphs: [
      'You can control or delete cookies through your browser settings. Blocking strictly necessary cookies may stop parts of the site from working. Where a consent choice applies, you will be able to change or withdraw it at any time.',
    ],
  },
]

const terms: LegalSection[] = [
  {
    heading: 'These terms',
    paragraphs: [
      `These Website Terms of Use govern your use of this website, operated by ${CONTROLLER}. By using the site you accept these terms. Use of the Arcarna product is governed by separate Arcarna Subscription Terms and, where applicable, a Data Processing Agreement, which will be provided before onboarding.`,
    ],
  },
  {
    heading: 'Using the website',
    bullets: [
      'You may view and use this website for lawful, personal or business-information purposes.',
      'You must not misuse the site, attempt to disrupt it, or access it in a way that breaches applicable law.',
      'Enquiry forms are for genuine enquiries; automated or abusive submissions may be blocked.',
    ],
  },
  {
    heading: 'Information on this site',
    paragraphs: [
      'We aim to keep information accurate and current, but the website is provided for general information about Viger Cloud and its products. Product availability, features and pricing described here may change and are confirmed as part of a specific proposal or agreement.',
    ],
  },
  {
    heading: 'Intellectual property',
    paragraphs: [
      'The Viger Cloud and Arcarna names, logos, content and design are owned by or licensed to Viger Cloud Ltd and may not be copied or used without permission, except as allowed by law.',
    ],
  },
  {
    heading: 'Liability',
    paragraphs: [
      'Nothing in these terms limits liability that cannot be limited by law. Subject to that, the website is provided on an "as is" basis and, to the extent permitted by law, we are not liable for indirect or consequential loss arising from use of the website. [Liability wording to be confirmed on legal review.]',
    ],
  },
  {
    heading: 'Governing law',
    paragraphs: [
      'These terms are governed by the laws of England and Wales, and the courts of England and Wales have jurisdiction. Questions about these terms: support@vigercloud.com.',
    ],
  },
]

const accessibility: LegalSection[] = [
  {
    heading: 'Our commitment',
    paragraphs: [
      'We want this website to be usable by as many people as possible, including people who rely on assistive technologies. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. [Target standard to be confirmed.]',
    ],
  },
  {
    heading: 'What we have done',
    bullets: [
      'Semantic HTML structure and descriptive page titles.',
      'Keyboard navigation with a visible focus indicator and a "skip to content" link.',
      'Support for the operating-system "reduced motion" setting, so animation can be turned off.',
      'Attention to colour contrast and responsive layouts across screen sizes.',
    ],
  },
  {
    heading: 'Known limitations',
    paragraphs: [
      'We are still testing the site against the full guidelines and will list any known issues here as they are identified. [Formal audit results and known limitations to be confirmed.]',
    ],
  },
  {
    heading: 'Reporting a problem',
    paragraphs: [
      'If you find an accessibility barrier, please tell us at support@vigercloud.com and we will do our best to help and to fix it. [Target response time to be confirmed.]',
    ],
  },
  {
    heading: 'Preparation of this statement',
    paragraphs: [
      'This statement is a working draft and will be dated and reviewed when finalised.',
    ],
  },
]

const security: LegalSection[] = [
  {
    heading: 'Our approach',
    paragraphs: [
      'We take a practical, evidence-based approach to security. This overview describes controls that apply to this website today; it will be expanded as further controls are formally verified. We do not claim controls we have not implemented.',
    ],
  },
  {
    heading: 'Protecting data in transit',
    paragraphs: [
      'The website is served over HTTPS so traffic between your browser and our servers is encrypted. Enquiries submitted through the site are transmitted over encrypted connections to our support inbox.',
    ],
  },
  {
    heading: 'Hosting and access',
    bullets: [
      'The site runs on managed server infrastructure with access limited to authorised personnel. [Hosting provider and region to be confirmed.]',
      'Administrative access and content-management access are restricted, and credentials are provisioned individually.',
      'Secrets and API keys are stored as server environment variables and are never committed to source control.',
    ],
  },
  {
    heading: 'Handling enquiry data',
    paragraphs: [
      'Enquiry submissions are delivered to a controlled support mailbox and are not published or shared beyond the team that needs them to respond.',
    ],
  },
  {
    heading: 'Development practices',
    paragraphs: [
      'We use version control and review changes before release, keep dependencies maintained, and run automated checks (type-checking, linting and tests) as part of our build. [Backup, monitoring and incident-response details to be confirmed.]',
    ],
  },
  {
    heading: 'Reporting a vulnerability',
    paragraphs: [
      'If you believe you have found a security issue, please contact support@vigercloud.com so we can investigate. Please do not publicly disclose an issue before we have had a chance to respond.',
    ],
  },
]

export const legalBodies: Record<string, LegalSection[]> = {
  'privacy-viger': privacyViger,
  'privacy-arcarna': privacyArcarna,
  cookies,
  terms,
  accessibility,
  security,
}

export function getLegalBody(slug: string): LegalSection[] | undefined {
  return legalBodies[slug]
}
