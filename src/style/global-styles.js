import { injectGlobal } from 'vue-styled-components'

injectGlobal`
html, body, body > div:first-of-type {
  height: 100%;
}

html {
 font-size: 62.5%; 
}

body {
  font-family: "Rubik", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 1.4rem;
  line-height: 17px;
  margin: 0;
}

* {
  box-sizing: border-box;
}

.default-margin-right {
  margin-right: 1rem;
}
`
