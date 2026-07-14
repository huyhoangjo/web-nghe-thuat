# NGO THI THUY DUYEN

# Content Architecture

Version: 1.0

Status: Master Specification

---

# Purpose

This document defines how every piece of information should be organized, connected, migrated, searched, and maintained throughout the lifetime of the archive.

Unlike a traditional CMS where pages exist independently, this archive is built around relationships.

Every artwork, journal, exhibition, travel note, publication, and archival document should be interconnected.

The archive should behave like an evolving knowledge graph rather than a collection of webpages.

---

# Core Principles

The content architecture should satisfy the following principles.

## Living Archive

The archive is never complete.

New content must integrate naturally without restructuring the existing system.

---

## Relationship First

Connections between content are more important than folders.

For example:

Artwork

↓

Sketch

↓

Journal Entry

↓

Travel Note

↓

Exhibition

↓

Publication

↓

Interview

The visitor should naturally move between related content.

---

## Evergreen Structure

The architecture should remain stable for decades.

New categories may appear without breaking URLs or requiring redesign.

---

## Content Before Presentation

Content should remain independent from visual design.

The same content should support:

- Website
- Mobile
- PDF publication
- Exhibition kiosk
- Future applications
- API access

---

# Information Architecture

The archive consists of the following primary collections.

```
Homepage

About

Works

Journal

Field Notes

Archive

Publications

Exhibitions

CV

Contact
```

Each collection represents a content type rather than a page.

---

# Primary Content Collections

## Homepage

Purpose

Introduce the artistic archive.

Contains

- Hero artwork
- Featured works
- Featured journal entries
- Current exhibition
- Recent publications
- Introductory statement

Homepage content should remain editable through the CMS.

---

## Artist

Contains permanent information.

Fields

- Name
- Biography
- Portrait
- Statement
- Practice
- Education
- Location
- Languages
- Contact

Normally only one Artist document exists.

---

## Artwork

This is the primary collection.

Every artwork is an independent object.

An artwork should never exist only as an image.

It should contain complete historical information.

---

## Journal

Personal writings.

Research.

Memory fragments.

Poetry.

Studio reflections.

These are not blog posts.

They are part of the artistic practice.

---

## Field Notes

Field Notes document observations made outside the studio.

Possible subjects

- Travel
- Museums
- Architecture
- Landscapes
- Conversations
- Materials
- Languages
- Objects
- Everyday life

---

## Archive

Historical documentation.

Examples

- Sketchbooks
- Invitations
- Posters
- Installation photographs
- Studio process
- Drafts
- Working documents
- Handwritten notes

---

## Publications

Published material.

Examples

- Exhibition catalogue
- Books
- Essays
- Interviews
- Academic articles
- PDFs

---

## Exhibitions

Every exhibition should become an independent content object.

Contains

- Venue
- City
- Country
- Curator
- Dates
- Participating works
- Installation photographs
- Press coverage

---

## CV

Professional timeline.

Contains

- Exhibitions
- Residencies
- Talks
- Workshops
- Awards
- Publications

The timeline should be automatically generated whenever possible.

---

# URL Structure

The archive should use permanent URLs.

Examples

```
/

about

works

works/{slug}

journal

journal/{slug}

field-notes

field-notes/{slug}

archive

archive/{slug}

publications

publications/{slug}

exhibitions

exhibitions/{slug}

cv

contact
```

URLs must never contain IDs.

Always use readable slugs.

---

# Slug Rules

Every content item requires a unique slug.

Examples

```
fragile-bodies

the-origin-of-no-self

departure

studio-notes-seoul

taipei-morning-light

memory-fragment-014
```

Rules

- lowercase only
- hyphen separated
- no spaces
- no accented characters
- immutable after publication whenever possible

---

# Taxonomy

The archive should avoid rigid categories.

Instead use flexible tagging.

Primary Taxonomies

```
Theme

Medium

Location

Country

Language

Material

Exhibition

Publication

Series

Travel

Research
```

Each content item may belong to multiple taxonomies.

---

# Themes

Examples

- Memory

- Identity

- Migration

- Healing

- Transformation

- Consciousness

- Motherhood

- Impermanence

- Fragility

- Landscape

- Language

Themes should remain reusable.

---

# Medium

Examples

Painting

Installation

Performance

Drawing

Photography

Video

Mixed Media

Paper

Textile

Sound

Digital

---

# Materials

Examples

Oil

Acrylic

Dó Paper

Ink

Thread

Fabric

Wood

Metal

Found Objects

Natural Pigments

Material information should remain searchable.

---

# Geographic Metadata

Every location should contain

City

Region

Country

Latitude (optional)

Longitude (optional)

Venue (optional)

Locations should never exist as free text.

Reuse existing location objects whenever possible.

---

# Language Metadata

Supported languages

English

Vietnamese

Turkish

Korean

Chinese

Other languages may be added later.

Every content item should specify its original language.

---

# Content Status

Every document should contain a publication status.

```
Draft

Review

Scheduled

Published

Archived
```

Only published content should appear publicly.

---

# Content Ownership

Every document should contain

Author

Editor

Created Date

Updated Date

Publication Date

Original Source

Migration Source

Import Version

This information should remain invisible to visitors but available inside the CMS.

---

# Content Hierarchy

The archive should follow this hierarchy.

```
Artist

↓

Works

↓

Series

↓

Artwork

↓

Related Materials

↓

Journal

↓

Archive

↓

Publication

↓

Exhibition
```

Navigation should follow relationships rather than hierarchy whenever possible.

---

# Collection Relationships

An Artwork may belong to

- multiple exhibitions
- multiple publications
- one or more series
- many journal entries
- many archive records
- many travel notes

A Journal Entry may relate to

- several artworks
- one exhibition
- multiple field notes
- one publication

An Exhibition may contain

- multiple artworks
- multiple publications
- many installation photographs
- press documentation
- archival records

Relationships should always be bidirectional whenever supported by the CMS.

---

# Content Growth Strategy

The archive is expected to grow continuously.

The architecture should comfortably support

- 10,000+ images
- 2,000+ journal entries
- hundreds of artworks
- decades of exhibitions
- multilingual content
- future media types

No redesign should be required as the archive expands.

---

# Architectural Principle

Every document should answer one question:

"What relationship does this create?"

If a content item exists without meaningful connections to the rest of the archive, its purpose should be reconsidered.

The archive should grow as an interconnected ecosystem rather than a collection of isolated pages
---

# CMS Architecture

The archive shall use a Headless CMS.

Preferred platform:

- Sanity CMS

Alternative platforms:

- Strapi
- Contentful
- Payload CMS

The CMS should separate content from presentation.

No visual styling should be stored inside the CMS.

The CMS should only contain structured content.

---

# Document Types

The archive consists of the following document types.

```
Artist

Artwork

Series

Journal

Field Note

Archive Item

Publication

Exhibition

Travel

CV Item

Homepage

Site Settings

Navigation

SEO Defaults

Location

Tag

Medium

Material
```

Each document type should be independently editable.

---

# Artist Schema

Purpose

Stores permanent information about the artist.

Fields

```
id

name

slug

portrait

shortBiography

fullBiography

artistStatement

practice

education

nationality

currentLocation

languages

website

instagram

email

seo

createdAt

updatedAt
```

There should normally be only one Artist document.

---

# Artwork Schema

This is the most important document type.

Fields

```
id

title

subtitle

slug

series

status

year

startDate

completionDate

medium

materials

dimensions

weight

edition

description

artistStatement

heroImage

gallery

thumbnail

location

country

coordinates

tags

themes

journalEntries

fieldNotes

archiveItems

publications

exhibitions

relatedWorks

seo

featured

draft

createdAt

updatedAt

publishedAt
```

---

# Artwork Gallery

Gallery should support

```
Unlimited Images

Captions

Alt Text

Image Credits

Sort Order

Lightbox Version

Thumbnail Version

High Resolution Version

Zoom Support
```

Each image should be independently editable.

---

# Journal Schema

Fields

```
id

title

slug

excerpt

content

language

featuredImage

gallery

themes

relatedWorks

relatedTravel

relatedArchive

relatedPublication

location

country

date

seo

featured

createdAt

updatedAt
```

Journal entries should support rich text.

Markdown should also be supported.

---

# Field Note Schema

Fields

```
id

title

slug

date

city

country

observation

images

audio

video

relatedArtwork

relatedJournal

relatedTravel

tags

seo
```

Field Notes are observational rather than narrative.

---

# Archive Item Schema

Fields

```
id

title

slug

type

description

date

images

documents

source

copyright

relatedArtwork

relatedJournal

relatedPublication

relatedExhibition

seo
```

Possible Archive Types

```
Sketch

Invitation

Poster

Installation

Notebook

Studio

Letter

Photograph

Document

Workshop

Research
```

---

# Publication Schema

Fields

```
id

title

slug

authors

publisher

publicationDate

isbn

language

cover

pdf

externalLink

summary

relatedArtwork

relatedExhibition

relatedJournal

seo
```

Publications should support PDF preview.

---

# Exhibition Schema

Fields

```
id

title

slug

venue

city

country

startDate

endDate

curator

description

featuredImage

installationPhotos

participatingWorks

publications

pressCoverage

relatedArchive

seo
```

---

# Travel Schema

Purpose

Travel experiences influencing artistic practice.

Fields

```
id

title

slug

country

city

arrivalDate

departureDate

description

gallery

journalEntries

artworks

fieldNotes

publications

seo
```

Travel should connect to artistic development.

---

# CV Item Schema

Fields

```
id

title

category

organization

city

country

startDate

endDate

description

relatedExhibition

relatedPublication

relatedArtwork

```

Categories

```
Exhibition

Residency

Award

Workshop

Talk

Publication

Teaching

Collection

```

---

# Homepage Schema

Editable homepage content.

Fields

```
heroArtwork

heroStatement

featuredWorks

featuredJournal

featuredPublication

featuredExhibition

featuredArchive

seo
```

No homepage content should be hardcoded.

---

# Navigation Schema

Fields

```
Main Navigation

Footer Navigation

Social Links

Language Switch

Footer Text

Legal Links
```

Navigation should be editable without code changes.

---

# Site Settings

Fields

```
Site Title

Site Description

Default Language

Available Languages

Contact Email

Social Media

Analytics

Copyright

SEO Defaults

OpenGraph Defaults
```

---

# Metadata Standards

Every document should include

```
Unique ID

Slug

Title

Description

Language

Created Date

Updated Date

Published Date

Author

Editor

Status

Featured

SEO Metadata

Open Graph Image

Canonical URL

Reading Time

Estimated Word Count
```

Metadata should never be duplicated.

---

# SEO Metadata

Every document supports

```
SEO Title

SEO Description

Canonical URL

Robots

Keywords

Open Graph

Twitter Card

JSON-LD

Schema Type

Preview Image
```

If left empty,

the system should generate intelligent defaults.

---

# Relationship Rules

Relationships should never exist in only one direction.

Example

Artwork A

↓

Journal B

Journal B should automatically know

↓

Related Artwork A

---

# Relationship Types

Supported relationships

```
One to One

One to Many

Many to Many

Self Reference

Hierarchical
```

---

# Relationship Matrix

```
Artwork

↔ Journal

Artwork

↔ Archive

Artwork

↔ Publication

Artwork

↔ Exhibition

Artwork

↔ Travel

Artwork

↔ Series

Journal

↔ Travel

Journal

↔ Archive

Journal

↔ Publication

Travel

↔ Field Notes

Travel

↔ Artwork

Exhibition

↔ Publication

Publication

↔ Archive
```

Relationships should remain editable inside the CMS.

---

# AI Classification

Imported content should be analyzed automatically.

Possible classifications

```
Artwork

Essay

Poem

Travel

Research

Interview

Publication

Studio Process

Memory Fragment

Historical Document
```

A document may receive multiple classifications.

---

# Tagging Strategy

Avoid excessive tags.

Recommended

3–10 tags per document.

Preferred tags

```
Memory

Identity

Healing

Migration

Landscape

Motherhood

Body

Time

Paper

Thread

Silence

Transformation
```

Tags should be reusable.

Never create duplicate spellings.

---

# Search Architecture

Search should index

```
Title

Subtitle

Description

Body

Tags

Themes

Country

City

Medium

Material

Publication

Exhibition

Year

Language
```

Search results should prioritize relevance over publication date.

---

# Search Filters

Users should filter by

```
Year

Country

Theme

Medium

Material

Language

Publication

Exhibition

Series
```

Multiple filters should work together.

---

# Content Indexing

Every document should generate

```
Search Index

SEO Metadata

RSS Metadata

Open Graph Metadata

JSON-LD Metadata

Internal Relationship Index
```

All indexes should update automatically after publishing.

---

# Version Control

The CMS should preserve

```
Draft

Published

Archived

Previous Versions

Restore History

Editorial Notes
```

Content editors should be able to restore previous versions without developer assistance
---

# Blogger Migration Strategy

The existing Blogger website is the historical source of truth.

Source

<https://ngothithuyduyen.blogspot.com>

The migration process should preserve historical value while restructuring the content into a modern archive.

The objective is not to duplicate Blogger.

The objective is to reinterpret the content within a museum-quality digital archive.

---

# Migration Principles

Always preserve

- Original publication date
- Original image quality
- Original captions
- Original language
- Historical context
- Internal relationships

Never preserve

- Blogger layout
- Blogger widgets
- HTML styling
- Inline CSS
- Deprecated formatting
- Advertising code

---

# Migration Pipeline

The migration process should follow this sequence.

```
Discover

↓

Crawl

↓

Extract

↓

Normalize

↓

Clean

↓

Classify

↓

Generate Metadata

↓

Create Relationships

↓

Optimize Images

↓

Generate Slugs

↓

Import into CMS

↓

Validate

↓

Publish
```

Each step should be repeatable.

Migration should be idempotent whenever possible.

---

# Crawl Scope

Automatically crawl

- Every public article
- Every archive page
- Every label page
- Every static page
- Every image
- Every embedded PDF
- Every embedded video
- Internal links
- Pagination
- RSS feed (if available)

Ignore

- Search pages
- Feed duplicates
- Widgets
- External advertisements
- Analytics scripts

---

# Content Extraction

Extract the following information whenever available.

```
Title

Subtitle

Publication Date

Author

Content

Images

Captions

Embedded Media

Attachments

Location

Country

Language

Labels

Internal Links

External References
```

Retain as much semantic information as possible.

---

# HTML Cleaning

Remove

- Inline styles
- Deprecated HTML
- Empty paragraphs
- Font tags
- Spacer images
- Multiple consecutive line breaks
- Tracking parameters
- Blogger-specific classes

Convert

- Strong emphasis
- Lists
- Quotes
- Tables
- Headings
- Figures

into semantic HTML or Portable Text.

---

# Markdown Conversion

Content should be convertible into

- Portable Text
- Markdown
- Rich Text

without losing structure.

Preserve

- Headings
- Lists
- Quotes
- Links
- Images
- Tables
- Footnotes

---

# Image Processing Pipeline

Every imported image should generate multiple versions.

```
Original

↓

Master Copy

↓

Hero Image

↓

Gallery Image

↓

Thumbnail

↓

Lightbox Version

↓

Open Graph Version
```

---

# Image Optimization

Automatically generate

- AVIF
- WebP
- JPEG fallback

Generate responsive sizes

```
320

640

768

1024

1280

1600

1920

2560
```

Images should be optimized without visible quality loss.

---

# Image Metadata

Every image should contain

```
Original Filename

Caption

Alt Text

Copyright

Photographer

Location

Date

Dimensions

Aspect Ratio

Dominant Color
```

If Alt Text is missing,

generate an AI-assisted draft for editorial review.

---

# Duplicate Detection

Avoid importing duplicate content.

Compare

- Image hash
- File name
- Title similarity
- Publication date
- Body similarity

Duplicates should be flagged for manual review.

Never silently delete potential duplicates.

---

# AI Content Classification

Every imported document should be analyzed automatically.

Possible classifications

```
Artwork

Series

Exhibition

Travel

Research

Interview

Essay

Publication

Poem

Memory Fragment

Workshop

Studio Note

Historical Document
```

Documents may receive multiple classifications.

---

# AI Relationship Discovery

Automatically identify possible relationships.

Examples

```
Artwork

↓

Mentioned Exhibition

↓

Create Relationship

Artwork

↓

Country Mentioned

↓

Create Travel Reference

Journal

↓

Artwork Mentioned

↓

Link Automatically

Publication

↓

Referenced Artwork

↓

Create Bidirectional Link
```

Relationships generated by AI should be reviewable before publication.

---

# Metadata Enrichment

Generate additional metadata when possible.

```
Estimated Reading Time

Dominant Themes

Keywords

Named Locations

Named People

Referenced Materials

Referenced Countries

Referenced Mediums

Referenced Publications
```

Automatically generated metadata should be editable.

---

# URL Preservation

If possible,

retain the historical Blogger permalink structure through redirects.

Example

```
Old URL

blogspot.com/2021/05/example.html

↓

New URL

works/example
```

Every old URL should redirect with HTTP 301.

Broken links should be avoided.

---

# Internal Link Migration

Whenever imported content references another Blogger article,

replace the original Blogger URL with the new internal URL after migration.

No internal links should continue pointing to Blogger.

---

# Content Lifecycle

Every document should move through a defined lifecycle.

```
Imported

↓

Draft

↓

Editorial Review

↓

Published

↓

Archived
```

Archived documents remain searchable inside the CMS.

---

# Editorial Workflow

Editors should be able to

- Edit imported content
- Replace images
- Correct metadata
- Update relationships
- Publish revisions
- Restore previous versions

No developer intervention should be required.

---

# Quality Assurance

Every imported document should pass validation.

Required fields

```
Title

Slug

Publication Date

Language

Status
```

Recommended fields

```
Description

Hero Image

SEO Metadata

Tags

Related Content
```

Validation errors should be reported before publishing.

---

# Search Quality

Imported content should become searchable by

- Title
- Subtitle
- Keywords
- Tags
- Country
- City
- Theme
- Medium
- Publication
- Exhibition
- Year

Search should tolerate minor spelling mistakes.

---

# Future Import Strategy

Future Blogger imports should

- detect only new content
- skip unchanged documents
- update modified entries
- preserve manual edits
- preserve manually added metadata

Migration should never overwrite editor-created content without confirmation.

---

# Backup Strategy

Before every import

Create

- Database Backup
- Media Backup
- Relationship Backup
- Metadata Backup

Restoration should be possible with a single operation.

---

# Scalability Requirements

The architecture should comfortably support

- 500+ artworks
- 20,000+ images
- 5,000+ journal entries
- Hundreds of exhibitions
- Thousands of archive documents
- Multiple languages
- Future media types

No redesign should be necessary.

---

# Acceptance Criteria

The migration is considered successful when

- All public Blogger posts are imported.
- Original publication dates are preserved.
- Images retain visual quality.
- Internal links are updated.
- Duplicate content is identified.
- Relationships are automatically created.
- Metadata is generated.
- Search indexes are updated.
- URLs remain stable.
- Editors can maintain all content without developer assistance.

---

# Content Architecture Summary

The archive is not a collection of pages.

It is an interconnected knowledge system.

Every artwork should lead to memories.

Every memory should reveal context.

Every context should deepen understanding.

Content should evolve continuously without losing historical integrity.

The architecture must remain flexible, maintainable, and independent of any specific frontend technology.

This content model should support the archive for decades while allowing future technologies, interfaces, and storytelling formats to evolve without requiring fundamental structural changes.
