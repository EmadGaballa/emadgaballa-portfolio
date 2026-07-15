// src/pages/Work/content/caseStudies.ts

export interface CaseStudyContent {
  challenge: string;
  approach: string;
  engineering: string;
  outcome: string;
  lessons: string;
}

export const caseStudies: Record<string, CaseStudyContent> = {
  flickfinder: {
    challenge:
      "Most movie applications stop at displaying TMDB data. FlickFinder set out to create a complete platform—combining cinematic discovery, persistent personalization, secure authentication, and social interaction into a polished experience that feels closer to a modern streaming service than a traditional movie database.",

    approach:
      "The application was designed around independent frontend and backend systems working together. A cinematic React interface delivers smooth browsing, while a modular Express API manages authentication, user libraries, ratings, friendships, avatars, and personalized content. Every feature was built as part of a cohesive ecosystem rather than as isolated functionality.",

    engineering:
      "As the project evolved, the focus shifted from consuming movie data to engineering a scalable full-stack architecture. A layered Express + TypeScript backend, Prisma ORM, and PostgreSQL power secure authentication with JWT and HTTP-only cookies, persistent user libraries, friend relationships, ratings, watchlists, favorites, and profile management. The frontend complements this with optimized rendering, lazy loading, memoization, and carefully structured state management to keep interactions responsive as the application grows.",

    outcome:
      "The result is a production-ready full-stack movie platform that combines cinematic design with robust engineering. Secure authentication, persistent personalization, social features, modular APIs, and a scalable database architecture deliver a fast, reliable experience that is easy to maintain, extend, and deploy.",

    lessons:
      "A great product isn't built by adding features—it's built by creating an architecture where every feature fits together naturally and can evolve without increasing complexity.",
  },
  geoboard: {
    challenge:
      "Building a unified dashboard meant combining weather, news, currency exchange, authentication, and location services into one cohesive platform while keeping each system fast, reliable, and independently maintainable. The challenge wasn't integrating multiple APIs—it was making them behave like a single polished product.",

    approach:
      "The application was designed around a modular React frontend backed by an Express REST API, with every feature isolated into dedicated services and routes. Redis caching, background jobs, and a responsive dashboard architecture allow weather, news, currency, authentication, and location services to work together seamlessly while remaining independently scalable.",

    engineering:
      "A production-ready backend was built using Express, Prisma, PostgreSQL, Redis, and BullMQ to handle authentication, caching, scheduled refresh jobs, and secure API communication. TypeScript enforces consistent data contracts across external providers, while JWT authentication, httpOnly cookies, rate limiting, validation, and modular service layers create a secure, maintainable architecture designed for real-world deployment.",

    outcome:
      "GeoBoard evolved into a full-stack smart dashboard that delivers live weather, breaking news, currency exchange, and location intelligence through a fast, secure, and highly responsive experience. With scalable backend infrastructure, Redis acceleration, production deployment, and modern UI design, the platform demonstrates enterprise-level engineering beyond a traditional dashboard project.",

    lessons:
      "A scalable application isn't defined by how many features it has—it's defined by how independently those features can evolve without compromising performance, security, or maintainability.",
  },
  "fortress-ird": {
    challenge:
      "Fortress Investment & Real Estate Development came in with a website that was actively working against them: slow to load, broken on mobile, and visually out of step with the premium developments it was meant to represent. For a real-estate brand, a website that feels cheap undercuts the very product it is selling.",
    approach:
      "Rather than patch the old site, it was rebuilt from a blank canvas with performance as a design constraint from day one — no framework overhead, no unnecessary dependencies, just HTML, CSS, and vanilla JavaScript engineered to load fast and scroll smoothly on any device, paired with cinematic Intersection-Observer-driven reveal animations that read as premium rather than decorative.",
    engineering:
      "Every asset was optimized and lazy-loaded, critical CSS was inlined to eliminate render-blocking, and every interactive element was built to be keyboard- and touch-accessible without pulling in a single external UI library — a deliberate constraint that kept the bundle lean and the client's hosting costs low.",
    outcome:
      "The rebuilt site now runs pixel-perfect from 320px mobile screens up to 4K desktop displays, with fast load times and smooth, accessible interactions that finally match the premium positioning of the developments it showcases.",
    lessons:
      "Going dependency-free was a constraint, not a limitation — it forced every animation and layout decision to justify its cost, which is exactly the discipline a performance-first brief demands.",
  },
};
