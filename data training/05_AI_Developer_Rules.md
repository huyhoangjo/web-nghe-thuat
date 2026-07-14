# NGO THI THUY DUYEN

# AI Developer Rules

Version: 1.0

Status: Mandatory

---

# Purpose

This document defines mandatory engineering rules for any AI system contributing to this project.

These rules take precedence over implementation convenience.

The AI should behave like an experienced Senior Software Engineer rather than a code generator.

Every architectural decision must prioritize long-term maintainability.

---

# General Principles

Always optimize for

- Readability
- Simplicity
- Maintainability
- Performance
- Accessibility
- Scalability

Never optimize only for writing fewer lines of code.

Readable code is preferred over clever code.

---

# Primary Objective

The AI should build a production-quality application.

Do not generate demo code.

Do not generate tutorial code.

Do not generate proof-of-concept implementations.

Everything should be production ready.

---

# Thinking Process

Before writing code

The AI must

Understand

↓

Analyze

↓

Design

↓

Implement

↓

Review

↓

Refactor

↓

Validate

Never immediately generate code.

---

# Architecture Rules

Follow

Clean Architecture

SOLID Principles

Composition over Inheritance

Server First

Feature Based Structure

Avoid monolithic components.

---

# Component Rules

Every component must have

One responsibility.

Maximum

300 lines.

Preferred

100–200 lines.

If larger,

split into smaller components.

---

# Page Rules

Pages should

Assemble components.

Pages should not contain

Business Logic

Complex Queries

Data Transformation

Validation

---

# Business Logic

Business logic belongs only inside

Services

Repositories

Utilities

Never inside UI.

---

# Data Layer

Never expose raw CMS data directly.

Always

CMS

↓

Validation

↓

Transformation

↓

Frontend Model

↓

UI

---

# Server Components

Default

Server Component.

Only use

Client Component

when interaction requires it.

Examples

Search

Filters

Gallery Zoom

Theme Switch

Forms

---

# Data Fetching

Preferred order

Server

↓

Cache

↓

ISR

↓

Client Fetch

Never fetch data unnecessarily.

---

# TypeScript Rules

Never use

```
any
```

Never disable

strict mode.

Always define interfaces.

Always type function arguments.

Always type return values.

---

# Naming Rules

Names must describe intent.

Good

```
ArtworkCard

PublicationRepository

formatArtworkDate
```

Bad

```
Card

Data

Helper

Temp

Utils2
```

---

# Folder Rules

Every feature owns

Components

Hooks

Queries

Types

Utilities

Actions

Avoid shared folders becoming dumping grounds.

---

# Styling Rules

Only use

Tailwind CSS.

Never mix

Tailwind

CSS Modules

Styled Components

Inline Styles

Without strong justification.

---

# Accessibility Rules

Every component must support

Keyboard

Screen Reader

Visible Focus

ARIA Labels where needed

Proper Semantic HTML

Accessibility is mandatory.

---

# SEO Rules

Every page requires

Metadata

Canonical URL

Open Graph

Twitter Card

JSON-LD

Never leave metadata empty.

---

# Image Rules

Every image

Lazy Loaded

Responsive

Blur Placeholder

Alt Text

Optimized

Never use raw img tags unless absolutely necessary.

---

# Performance Rules

Prefer

Server Rendering

Streaming

Code Splitting

Dynamic Imports

Avoid unnecessary hydration.

---

# Animation Rules

Only animate

Opacity

Transform

Scale

Never animate layout unnecessarily.

Avoid expensive animations.

---

# Error Handling

Never ignore errors.

Every async operation

must

Handle Failure

Provide Feedback

Log Errors

Recover Gracefully

---

# Logging

Development

Console

Production

Sentry

Never expose

Secrets

Tokens

Personal Information

---

# Security Rules

Never expose

Environment Variables

CMS Tokens

Private APIs

Always validate

Server Input

CMS Data

Form Data

---

# Form Rules

Validate

Client

↓

Server

Never trust browser validation.

---

# Dependency Rules

Before adding any package

Ask

Can native JavaScript solve this?

Avoid unnecessary dependencies.

---

# Code Duplication

If code is duplicated

Three times

Extract

Component

Utility

Hook

Service

Repository

Choose the most appropriate abstraction.

---

# Refactoring Rules

Refactor continuously.

Do not postpone obvious improvements.

Leave the code cleaner than you found it.

---

# Git Rules

Small commits.

Meaningful messages.

One feature per Pull Request.

Never mix unrelated changes.

---

# Documentation Rules

Every exported function

should contain

Purpose

Arguments

Return Value

Usage

Complex logic should explain

Why

not

What.

---

# Code Review Checklist

Before considering work complete

Verify

No duplicated logic

No TypeScript errors

No ESLint warnings

Responsive

Accessible

SEO Complete

Performance Optimized

Reusable Components

No Dead Code

---

# Testing Rules

Write tests for

Utilities

Business Logic

Critical Components

Search

Gallery

CMS Integration

Avoid testing implementation details.

---

# AI Self Review

Before finishing

The AI must ask

Can this component be simplified?

Can this logic be reused?

Is this accessible?

Is this responsive?

Does this follow the architecture?

Would another engineer understand this?

If any answer is No

Refactor first.

---

# AI Forbidden Behaviors

Never

Hardcode data

Duplicate components

Duplicate queries

Duplicate utilities

Use magic numbers

Ignore accessibility

Ignore errors

Ignore loading states

Ignore empty states

Ignore SEO

Ignore performance

Ignore responsiveness

Mix business logic into UI

Use "any"

Commit broken code

Ship placeholder content

Leave TODO comments in production

---

# AI Required Behaviors

Always

Create reusable components

Prefer composition

Use meaningful names

Generate metadata

Optimize images

Generate alt text

Validate data

Handle failures

Document exported APIs

Respect the design system

Respect project architecture

---

# Definition of Done

A task is complete only when

✓ TypeScript passes

✓ ESLint passes

✓ Build succeeds

✓ Responsive verified

✓ Accessibility verified

✓ Performance maintained

✓ SEO generated

✓ Images optimized

✓ Metadata complete

✓ Loading states exist

✓ Empty states exist

✓ Error states exist

✓ Components documented

✓ Code reviewed

✓ No unnecessary dependencies

✓ No duplicated logic

---

# AI Final Checklist

Before ending the implementation

Confirm

Architecture respected

Folder structure respected

Server Components preferred

Client Components minimized

CMS isolated

Queries optimized

Caching enabled

SEO complete

Accessibility complete

Performance optimized

Animations subtle

Code reusable

Code documented

No hidden technical debt

---

# Final Principle

The AI is not writing code.

The AI is building a system that should remain maintainable for many years.

Every implementation should respect the artist, the archive, future contributors, and future technologies.

When uncertain,

choose the solution that is simpler, clearer, and easier to maintain.

The highest quality software is software that quietly supports the artwork without drawing attention to itself.
