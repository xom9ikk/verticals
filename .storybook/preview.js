import '../src/styles/scss/main.scss';
import React from "react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    inlineStories: true,
  },
  backgrounds: {
    default: 'light',
  },
}

export const decorators = [
    (Story) => (
      <div style={{ margin: '10px', width: '100%' }}>
        <Story />
      </div>
    ),
];
