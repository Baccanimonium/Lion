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
}

* {
  box-sizing: border-box;
  margin: 0;
}

.default-margin-left {
  margin-left: 1rem;
}

.default-margin-right {
  margin-right: 1rem;
}

.default-margin-bottom {
  margin-bottom: 1rem;
}
`
