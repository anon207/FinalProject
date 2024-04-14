module.exports = {
  root: true,
  extends: ["universe/native"],
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    "max-len": ["error", { code: 100 }], // Limit lines to 100 characters
    "arrow-body-style": ["error", "as-needed"], // Allow omitting braces around arrow function bodies when unnecessary
    "object-curly-newline": ["error", { multiline: true, consistent: true }], // Enforce consistent line breaks inside braces of object literals
    "object-property-newline": [
      "error",
      { allowAllPropertiesOnSameLine: true },
    ], // Allow all properties to be on the same line in object literals
    "array-element-newline": ["error", "consistent"], // Enforce placing each element on a new line in array literals
    indent: ["error", 2, { SwitchCase: 1 }], // Use 2 spaces for indentation, switch case indentation is 1
    "no-multi-spaces": "error", // Disallow multiple spaces
    "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 1 }], // Allow only one empty line, no extra empty lines at beginning or end of file
    "no-trailing-spaces": "error", // Disallow trailing spaces
  },
};
