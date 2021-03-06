import '../src/styles/scss/main.scss';
import React, {FC} from "react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
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
