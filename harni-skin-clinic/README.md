# Harni Skin Clinic

Static website — HTML5, CSS3 and vanilla JavaScript only. No frameworks, no build step.
Open `index.html` in any browser, or upload the whole folder to any web host.

## Structure

```
index.html · about.html · treatments.html · results.html
testimonials.html · contact.html · appointment.html
css/style.css      all styling (CSS variables at the top)
js/script.js       menu, testimonial slider, form validation
assets/images/     doctor photo, before/after photos, patient avatars
assets/icons/      reserved (icons are an inline SVG sprite in each page)
```

## Changing the look

Every colour lives in one place — the `:root` block at the top of `css/style.css`:

```css
--primary   /* buttons, links, active nav */
--dark      /* headings */
--light     /* tinted section backgrounds */
--green     /* WhatsApp */
```

## Connecting a backend

Both forms (home page, appointment page, contact page) validate in the browser and then call
`sendRequest()` at the bottom of `js/script.js`. It currently logs the data and shows the success
message. To send it to a real API, replace the body of that one function:

```js
function sendRequest(form, data) {
  fetch(form.dataset.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(/* show the success message */);
}
```

The target URL is already on each form as `data-endpoint` (`/api/appointments`, `/api/contact`).
Field names posted: `name`, `phone`, `email`, `concern`, `date`, `time`, `message`.

## Clinic details to update

Phone, WhatsApp number, email and map links are set in every page. Search and replace:
`number `, `@gmail.com`.
