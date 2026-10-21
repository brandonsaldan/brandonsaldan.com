---
title: "Capsl: Personalized Supplement Service"
description: "An experimental supplement personalization and delivery service enabling custom vitamin and supplement blends through an engaging digital experience."
publishDate: "2023-03-15"
image:
  src: "../../assets/projects/art/capsl.webp"
  alt: "Painterly artwork selected for the Capsl project"
status: "Experimental"
focus: "Product Design & Frontend"
repository: "https://github.com/trycapsl"
isFeatured: false
seo:
  image:
    src: "../../assets/projects/capsl/capsl-1.png"
    alt: "Capsl supplement personalization interface"
---

![Capsl supplement personalization interface](../../assets/projects/capsl/capsl-1.png)

Capsl is an experimental supplement personalization platform that enables users to create custom vitamin and supplement blends tailored to their individual needs. The experience combines a questionnaire-driven recommendation flow with subscription management, account tools, and a cohesive product identity.

## Objectives

The project set out to make supplement personalization feel approachable while supporting the operational complexity of a subscription commerce product. The main objectives were to create an engaging recommendation experience, develop a complete subscription workflow, design a consistent brand and packaging system, and establish a frontend architecture that could support future expansion.

## Personalization & Commerce

The personalization flow uses branching questions to guide users toward a custom blend. Recommendations update as the user moves through the experience, with validation and progress feedback keeping the process clear. The product concept also included a blend visualization and detailed supplement information so that users could understand the reasoning behind each recommendation.

The commerce experience was designed around the full subscription lifecycle. It included account creation, secure payment processing, subscription management, order history, order tracking, and supplement schedule management. Supporting inventory and profile interfaces provided the operational foundation needed to run the service.

## User Experience & Architecture

Capsl treated onboarding as the first part of the product rather than a separate form. The responsive interface introduced the service gradually, preserved progress through the questionnaire, and carried the same visual language into the customer dashboard. Responsive validation and account management patterns were designed to work across desktop and mobile contexts.

The prototype used Next.js and TailwindCSS for the frontend, Figma for design, Supabase for authentication and data, and Git for version control. These choices kept the experiment focused on the customer experience while leaving room for a more complete commerce backend later.

## Outcome

Capsl was developed as an experiment and was not intended for launch. It demonstrated how personalized recommendations, subscription commerce, and packaging could work together in a single product experience, while also serving as a practical exercise in frontend architecture and digital product design.

Development concluded after one month.
