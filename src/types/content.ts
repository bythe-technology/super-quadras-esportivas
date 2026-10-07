export type PublicationStatus = 'review' | 'published';
export interface CompanyProfile {
  name: string;
  domain: string;
  phoneDisplay: string;
  phoneInternational: string;
  whatsappNumber: string;
  instagram: string;
  instagramHandle: string;
  region: string;
}
export interface MediaAsset {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: 'archive-photo' | 'reference-photo' | 'conceptual-illustration';
  source: string;
  rights: 'pending-owner' | 'approved-owner' | 'licensed-stock' | 'original-illustration';
  treatment: string;
  caption?: string;
}
export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: 'principal' | 'complementar';
  status: PublicationStatus;
  imageId: string;
  illustrationId: string;
  applications: string[];
  scope: string[];
  materials: string;
  considerations: string[];
  maintenance: string;
  faq: { question: string; answer: string }[];
}
export interface Project {
  slug: string;
  title: string;
  status: PublicationStatus;
  imageIds: string[];
  description: string;
  serviceSlug: string;
  documentationNote: string;
}
export interface Guide {
  slug: string;
  title: string;
  description: string;
  status: PublicationStatus;
  imageId: string;
  serviceSlug: string;
  markdown: string;
  readingMinutes: number;
  reviewedAt?: string;
}
