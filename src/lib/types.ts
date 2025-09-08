export type Stat = {
  label: string
  value: string
}

export type Benefit = {
  title: string
  text: string
}

export type Environment = {
  type: "residencial" | "comercial"
  title: string
  text: string
  image?: string
}

export type HowStep = {
  title: string
  text: string
}

export type Testimonial = {
  author: string
  role?: string
  text: string
}

export type CaseItem = {
  title: string
  metric_label: string
  metric_value: string
}

export type LandingData = {
  hero_title: string
  hero_subtitle: string
  hero_cta_primary_label: string
  hero_cta_secondary_label: string
  stats: Stat[]
  benefits: Benefit[]
  environments: Environment[]
  howitworks: HowStep[]
  proofs: {
    clients: string[]
    testimonials: Testimonial[]
    cases: CaseItem[]
  }
  media_kit_file: string
  faq: { q: string; a: string }[]
  contact: {
    address: string
    email: string
    phone: string
  }
}
