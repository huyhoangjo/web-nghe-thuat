# NGO THI THUY DUYEN

# UI / UX Design System

Version: 1.0

Status: Master Specification

---

# Purpose

This document defines the complete visual language of the Living Artistic Archive.

Every page, component, interaction, animation, and layout should follow these rules.

The goal is to create a timeless visual system that remains elegant, maintainable, and scalable.

The interface should disappear behind the artworks.

Technology should never become the visual focus.

---

# Design Philosophy

The design language should communicate

- Stillness
- Silence
- Memory
- Time
- Transformation
- Craftsmanship
- Materiality
- Editorial elegance

Every interface element should support these ideas.

Nothing should exist only because it looks attractive.

Every visual decision should have purpose.

---

# Design Principles

## Principle 1

Content comes before interface.

Artwork is always the primary visual element.

---

## Principle 2

Whitespace is an active design element.

Empty space creates rhythm.

Do not attempt to fill every area.

---

## Principle 3

Typography is part of the artwork.

Text should feel like museum publications.

Never use decorative typography.

---

## Principle 4

Movement should feel natural.

Animations exist only to improve understanding.

Never animate for entertainment.

---

## Principle 5

Consistency creates trust.

Spacing, typography and rhythm should remain predictable throughout the archive.

---

# Design Keywords

The visual identity should feel

Quiet

Elegant

Editorial

Museum Quality

Slow

Refined

Timeless

Human

Material

Organic

Never

Corporate

Trendy

Flashy

Playful

Aggressive

Commercial

---

# Visual Language

The archive should resemble

- Museum catalogues
- Artist monographs
- Academic publications
- Exhibition books
- Contemporary editorial websites

Avoid

- Startup landing pages
- SaaS dashboards
- Magazine layouts
- E-commerce websites
- Social media aesthetics

---

# Color Philosophy

Color should never compete with artworks.

The interface should behave like gallery walls.

Neutral tones create visual silence.

Accent colors should be rare.

---

# Color Tokens

## Background

Primary Background

```
#F8F7F4
```

Secondary Background

```
#F2F1ED
```

Surface

```
#FFFFFF
```

Muted Surface

```
#EFEDE8
```

---

## Text

Primary

```
#1C1C1C
```

Secondary

```
#505050
```

Muted

```
#7A7A7A
```

Disabled

```
#A6A6A6
```

---

## Border

Light

```
#E5E5E5
```

Medium

```
#D5D5D5
```

Strong

```
#BEBEBE
```

---

## Accent

Accent colors should be derived from natural materials.

Examples

Clay

Stone

Paper

Charcoal

Earth

Linen

Never use saturated colors as interface accents.

---

# Dark Mode

Dark mode is optional.

If implemented,

it should resemble

- museum lighting
- black gallery walls
- printed photography books

Background

```
#111111
```

Surface

```
#181818
```

Text

```
#F3F3F3
```

Avoid pure black.

---

# Typography System

Typography is the foundation of the visual identity.

Use no more than two font families.

---

# Primary Typeface

Preferred

Canela

Alternative

Cormorant Garamond

Fallback

EB Garamond

Used for

- Titles
- Hero Statements
- Exhibition Names
- Quotes

---

# Secondary Typeface

Preferred

Neue Haas Grotesk

Alternatives

Inter

Suisse International

Used for

- Navigation
- Paragraphs
- Metadata
- Captions
- Forms

---

# Font Scale

Display XL

72px

Display L

56px

Display M

48px

Heading 1

40px

Heading 2

32px

Heading 3

28px

Heading 4

24px

Heading 5

20px

Body Large

18px

Body

16px

Caption

14px

Metadata

12px

Never introduce arbitrary font sizes.

---

# Line Height

Display

110%

Heading

120%

Body

165%

Caption

150%

Generous line height improves readability.

---

# Letter Spacing

Display

-2%

Headings

-1%

Body

0%

Captions

2%

Metadata

4%

---

# Font Weight

300

Light

400

Regular

500

Medium

600

SemiBold

Avoid Heavy or Black weights.

---

# Spacing System

Use an 8-point spacing system.

Base Unit

```
8px
```

Available spacing values

```
4

8

12

16

24

32

40

48

64

80

96

128

160
```

Never use random spacing values.

---

# Border Radius

Small

4px

Medium

8px

Large

16px

Extra Large

24px

Images should normally have

0px radius

or

8px maximum.

Rounded images should never feel playful.

---

# Shadows

Shadows should be subtle.

Prefer elevation through whitespace.

Shadow Small

```
0 2px 8px rgba(0,0,0,.05)
```

Shadow Medium

```
0 6px 24px rgba(0,0,0,.08)
```

Avoid dramatic shadows.

---

# Grid System

Desktop

12 Columns

Tablet

8 Columns

Mobile

4 Columns

Content should align consistently.

Avoid arbitrary positioning.

---

# Maximum Width

Reading Content

760px

Editorial Layout

960px

Gallery

1440px

Hero

1600px

Full Width

1920px

Long text should never exceed comfortable reading width.

---

# Responsive Breakpoints

Mobile

0–767px

Tablet

768–1023px

Laptop

1024–1439px

Desktop

1440–1919px

Large Desktop

1920px+

Layouts should adapt gracefully.

---

# Layout Rhythm

Vertical rhythm should remain consistent.

Every section should breathe.

Never stack content too closely.

Large visual pauses are encouraged.

---

# Content Width Rules

Journal articles

Maximum

760px

Artwork descriptions

720px

Metadata

560px

Gallery

Full width

Navigation

1200px

Footer

1200px

These limits preserve readability.

---

# Whitespace Strategy

Whitespace is intentional.

It creates

- rhythm
- focus
- silence
- contemplation

Never reduce whitespace to fit more content.

The archive should prioritize quality of reading over quantity of information.

---

# Design Tokens

All colors

Typography

Spacing

Border Radius

Shadows

Breakpoints

Z-index

Animation Duration

Opacity

should be stored as reusable design tokens.

No component should hardcode visual values.

---

# Theme Architecture

The design system should support future themes without changing components.

Possible future themes

- Museum
- Dark Exhibition
- Publication
- Archive Print

Themes should inherit the same design tokens wherever possible
---

# Component Library

Every component should be reusable.

Components should never contain page-specific logic.

Each component must be composable, maintainable, and accessible.

Avoid creating one-off components whenever possible.

---

# Component Hierarchy

The design system is organized into four levels.

```
Design Tokens

↓

Primitive Components

↓

Composite Components

↓

Page Templates
```

---

# Primitive Components

Primitive components include

- Button
- Link
- Typography
- Divider
- Icon
- Badge
- Avatar
- Tag
- Image
- Container
- Section

These should never contain business logic.

---

# Composite Components

Composite components include

- Navigation
- Hero
- Artwork Card
- Journal Card
- Gallery
- Timeline
- Footer
- Search
- Filters
- Pagination
- Breadcrumb

Composite components are built using primitives.

---

# Page Templates

Templates include

```
Homepage

Artwork Page

Journal Page

Publication

Archive

Travel

About

CV

Contact
```

Templates should only arrange components.

Business logic belongs elsewhere.

---

# Navigation

Navigation should remain minimal.

Maximum

7 primary items.

Desktop

Horizontal.

Mobile

Fullscreen overlay.

Avoid dropdown menus unless necessary.

---

# Navigation Behaviour

Navigation should

Remain visible while scrolling upward.

Hide during downward scrolling.

Fade smoothly.

Never jump abruptly.

---

# Hero Component

Purpose

Create an emotional first impression.

Contains

- Hero artwork
- Intro statement
- Optional subtitle
- Scroll indicator

Avoid large blocks of text.

Hero should occupy approximately

80–100vh.

---

# Hero Typography

Maximum width

700px.

Maximum

4 lines.

Avoid paragraphs.

Statements should feel poetic.

---

# Artwork Card

Purpose

Represent an artwork consistently.

Contains

```
Thumbnail

Title

Year

Medium

Optional Series
```

Hover interaction

- Slight image scale
- Gentle fade
- Cursor change

No dramatic movement.

---

# Artwork Grid

Desktop

3–4 columns.

Tablet

2 columns.

Mobile

1 column.

Spacing should remain generous.

Avoid dense layouts.

---

# Artwork Detail Page

Should include

```
Hero Image

Gallery

Artwork Information

Description

Materials

Dimensions

Related Journal

Related Archive

Related Exhibition

Related Works
```

Artwork image should always dominate the page.

---

# Gallery Component

Support

```
Grid

Masonry

Editorial

Fullscreen

Carousel
```

Gallery should never crop important artwork.

---

# Masonry Gallery

Images keep original aspect ratio.

No forced cropping.

Whitespace between images

24–32px.

Avoid Pinterest-like density.

---

# Fullscreen Viewer

Support

- Zoom
- Keyboard navigation
- Swipe
- Captions
- Image counter

Background should fade to black.

Viewer should remain distraction-free.

---

# Lightbox

Requirements

- ESC to close
- Arrow navigation
- Touch gestures
- Pinch zoom
- Caption
- Metadata

Never open in a new browser tab.

---

# Journal Card

Contains

```
Image

Title

Excerpt

Date

Reading Time
```

Cards should encourage reading.

Avoid excessive metadata.

---

# Journal Layout

Reading width

760px.

Large typography.

Generous spacing.

Images should interrupt rhythm naturally.

---

# Publication Card

Contains

```
Cover

Title

Publisher

Year

Button

Download

Preview
```

Support external purchase links if needed.

---

# Archive Card

Contains

```
Thumbnail

Title

Type

Year

Related Artwork
```

Archive cards should feel documentary rather than commercial.

---

# Timeline Component

Used in

- CV
- Biography
- Exhibitions

Desktop

Vertical timeline.

Mobile

Stacked cards.

Timeline should support filtering.

---

# Exhibition Card

Contains

```
Hero Image

Title

Venue

City

Country

Dates

Participating Works
```

Installation photographs should be emphasized.

---

# Search Component

Always visible on desktop.

Accessible from navigation on mobile.

Support

- Instant search
- Keyboard shortcuts
- Highlight matching text
- Suggestions

---

# Search Results

Display

```
Image

Title

Type

Short Description

Related Collection
```

Search should prioritize relevance.

---

# Filter Component

Support

```
Theme

Medium

Year

Country

Language

Series

Publication
```

Multiple filters should combine.

---

# Tag Component

Tags should be subtle.

Never dominate the interface.

Maximum

10 visible tags.

---

# Breadcrumb

Display content hierarchy.

Example

```
Home

/

Works

/

Fragile Bodies

/

Untitled No.3
```

Keep breadcrumbs minimal.

---

# Language Switcher

Support

English

Vietnamese

Future languages

Display language names instead of flags.

---

# Pagination

Preferred

Load More

Alternative

Infinite Scroll

Avoid traditional numbered pagination where possible.

---

# Footer

Contains

```
Contact

Social Links

Copyright

Navigation

Newsletter (Optional)
```

Footer should remain visually quiet.

---

# Contact Section

Simple layout.

Include

- Email
- Instagram
- Studio Location (optional)

Avoid unnecessary contact forms.

---

# Empty State

When no content exists,

display

- Helpful message
- Suggested navigation
- Related content

Avoid blank pages.

---

# Loading State

Use skeleton loaders.

Avoid spinners whenever possible.

Loading should preserve page layout.

---

# Error State

Provide

- Friendly explanation
- Retry action
- Return Home

Never expose technical errors.

---

# Image Component

Every image should support

- Lazy Loading
- Responsive Sizes
- Blur Placeholder
- Caption
- Alt Text
- Lightbox
- Zoom

Use Next.js Image component.

---

# Video Component

Support

- MP4
- Vimeo
- YouTube

Videos should never autoplay with sound.

---

# Audio Component

Support

- Interviews
- Artist Talks
- Ambient Recordings

Provide transcripts whenever available.

---

# PDF Viewer

Support

- Embedded Preview
- Download
- Fullscreen

Maintain accessibility.

---

# Forms

Only use forms where necessary.

Fields

- Name
- Email
- Message

Validation should occur in real time.

---

# Buttons

Primary

Filled.

Secondary

Outlined.

Text Button

Minimal.

Avoid excessive button styles.

---

# Icons

Use only one icon family.

Preferred

Lucide Icons.

Icons should support meaning,

never decoration.

---

# Dividers

Use whitespace before adding dividers.

If necessary,

dividers should be extremely subtle.

---

# Responsive Behaviour

Every component should define

Desktop

Tablet

Mobile

behaviour independently.

Avoid hiding important content.

---

# Component Naming Convention

Use PascalCase.

Examples

```
Hero

ArtworkCard

JournalCard

Gallery

Lightbox

Timeline

SearchBar

FilterPanel

PublicationCard

Footer
```

Avoid vague names.

---

# Component Documentation

Each reusable component should include

Purpose

Props

Variants

Accessibility Notes

Responsive Behaviour

Usage Examples

Performance Considerations

Every component should be documented before implementation
---

# Motion Design Philosophy

Motion should communicate meaning.

Animation is not decoration.

Every animation should help visitors understand

- hierarchy
- relationships
- transitions
- focus
- continuity

If an animation does not improve understanding,
it should not exist.

---

# Motion Principles

Motion should feel

- Calm
- Slow
- Elegant
- Organic
- Natural
- Quiet

Avoid

- Bounce
- Elastic effects
- Flashing
- Rotating elements
- Large movements
- Excessive parallax

The archive should never feel playful.

---

# Animation Timing

Micro Interaction

150–250ms

Small Transition

250–350ms

Page Transition

400–700ms

Gallery Transition

500–800ms

Fullscreen Viewer

600–900ms

Avoid animations longer than one second.

---

# Animation Easing

Preferred

ease-in-out

ease-out

Custom cubic bezier

```
cubic-bezier(0.4,0,0.2,1)
```

Avoid

Bounce

Elastic

Spring effects with high overshoot

---

# Page Transition

When navigating pages

Old page

↓

Fade Out

↓

New page

↓

Fade In

Optional

Very small upward movement

Maximum

12px

---

# Hero Animation

Hero artwork should

Fade in

↓

Image reveal

↓

Headline appears

↓

Subtitle appears

↓

Scroll indicator appears

The sequence should feel effortless.

---

# Scroll Behaviour

Scrolling should feel smooth.

Never hijack browser scrolling.

Native scrolling is preferred.

Avoid full-page scrolling libraries.

---

# Scroll Reveal

Content should animate only once.

Recommended

- Fade
- Slight upward movement
- Opacity transition

Maximum movement

24px

---

# Image Reveal

Images should appear naturally.

Recommended

Opacity

↓

Mask reveal

↓

Slight scale

Avoid dramatic zoom effects.

---

# Hover Behaviour

Hover should indicate interaction.

Examples

- Slight opacity change
- Small image scale
- Underline links
- Cursor feedback

Avoid exaggerated motion.

---

# Navigation Behaviour

Desktop

Navigation hides while scrolling down.

Navigation returns while scrolling up.

Transition

250ms

---

# Reading Experience

Reading should never be interrupted.

Avoid

Popups

Sticky advertisements

Auto-playing media

Chat widgets covering content

Reading rhythm should remain uninterrupted.

---

# Gallery Behaviour

Click image

↓

Open fullscreen

↓

Background fades

↓

Image expands

↓

Caption appears

Users should navigate using

- Keyboard
- Mouse
- Touch

---

# Lightbox Behaviour

Support

ESC

Arrow Keys

Swipe

Pinch Zoom

Double Tap Zoom

Captions

Image Counter

Never reload images unnecessarily.

---

# Mobile Gestures

Support

Swipe

Pinch

Double Tap

Long Press (optional)

Avoid hidden gestures required for navigation.

---

# Focus Management

Keyboard focus should always remain visible.

Never remove focus outlines.

Provide custom focus styles where appropriate.

---

# Accessibility

The archive must comply with

WCAG 2.2 AA

Minimum.

---

# Accessibility Principles

The interface should be usable

without

- Mouse
- Touch
- Vision
- Hearing

Where possible.

---

# Semantic HTML

Use proper HTML elements.

Examples

```
header

main

section

article

nav

footer

figure

figcaption

button

form
```

Avoid unnecessary div elements.

---

# Heading Structure

Each page

One H1

Multiple H2

Nested H3

Never skip heading levels.

---

# Alt Text

Every image requires

Meaningful alt text.

Artwork images

Describe artwork.

Decorative images

Use empty alt.

Never repeat filenames.

---

# Keyboard Navigation

Every interactive element must support

Tab

Shift + Tab

Enter

Space

Escape

Arrow Keys (where applicable)

---

# Contrast

Minimum

4.5 : 1

Large Text

3 : 1

Avoid low contrast typography.

---

# Forms

Every input should include

Label

Error Message

Helper Text

Accessible Validation

---

# Responsive Images

Every image should provide

```
320

640

768

1024

1280

1600

1920
```

sizes.

Use srcset automatically.

---

# Image Composition Rules

Never crop artwork aggressively.

Maintain original aspect ratio.

Landscape works remain landscape.

Portrait works remain portrait.

Square works remain square.

Respect the artist's composition.

---

# Gallery Rules

Avoid uniform cropping.

Gallery should celebrate differences in size.

White space is preferable to forced alignment.

---

# Editorial Typography

Paragraph width

Maximum

760px

Line Length

60–75 characters

Avoid extremely long text lines.

---

# Mobile Experience

Prioritize

Reading

Viewing artwork

Navigation

Performance

Desktop features should degrade gracefully.

---

# Tablet Experience

Tablet layouts should not simply scale desktop.

Adjust spacing.

Increase touch targets.

Improve readability.

---

# Touch Targets

Minimum

44px × 44px

Interactive elements should remain easy to activate.

---

# Performance Budget

Largest Contentful Paint

< 2.5s

Interaction to Next Paint

< 200ms

Cumulative Layout Shift

< 0.1

First Contentful Paint

< 1.8s

---

# Image Performance

Always

Lazy Load

Responsive Images

Blur Placeholder

Next/Image

AVIF

WebP

CDN

---

# Font Performance

Host fonts locally.

Preload primary fonts.

Limit font weights.

Avoid loading unused fonts.

---

# JavaScript Performance

Ship minimal JavaScript.

Prefer

Server Components.

Hydrate only interactive components.

Avoid unnecessary client rendering.

---

# CSS Performance

Tailwind CSS

Purge unused styles.

Avoid duplicated utility classes.

---

# Accessibility Testing

Validate using

Lighthouse

axe DevTools

Keyboard Navigation

Screen Reader Testing

Color Contrast Analyzer

---

# Browser Support

Latest

Chrome

Edge

Firefox

Safari

Graceful degradation for older browsers.

---

# UX Acceptance Criteria

The design is considered successful when

Visitors immediately understand the artistic atmosphere.

Artwork remains the primary focus.

Navigation feels effortless.

Reading feels comfortable.

Images load smoothly.

Animations never distract.

The interface remains invisible behind the content.

The website feels timeless.

The archive supports growth without redesign.

Every page communicates calmness, clarity, and contemplation.

---

# Lighthouse Targets

Performance

95+

Accessibility

95+

Best Practices

95+

SEO

95+

---

# Final Design Principle

The archive should never feel finished.

Like the artist's practice,
it should continue evolving.

Every new artwork,

every journey,

every notebook,

every exhibition,

every publication,

should integrate naturally into the archive without changing its identity.

Technology should quietly support this evolution.

The greatest compliment to the design is that visitors remember the artworks—not the interface.
