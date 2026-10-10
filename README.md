# Harni Skin Clinic

Harni Skin Clinic is a static dermatology and aesthetic clinic website built with HTML, CSS, and vanilla JavaScript. The site promotes skin and hair treatment services, showcases patient results, shares testimonials, and provides a consultation booking flow through a front-end contact/appointment form.

## Project Overview

This project is a lightweight marketing website for a skin care clinic. It is intended to be easy to host on any static web server without a build process, dependency installation, or backend setup.

The website includes:
- A landing page with clinic messaging and service highlights
- Dedicated pages for treatments, results, testimonials, and about information
- Contact and appointment forms for lead capture
- Responsive layout and interactive UI elements such as navigation and sliders

## Key Features

- Responsive clinic website for desktop and mobile viewing
- Clear information architecture for treatments and patient outcomes
- Multi-page static content structure
- Client-side form validation for contact and appointment requests
- Before/after treatment galleries and patient review sections
- No framework or build tooling required

## Technologies Used

- HTML5
- CSS3
- JavaScript (vanilla)
- Static image assets
- Inline SVG icons

## Project Structure

```text
harni-skin-clinic/
├── index.html
├── about.html
├── treatments.html
├── results.html
├── testimonials.html
├── contact.html
├── appointment.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   └── icons/
├── README.md
└── (additional static files as needed)
```

## Prerequisites

To view and work with this project, you need:
- A modern web browser
- A local static file server or direct browser access to the HTML files
- No package manager, database, or environment variables are required for the current static setup

## Installation and Setup

There is no dependency installation step for this project.

### Option 1: Open directly in a browser

Open `index.html` directly in a browser.

### Option 2: Run a local static server

From the project root, run:

```bash
cd harni-skin-clinic
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## How the Project Works

- `index.html` serves as the main landing page.
- The other HTML pages provide treatment information, results, testimonials, contact details, and appointment booking.
- `css/style.css` contains the styling, layout system, and color variables.
- `js/script.js` handles menu interactions, testimonial slider behavior, and client-side form validation.
- Form submissions currently trigger the front-end `sendRequest()` function, which logs the data to the console and displays the success state.

## Form and API Notes

The contact and appointment forms include client-side validation and are prepared for future API integration. In the current code, the form handler is intentionally non-production and does not send data to a live backend.

If a real backend is later added, the logic in `js/script.js` can be replaced with a fetch-based API call.



## Development Notes

- The project is intentionally static and does not use a framework.
- Styling is centralized in `css/style.css` and the layout is page-based rather than component-driven.
- The site assets are stored under `assets/`, including photos and graphical elements.

## Recommended Improvements

Potential next enhancements for this project include:
- Connecting contact and appointment forms to a backend or email service
- Adding analytics tracking for user engagement and conversion events
- Replacing placeholder or generic content with finalized production copy
- Adding SEO metadata, schema markup, and structured content improvements
- Improving accessibility review and keyboard support

## Contributing

This repository does not currently include a formal contribution workflow or project-specific contribution guide. If you plan to make changes:

1. Create a feature branch.
2. Keep changes focused and aligned with the static site structure.
3. Verify the site still renders correctly in a browser after edits.
4. Update documentation when changing behavior, pages, or setup instructions.



## Summary

Harni Skin Clinic is a static, responsive clinic website designed to present services and convert visitors into appointments. The project is simple to run locally, requires no build system, and is structured for easy customization by editing HTML, CSS, and JavaScript files.
