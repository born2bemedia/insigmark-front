import { useTranslations } from "next-intl";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  label: string;
  items: FaqItem[];
};

export const useFaqCategories = (): FaqCategory[] => {
  const t = useTranslations("faq");

  return [
    {
      id: "starting-a-project",
      label: t("catStarting", { fallback: "Starting a Project" }),
      items: [
        {
          question: t("startQ1", {
            fallback: "How do I start a project with Insigmark?",
          }),
          answer: t("startA1", {
            fallback:
              "The process usually begins with a brief consultation in which we discuss your idea, goals, and technical requirements. After that, we define the project scope and development plan.",
          }),
        },
        {
          question: t("startQ2", {
            fallback:
              "What information should I prepare before contacting you?",
          }),
          answer: t("startA2", {
            fallback:
              "It helps to have a general idea of your website's purpose, number of pages, desired features, and whether you need hosting or migration.",
          }),
        },
        {
          question: t("startQ3", {
            fallback: "Do you work with individuals or only companies?",
          }),
          answer: t("startA3", {
            fallback:
              "Our services are designed primarily for individuals and independent creators who want reliable website solutions.",
          }),
        },
        {
          question: t("startQ4", {
            fallback:
              "Can you help if I only have an idea but no technical plan?",
          }),
          answer: t("startA4", {
            fallback:
              "Yes. Many projects start exactly this way. We help structure the idea, define the architecture, and determine the best development approach.",
          }),
        },
        {
          question: t("startQ5", {
            fallback: "Can my project grow later if I start small?",
          }),
          answer: t("startA5", {
            fallback:
              "Yes. Websites can be expanded with additional pages, features, or infrastructure upgrades as the project evolves.",
          }),
        },
      ],
    },
    {
      id: "website-development",
      label: t("catWebDev", { fallback: "Website Development" }),
      items: [
        {
          question: t("webQ1", {
            fallback: "What types of websites do you build?",
          }),
          answer: t("webA1", {
            fallback:
              "We develop a wide range of websites, including portfolios, blogs, landing pages, informational websites, and complex platforms with advanced functionality.",
          }),
        },
        {
          question: t("webQ2", {
            fallback: "Do you build websites using WordPress?",
          }),
          answer: t("webA2", {
            fallback:
              "Yes, WordPress can be used for projects that benefit from content management systems and rapid deployment.",
          }),
        },
        {
          question: t("webQ3", {
            fallback: "Do you also build fully custom websites?",
          }),
          answer: t("webA3", {
            fallback:
              "Yes. Some projects require custom development using modern frameworks to support advanced functionality or scalability.",
          }),
        },
        {
          question: t("webQ4", {
            fallback:
              "Can my website include integrations with other services?",
          }),
          answer: t("webA4", {
            fallback:
              "Yes. Websites can integrate with external systems such as payment platforms, analytics tools, APIs, and other online services.",
          }),
        },
        {
          question: t("webQ5", {
            fallback: "Will my website work on mobile devices?",
          }),
          answer: t("webA5", {
            fallback:
              "Yes. Every website is designed to be responsive, so it functions properly across mobile phones, tablets, and desktop devices.",
          }),
        },
      ],
    },
    {
      id: "hosting-infrastructure",
      label: t("catHosting", { fallback: "Hosting & Infrastructure" }),
      items: [
        {
          question: t("hostQ1", {
            fallback: "Do I need separate hosting for my website?",
          }),
          answer: t("hostA1", {
            fallback:
              "No. Hosting can be provided together with development, so the website is ready to launch immediately.",
          }),
        },
        {
          question: t("hostQ2", {
            fallback: "What hosting options are available?",
          }),
          answer: t("hostA2", {
            fallback:
              "Hosting environments include shared hosting, managed WordPress hosting, VPS infrastructure, and dedicated servers, depending on project size.",
          }),
        },
        {
          question: t("hostQ3", {
            fallback: "Can you host websites that were built elsewhere?",
          }),
          answer: t("hostA3", {
            fallback:
              "Yes. Existing websites can be migrated and hosted on our infrastructure.",
          }),
        },
        {
          question: t("hostQ4", {
            fallback: "Will my website remain online during high traffic?",
          }),
          answer: t("hostA4", {
            fallback:
              "Scalable hosting environments help maintain stability even when traffic increases.",
          }),
        },
        {
          question: t("hostQ5", {
            fallback: "Can I upgrade hosting later?",
          }),
          answer: t("hostA5", {
            fallback:
              "Yes. Hosting environments can be upgraded as your website grows and requires additional resources.",
          }),
        },
      ],
    },
    {
      id: "security-maintenance",
      label: t("catSecurity", { fallback: "Security & Maintenance" }),
      items: [
        {
          question: t("secQ1", {
            fallback: "How is my website protected?",
          }),
          answer: t("secA1", {
            fallback:
              "Security measures may include firewalls, malware monitoring, secure server configuration, and encrypted connections.",
          }),
        },
        {
          question: t("secQ2", {
            fallback: "Do you provide regular updates?",
          }),
          answer: t("secA2", {
            fallback:
              "Yes. Maintenance services can include updates, performance monitoring, and security improvements.",
          }),
        },
        {
          question: t("secQ3", {
            fallback: "What happens if something breaks?",
          }),
          answer: t("secA3", {
            fallback:
              "Technical support is available to identify issues and restore normal functionality.",
          }),
        },
        {
          question: t("secQ4", {
            fallback: "Are backups included?",
          }),
          answer: t("secA4", {
            fallback:
              "Backup systems are used to create copies of website data, which can be restored if necessary.",
          }),
        },
        {
          question: t("secQ5", {
            fallback: "Do I need ongoing maintenance?",
          }),
          answer: t("secA5", {
            fallback:
              "Maintenance is recommended for websites that require updates, security monitoring, or performance optimization.",
          }),
        },
      ],
    },
    {
      id: "pricing",
      label: t("catPricing", { fallback: "Pricing" }),
      items: [
        {
          question: t("priceQ1", {
            fallback: "How much does a website usually cost?",
          }),
          answer: t("priceA1", {
            fallback:
              "Project pricing depends on the website's complexity, required features, and hosting infrastructure.",
          }),
        },
        {
          question: t("priceQ2", {
            fallback: "Is pricing transparent?",
          }),
          answer: t("priceA2", {
            fallback:
              "Yes. Each service includes clear explanations so clients understand exactly what they are paying for.",
          }),
        },
        {
          question: t("priceQ3", {
            fallback: "Do you offer project packages?",
          }),
          answer: t("priceA3", {
            fallback:
              "Yes. Some projects fit predefined service ranges while others require custom solutions.",
          }),
        },
        {
          question: t("priceQ4", {
            fallback: "Can I pay in stages?",
          }),
          answer: t("priceA4", {
            fallback:
              "Yes. Payment can be structured either as a single payment or stage-by-stage, depending on the project.",
          }),
        },
        {
          question: t("priceQ5", {
            fallback: "Is hosting included in the price?",
          }),
          answer: t("priceA5", {
            fallback:
              "Hosting may be included in certain packages or selected separately depending on your needs.",
          }),
        },
      ],
    },
  ];
};
