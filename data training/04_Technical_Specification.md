# NGO THI THUY DUYEN

# Technical Specification

Version: 1.0

Status: Production Specification

---

# Purpose

This document defines the software architecture, engineering standards, coding conventions, and technical requirements for the Living Artistic Archive.

Every implementation should follow these specifications.

Technology decisions should prioritize

- longevity
- maintainability
- scalability
- accessibility
- performance

The codebase should remain understandable for future developers.

---

# Architectural Philosophy

The project should follow modern software engineering principles.

The frontend should remain independent from the CMS.

The CMS should remain independent from the presentation layer.

Business logic should never exist inside UI components.

Every layer should have a single responsibility.

---

# Core Principles

The architecture should satisfy

- Separation of Concerns
- Clean Architecture
- SOLID Principles
- Composition over Inheritance
- Server First
- Progressive Enhancement

Avoid tightly coupled systems.

---

# Technology Stack

Framework

Next.js 15

Language

TypeScript

Runtime

Node.js LTS

Package Manager

pnpm

Styling

Tailwind CSS

Animation

Framer Motion

CMS

Sanity

Deployment

Vercel

Image Processing

Next/Image

Search

Sanity Search
(Algolia or Meilisearch optional)

Analytics

Plausible Analytics

Monitoring

Sentry

---

# Rendering Strategy

Default

Server Components

Use Client Components only when necessary.

Examples

Server Components

- Homepage
- Artwork Pages
- Publications
- Journal
- Archive
- About

Client Components

- Search
- Filters
- Lightbox
- Gallery Zoom
- Theme Switcher

Everything else should remain server-rendered.

---

# Rendering Modes

Homepage

Static

Artwork

ISR

Journal

ISR

Publication

Static

Archive

ISR

Search

Dynamic

Contact

Static

---

# Folder Structure

```
app/

components/

features/

hooks/

lib/

services/

types/

schemas/

sanity/

styles/

public/

scripts/

tests/

middleware/

```

No page-specific components should exist outside features.

---

# Recommended Structure

```
app

components

features

artwork

journal

gallery

archive

publication

navigation

search

lib

cms

seo

utils

validation

types

hooks

services

```

Each feature owns its own logic.

---

# Component Rules

Every component should satisfy

Single Responsibility

Reusable

Typed

Accessible

Responsive

No hidden dependencies.

---

# Naming Convention

Components

PascalCase

```
ArtworkCard

JournalCard

Hero

Gallery
```

Hooks

camelCase

```
useSearch

useScroll

useGallery
```

Utilities

camelCase

```
formatDate

slugify

groupByYear
```

Types

PascalCase

```
Artwork

Publication

JournalEntry
```

---

# TypeScript Rules

Never use

```
any
```

Prefer

```
unknown

interface

type

Readonly

Record
```

Enable

Strict Mode

No Implicit Any

Exact Optional Property Types

---

# Import Rules

Prefer absolute imports.

Example

```
@/components

@/features

@/lib

@/types
```

Avoid deep relative imports.

---

# Styling Rules

Tailwind only.

Do not write page-specific CSS files.

Global CSS should contain only

- reset
- typography
- utility variables

Everything else belongs to Tailwind utilities.

---

# Tailwind Standards

Avoid arbitrary values.

Preferred

```
p-8

gap-6

max-w-4xl
```

Avoid

```
w-[317px]

mt-[43px]
```

Unless absolutely necessary.

---

# Design Tokens

Colors

Spacing

Radius

Typography

Shadows

Breakpoints

Animation

must be centralized.

Never hardcode values.

---

# Feature Organization

Each feature should contain

```
components

hooks

types

utils

queries

actions

```

Avoid giant feature folders.

---

# State Management

Prefer

React Server Components

URL State

React Context

Use Zustand only when global client state is required.

Avoid Redux unless future complexity justifies it.

---

# Data Fetching

Preferred order

Server Components

↓

Cached Fetch

↓

ISR

↓

Client Fetch

Client fetching should be minimized.

---

# Error Handling

Every page should support

Loading

Empty

Error

Not Found

States.

Never expose raw exceptions.

---

# Logging

Development

Console

Production

Sentry

Sensitive information should never be logged.

---

# Environment Variables

Store only

CMS Tokens

API Keys

Analytics IDs

Secrets

Never expose private tokens to the browser.

---

# Configuration

Use

```
.env.local

.env.production
```

Never commit secrets to Git.

---

# Version Control

Git

Main Branch

Production

Develop Branch

Development

Feature Branch

One branch per feature.

Pull Requests required before merge.

---

# Code Formatting

Use

ESLint

Prettier

EditorConfig

Formatting should be automatic.

---

# Documentation

Every feature should include

Purpose

Dependencies

Public API

Example Usage

Known Limitations

Avoid undocumented modules.

---

# Dependency Policy

Prefer native APIs.

Avoid unnecessary libraries.

Before adding a dependency ask

Can this be solved with existing code?

Smaller dependency tree equals better maintainability.

---

# Progressive Enhancement

Core content should remain accessible

without JavaScript.

Interactive enhancements should load afterwards.

---

# Browser Support

Latest versions

Chrome

Edge

Firefox

Safari

Graceful degradation for older browsers.

---

# Technical Goals

The system should remain

Fast

Scalable

Maintainable

Accessible

Secure

Testable

Framework updates should require minimal changes.

This architecture should support continuous evolution over many years without fundamental restructuring
---

# CMS Integration

The frontend communicates with the CMS exclusively through structured APIs.

No component should query the CMS directly.

Create a dedicated data access layer.

Architecture

```

UI

↓

Feature Layer

↓

Repository Layer

↓

CMS Client

↓

Sanity

```

Business logic must never exist inside GROQ queries.

---

# Sanity Client

Only one configured Sanity client should exist.

Responsibilities

- Fetch content
- Preview mode
- Image URL generation
- Draft support
- Revalidation

Never instantiate multiple clients.

---

# Repository Pattern

Every content type should expose a repository.

Example

```
ArtworkRepository

JournalRepository

PublicationRepository

ArchiveRepository

ExhibitionRepository
```

Repositories should hide CMS implementation details.

---

# Query Standards

Every query should

- Return only required fields
- Support pagination
- Support filtering
- Support ordering
- Support preview mode

Avoid returning unused data.

---

# GROQ Organization

Recommended structure

```
sanity

queries

artwork.ts

journal.ts

publication.ts

archive.ts

travel.ts

homepage.ts

```

One file per document type.

---

# Data Validation

Validate all incoming CMS data.

Recommended libraries

```
Zod

Valibot
```

Never trust CMS responses blindly.

---

# Data Transformation

CMS responses should be transformed into frontend models.

Example

```
CMS

↓

Parser

↓

Frontend Model

↓

Component
```

Components should never receive raw CMS objects.

---

# API Layer

Create reusable API services.

Responsibilities

- Fetch content
- Validate
- Normalize
- Cache
- Transform

Avoid duplicate fetching logic.

---

# Caching Strategy

Homepage

Static

Artwork

ISR

Journal

ISR

Archive

ISR

Publications

Static

Search

Dynamic

Preview

No Cache

---

# Revalidation

Recommended

Homepage

24 hours

Artwork

12 hours

Journal

6 hours

Archive

12 hours

Publication

24 hours

Settings

Immediately

These values may be adjusted later.

---

# Cache Layers

```
Browser Cache

↓

CDN Cache

↓

Next.js Cache

↓

Sanity CDN

↓

Sanity Database
```

Every layer should work together.

---

# CDN Strategy

Use

Vercel Edge Network

Sanity CDN

Images should always be served through CDN.

---

# Route Handlers

API routes should remain minimal.

Recommended

```
api

search

preview

revalidate

contact

health
```

Avoid unnecessary backend endpoints.

---

# Search Architecture

Preferred

Sanity Search

Optional

Meilisearch

Algolia

Search should support

- Full text
- Typo tolerance
- Ranking
- Filtering
- Suggestions

---

# Image Pipeline

Every image passes through

```
Original

↓

Optimization

↓

Responsive Sizes

↓

WebP

↓

AVIF

↓

Blur Placeholder

↓

CDN
```

Never serve original images directly.

---

# Image Loading Rules

Every image should support

- Lazy Loading
- Responsive Sizes
- Blur Placeholder
- Priority Loading (Hero only)
- Proper Alt Text

Only hero images should use priority loading.

---

# SEO Architecture

Every page generates

```
Title

Description

Canonical URL

Open Graph

Twitter Card

JSON-LD

Robots

Alternate Languages
```

No page should miss metadata.

---

# JSON-LD

Generate structured data automatically.

Supported schema

```
Person

VisualArtwork

ExhibitionEvent

CollectionPage

Article

BreadcrumbList

ImageObject

Organization

WebSite
```

Schema should match page content.

---

# Sitemap

Automatically generate

```
Homepage

Works

Journal

Archive

Travel

Publications

Exhibitions

CV

```

Sitemap updates after publishing.

---

# Robots.txt

Allow

Public content

Disallow

Preview

Draft

CMS

Private APIs

---

# Metadata Generation

If editors omit metadata

Generate defaults from

- Title
- Excerpt
- Hero Image
- Tags

Editors may override defaults.

---

# Performance Budget

Homepage

<150 KB JavaScript

Artwork Page

<180 KB

Journal

<170 KB

Archive

<180 KB

Minimize client-side bundles.

---

# Core Web Vitals Targets

LCP

<2.5 seconds

CLS

<0.1

INP

<200ms

TTFB

<800ms

These values should be monitored continuously.

---

# Security Headers

Configure

```
Content-Security-Policy

X-Frame-Options

X-Content-Type-Options

Referrer-Policy

Permissions-Policy

Strict-Transport-Security
```

Headers should be managed centrally.

---

# Content Security Policy

Only trusted domains

Examples

```
Sanity

Vercel

Google Fonts (if required)

Plausible

YouTube

Vimeo
```

Avoid wildcard permissions.

---

# Authentication

Public website

No authentication required.

CMS

Authenticated editors only.

Preview mode

Token protected.

---

# Authorization

Roles

```
Administrator

Editor

Contributor

Viewer
```

Each role has minimal required permissions.

---

# Rate Limiting

Protect

Search

Contact Form

Preview API

Revalidation API

Prevent abuse.

---

# Form Security

Every form requires

- Server validation
- Spam protection
- CSRF protection
- Rate limiting

Never trust client validation alone.

---

# Error Boundaries

Provide boundaries for

Homepage

Artwork

Journal

Archive

Search

Individual failures should not crash the application.

---

# 404 Strategy

Unknown URLs

↓

Custom 404 Page

Provide

- Search
- Navigation
- Suggested Content

---

# Monitoring

Use

Sentry

Monitor

- Exceptions
- Performance
- Failed Requests
- Broken Routes

Critical issues should generate alerts.

---

# Analytics

Preferred

Plausible Analytics

Track

- Page Views
- Search Usage
- Gallery Views
- Downloads
- Language Selection

Avoid invasive tracking.

---

# Accessibility Monitoring

Run automated accessibility checks during deployment.

Detect

- Missing Alt Text
- Invalid Heading Order
- Contrast Issues
- Missing Labels

Fix before production.

---

# Internationalization

Support

English

Vietnamese

Architecture should allow future languages.

URLs

```
/en

/vi
```

Avoid language detection based solely on browser settings.

---

# Technical Principle

The frontend should remain independent from the CMS.

The CMS should remain independent from the database.

Every layer should be replaceable with minimal impact.

Long-term maintainability takes priority over short-term convenience
---

# Testing Strategy

The project must be tested continuously throughout development.

Testing should verify

- functionality
- accessibility
- performance
- security
- user experience

Testing should begin during development, not after implementation.

---

# Testing Pyramid

```
E2E Tests

↑

Integration Tests

↑

Unit Tests
```

Prioritize more unit tests than end-to-end tests.

---

# Unit Testing

Recommended

Vitest

Test

- Utilities
- Helpers
- Data Transformation
- Validation
- Business Logic

Avoid testing implementation details.

Test behavior instead.

---

# Integration Testing

Verify

- CMS Integration
- Search
- Gallery
- Metadata Generation
- API Responses

Integration tests should simulate realistic data.

---

# End-to-End Testing

Recommended

Playwright

Verify

Homepage

Artwork Pages

Journal

Archive

Search

Language Switching

Navigation

Forms

404 Pages

Preview Mode

---

# Accessibility Testing

Every deployment should run

- Lighthouse
- axe-core
- Keyboard Navigation
- Screen Reader Testing

Accessibility regressions should block production deployment.

---

# Performance Testing

Measure

Largest Contentful Paint

Interaction to Next Paint

Cumulative Layout Shift

Total Blocking Time

Time to First Byte

Monitor trends over time.

---

# Browser Testing

Verify

Chrome

Edge

Firefox

Safari

Desktop

Tablet

Mobile

Avoid browser-specific implementations.

---

# Responsive Testing

Every page should be tested at

```
320

375

390

768

1024

1280

1440

1920
```

Layouts should remain readable at every breakpoint.

---

# Visual Regression Testing

Recommended

Playwright Screenshots

or

Chromatic

Detect

Unexpected spacing

Typography changes

Broken layouts

Missing images

---

# Continuous Integration

Every Pull Request should automatically run

```
Type Checking

↓

Linting

↓

Formatting

↓

Unit Tests

↓

Integration Tests

↓

Accessibility Tests

↓

Build

↓

Deployment Preview
```

Pull requests should not be merged unless all checks pass.

---

# Continuous Deployment

Recommended Platform

Vercel

Deployment Workflow

```
Feature Branch

↓

Pull Request

↓

Preview Deployment

↓

Review

↓

Merge

↓

Production Deployment
```

Every deployment should be traceable.

---

# Git Workflow

Main

Production

Develop

Integration

Feature Branches

```
feature/gallery

feature/search

feature/archive

feature/cms
```

Bug Fixes

```
fix/navigation

fix/image-loading
```

Hotfixes

```
hotfix/security
```

---

# Commit Convention

Recommended

```
feat:

fix:

refactor:

docs:

style:

perf:

test:

chore:
```

Examples

```
feat: add artwork gallery

fix: improve lazy image loading

perf: optimize homepage rendering
```

---

# Code Review Checklist

Every Pull Request should verify

- Readability
- Accessibility
- Responsive Design
- Performance
- SEO
- Type Safety
- Error Handling
- Component Reuse
- Security
- Documentation

Reviewers should reject unnecessary complexity.

---

# Documentation Standards

Every feature should document

Purpose

Responsibilities

Dependencies

Public API

Usage Example

Known Limitations

Future Improvements

Documentation should remain synchronized with the implementation.

---

# Logging Strategy

Development

Console

Production

Sentry

Never log

Passwords

Tokens

Private Keys

Personal Information

Sensitive CMS Data

---

# Error Reporting

Capture

Unhandled Exceptions

Failed API Requests

Failed Image Loading

Rendering Errors

CMS Failures

Search Failures

Critical errors should notify maintainers.

---

# Monitoring

Continuously monitor

Application Health

Build Status

Core Web Vitals

CMS Availability

Image Delivery

Search Availability

Monitoring should detect problems before users report them.

---

# Backup Strategy

Back up

CMS Data

Media Assets

Configuration

Environment Variables

Search Indexes

Backups should be verified regularly.

---

# Disaster Recovery

The system should support

Restore Database

Restore Media

Restore Search

Restore Configuration

Recovery time should be minimized.

---

# Maintenance Strategy

Schedule

Dependency Updates

Security Updates

CMS Updates

Framework Updates

Image Optimization

Performance Reviews

Accessibility Audits

The archive should remain healthy for many years.

---

# Dependency Management

Prefer

Small

Stable

Well Maintained

Open Source

Avoid abandoned libraries.

Review dependencies annually.

---

# Technical Debt

Track

Known Issues

Refactoring Opportunities

Deprecated Code

Performance Improvements

Technical debt should be visible and prioritized.

---

# Release Strategy

Every release should include

Version Number

Release Notes

Migration Notes

Rollback Plan

Breaking Changes

Production Checklist

Never deploy undocumented releases.

---

# Rollback Strategy

Every deployment should support

Immediate Rollback

Database Compatibility

Asset Compatibility

Configuration Recovery

Recovery should not require manual code edits.

---

# Security Review

Review regularly

Dependencies

Environment Variables

Authentication

Authorization

Headers

API Exposure

Rate Limiting

File Uploads

Preview Mode

---

# SEO Review

Verify

Metadata

Canonical URLs

Structured Data

Open Graph

Twitter Cards

Sitemap

Robots

Broken Links

Missing metadata should block publication when possible.

---

# Accessibility Review

Verify

Keyboard Navigation

Contrast

Heading Order

Alt Text

Focus States

ARIA Labels

Screen Reader Compatibility

Accessibility is not optional.

---

# Performance Review

Verify

Bundle Size

Image Optimization

Font Loading

JavaScript Size

Caching

Lazy Loading

Server Rendering

Performance regressions should be addressed before new features.

---

# Production Readiness Checklist

Before launch

```
✓ No TypeScript Errors

✓ No ESLint Errors

✓ All Tests Pass

✓ Accessibility Validated

✓ Performance ≥95

✓ SEO ≥95

✓ Images Optimized

✓ Metadata Generated

✓ Sitemap Available

✓ Robots.txt Generated

✓ Error Monitoring Enabled

✓ Analytics Configured

✓ Backups Verified

✓ Security Headers Enabled

✓ Preview Mode Working

✓ CMS Connected

✓ Search Indexed

✓ Responsive Layout Verified
```

---

# Acceptance Criteria

The project is complete when

The archive can grow indefinitely without architectural changes.

Editors can manage all content independently.

Visitors can navigate naturally through interconnected artworks, journals, archives, and exhibitions.

Performance remains consistently excellent.

Accessibility meets WCAG 2.2 AA.

SEO is automatically generated and maintained.

The codebase remains clean, modular, and understandable.

Every feature is documented.

Every deployment is repeatable.

The system is resilient to failure.

---

# Engineering Principles

Write code that another developer can understand five years from now.

Optimize for maintainability before cleverness.

Prefer explicit solutions over implicit behavior.

Build reusable systems rather than isolated pages.

Every line of code should contribute to the long-term value of the archive.

The software should quietly support the artist's work without becoming the focus itself.
