# Schroders Chart

```
npm install
npm run serve
```

### Features

- Search in US Stock list
- Selection of a line chart based on H L O C values
- Selection of dateFrom and dateTo
- Adding / removing up to three stocks
- Resize chart, enjoy!
- Resolutions for data points are Days
- Low bundle payload

### Pending Improvements

- Chart re-rendering can be optimised, and typed better, last bit was more in hurry

- Resolution dropdown is not in the requirements D by default

- There is no validation of the dates whether from is earlier than to

- I could have used React-Redux, but I wanted to try the useReduce and some state provider. So I used this exercise to learn a new way to manage the sate

- I could have used Material - UI components, but I got some fun with the date picker that is not React and showing some reusability on Less and some dropdowns

- The API key should net be store in code -.-

- The stock search does not have arrows up and down, and that would be the first thing to improve

- Te colour should be random instead of by order
