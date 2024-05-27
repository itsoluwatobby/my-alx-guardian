module.exports = {
  templateWrapper(title, template) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="my-alx-guardian" content="WE DO HARD THINGS">
          <title>${title}</title>
        </head>
        <body>
          ${template}
        </body>
      </html>
    `;
  },
};
