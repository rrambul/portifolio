# Introduction to Web Components: Current State and Why You Should Care

This is the first post in a series of articles I'll be writing about Web Components. This one covers the basics, where the technology stands today, and the problems it solves.

&nbsp;

## What are Web Components?

Web Components are a set of web standards that allow you to create reusable, native HTML components that are framework-agnostic. In other words, you can build custom elements that work in any project, whether it's built with React, Vue, Angular, or just plain HTML and JavaScript.

&nbsp;

## Why use Web Components?

With Web Components, you can build a Design System using only native Web APIs, without relying on any external libraries. This brings several benefits:

&nbsp;

* **Longevity:** Your Design System won't be tied to a framework that might become obsolete.

* **Compatibility:** All modern browsers have supported Web Components since January 2020.

* **Performance:** By not depending on large frameworks, you avoid massive JavaScript bundles and improve performance.

&nbsp;

## Core technologies of Web Components

Web Components are built on three technologies:

&nbsp;

* **Custom Elements:** Allows you to create and register new custom HTML elements.

* **Shadow DOM:** Provides encapsulation so that HTML and CSS are isolated from the rest of the page.

* **HTML Templates:** Lets you define reusable chunks of HTML that can be cloned without rendering immediately.

&nbsp;

## Key advantages

&nbsp;

### Interoperability

Define custom elements to create new HTML elements that work with any library or framework.

&nbsp;

### Encapsulation

Use Shadow DOM to isolate styles and HTML rendering.

&nbsp;

### Composition

Use slots to natively compose elements and render trees.

&nbsp;

### Semantics vs. rendering

Separate your semantic/accessible HTML from your render HTML with Shadow DOM.

&nbsp;

### Component-aware styling

Declare CSS Parts to teach the browser how your component's style model works.

&nbsp;

## Tools for working with Web Components

Some popular tools for building Web Components:

&nbsp;

* **Lit:** A lightweight library for building Web Components declaratively.

* **Stencil:** Great for creating Design Systems and reusable components.

* **Shoelace:** A collection of ready-to-use components built with Web Components.

&nbsp;

## Industry adoption

Web Component standards have been supported by all major browsers since January 2020. Some numbers:

&nbsp;

* Over 18% of all pages rendered by Chrome use Web Components.

* The number of implemented Web Component standards has doubled since 2020.

&nbsp;

Many major companies and products are already using Web Components, such as:

YouTube, MSN, Photoshop, Salesforce, SpaceX Dashboard

&nbsp;

## What's Next?

In the next post of this series, we'll create a Web Component from scratch, step by step, and learn how to apply these technologies in practice.
