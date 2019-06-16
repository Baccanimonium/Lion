<script>
import debounce from 'lodash/debounce'
import TabHeaderButton from './TabsButton'
import * as components from './components'

export default {
  name: 'Tabs',
  components,
  props: {
    tabHeaders: {
      type: Array,
      default: () => []
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      middlewareIndex: 0,
      prevIndex: 0,
      scrollPosition: 0,
      maxScrollPosition: 0, // на сколько можно скроллить
      viewWidth: 0, // размер контента на экране
      currentElementState: {},
      tabHeadersState: []
    }
  },
  computed: {
    transitonState () {
      return { transform: `translateX(${-this.scrollPosition}px)` }
    }
  },
  watch: {
    tabHeaders () {
      setTimeout(() => this.updateTabHeaderWidth(), 50)
    },
    value (newValue, oldValue) {
      this.prevIndex = oldValue
      setTimeout(() => this.setHeaderScrollState(newValue), 50)
    }
  },
  mounted () {
    setTimeout(() => this.updateTabHeaderWidth(), 50)
    window.addEventListener('resize', this.setTabHeadersWidth)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setTabHeadersWidth)
  },
  methods: {
    handleHorizontalScroll (e) {
      e.stopPropagation()
      const { deltaY } = e
      if ((this.middlewareIndex > 0 && deltaY < 0) || (this.middlewareIndex < this.tabHeaders.length - 1 && deltaY > 0)) {
        this.handleChangeTab(deltaY > 0 ? this.middlewareIndex + 1 : this.middlewareIndex - 1)()
      }
    },
    updateTabHeaderWidth () {
      const { clientWidth, scrollWidth, children } = this.$refs.tabsContainer.$el
      this.maxScrollPosition = scrollWidth - clientWidth
      this.viewWidth = clientWidth
      const { elements } = Object.values(children).reduce((acc, { clientWidth }) => {
        acc.elements.push({ clientWidth, offsetWidth: acc.prevWidth + clientWidth, prevWidth: acc.prevWidth })
        acc.prevWidth += clientWidth
        return acc
      }, { elements: [], prevWidth: 0 })
      this.tabHeadersState = elements
      this.currentElementState = elements[this.value] || {}
    },
    // метод нужен для того, чтобы не дергаться на кучу событий ресайзов
    setTabHeadersWidth: debounce(function () { this.updateTabHeaderWidth() }, 50),
    // переключение влкадки затротленно, чтобы не грузить лишние данные при скролле
    setIndexOfCurrentTab: debounce(function (index) {
      this.$emit('input', index)
    }, 50),
    setHeaderScrollState (index) {
      const { [index]: currentElementState, [index + 1]: { clientWidth = 0 } = {} } = this.tabHeadersState
      this.currentElementState = currentElementState
      // проверяем выходит ли элемент за пределы контейнера
      if (currentElementState.offsetWidth > this.viewWidth) {
        let overflowDiff = currentElementState.offsetWidth - this.viewWidth + clientWidth
        // проверяем вышли ли мы за пределы scrollWidth
        overflowDiff = overflowDiff > this.maxScrollPosition ? this.maxScrollPosition : overflowDiff
        this.scrollPosition = overflowDiff
      } else {
        if (this.scrollPosition > 0) {
          this.scrollPosition = 0
        }
      }
      this.middlewareIndex = index
    },
    handleChangeTab (index) {
      return () => {
        this.setHeaderScrollState(index)
        this.setIndexOfCurrentTab(index)
      }
    }
  },
  render (h) {
    const { $slots: { default: defaultSlot = [] } } = this
    const headerTabs = this.tabHeaders.map((item, index) => {
      if (typeof item === 'object') {
        item.data.on.click = this.handleChangeTab(index)
        item.data.class = {
          current: index === this.value
        }
        return item
      } else {
        return (
          <TabHeaderButton
            key={index}
            class={index === this.value ? 'current' : ''}
            onClick={this.handleChangeTab(index)}
          >
            {item}
          </TabHeaderButton>
        )
      }
    })
    return (
      <TabsContainer>
        <TabsHeaderWrapper>
          <TabsHeadersContainer
            class="tabs-headers-container"
            style={this.transitonState}
            ref="tabsContainer"
            onWheel={this.handleHorizontalScroll}
          >
            {headerTabs}
          </TabsHeadersContainer>
        </TabsHeaderWrapper>
        <TabsContentContainer>
          <transition name={this.prevIndex > this.value ? 'Bslide' : 'slide'} mode="out-in">
            {defaultSlot[this.value] || []}
          </transition>
        </TabsContentContainer>
      </TabsContainer>
    )
  }
}
</script>

<style lang="scss" scoped>
  .Bslide-enter-active, .Bslide-leave-active, .slide-enter-active, .slide-leave-active {
    transition-property: opacity, transform;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(.25,.8,.5,1);
  }
  .Bslide-enter {
    transform: translateX(-100%);
    opacity: 0;
  }
  .Bslide-leave-to {
    transform: translateX(50%);
    opacity: 0;
  }
  .slide-enter {
    transform: translateX(100%);
    opacity: 0;
  }
  .slide-leave-to {
    transform: translateX(-50%);
    opacity: 0;
  }
</style>
