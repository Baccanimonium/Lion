import Vue from 'vue'
import memoizeOne from 'memoize-one'

const renderIcon = memoizeOne((children, h) => {
  return children.map((child, index) => {
    const { name, attribs, children = null } = child
    const attr = Object.keys(attribs)
      .filter(key => key !== 'fill' && key !== 'stroke' && attribs[key] !== 'none')
      .reduce((acc, key) => {
        acc[key] = attribs[key]
        return acc
      }, {})
    let merge = {}
    if (attribs.fill === 'none' && attribs.stroke) {
      merge = { fill: 'none', stroke: 'currentColor' }
    }
    return h(name, { key: index, attrs: { ...attr, ...merge } }, children === null ? children : renderIcon(children, h))
  })
})

const styles = { display: 'flex', verticalAlign: 'middle', cursor: 'pointer' }

export default ({ children, viewBox, attribs = {} }) => {
  return Vue.component('withUserList', {
    name: 'Icon',
    functional: true,
    render (h, { data: {
      attrs: { size = 16, title, ...attrs } = {},
      style = {},
      staticStyle = {},
      ...data
    } }) {
      return (
        <div style={{ ...styles, ...style, ...staticStyle }} {...data} {...attrs}>
          <svg fill="currentColor" height={size} width={size} viewBox={viewBox} {...attribs} style={styles}>
            {title && <title>{title}</title>}
            {renderIcon(children, h)}
          </svg>
        </div>
      )
    }
  })
}
