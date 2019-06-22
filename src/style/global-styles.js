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
  color: #4F4F4F;
}

* {
  box-sizing: border-box;
  margin: 0;
}

.ml-1 {
  margin-left: 1rem;
}

.mr-1 {
  margin-right: 1rem;
}

.mb-1 {
  margin-bottom: 1rem;
}
`
