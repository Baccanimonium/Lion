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
    activTabIndicatorPosition () {
      return { left: `${this.currentElementState.prevWidth}px`, right: `${this.currentElementState.offsetWidth}px`, width: `${this.currentElementState.clientWidth}px` }
    },
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
      const { clientWidth, scrollWidth, children } = this.$refs.tabsContainer
      this.maxScrollPosition = scrollWidth - clientWidth
      this.viewWidth = clientWidth
      const { elements } = Object.values(children).reduce((acc, { clientWidth }) => {
        acc.elements.push({ clientWidth, offsetWidth: acc.prevWidth + clientWidth, prevWidth: acc.prevWidth })
        acc.prevWidth += clientWidth
        return acc
      }, { elements: [], prevWidth: 0 })
      // удаляем индификатор скролла
      elements.pop()
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
        if (item.children[0].text === 'Новый шаблон Поиска') item.children[0].text = 'Новый запрос поиска'
        if (item.children[0].text.slice(0, 13) === 'Шаблон Поиска') item.children[0].text = item.children[0].text.replace(/Шаблон Поиска/g, 'Запрос поиска')
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
      <div class="tabs-wrapper">
        <div class="tabs-headers-wrapper">
          <div
            class="tabs-headers-container"
            style={this.transitonState}
            ref="tabsContainer"
            onWheel={this.handleHorizontalScroll}
          >
            {headerTabs}
            <div
              class="active-tab-indicator"
              style={this.activTabIndicatorPosition}
            ></div>
          </div>
        </div>
        <div class="column-container tab-content-wrapper">
          <transition name={this.prevIndex > this.value ? 'Bslide' : 'slide'} mode="out-in">
            {defaultSlot[this.value] || []}
          </transition>
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
  .Bslide-enter-active, .Bslide-leave-active, .slide-enter-active, .slide-leave-active {
    transition-property: opacity, transform;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(.25,.8,.5,1);
    /*transition: transform 200ms ease-in-out;*/
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
  .tabs-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    .tabs-controll {
      cursor: pointer;
      position: absolute;
      top: 0;
      height: 48px;
      z-index: 2;
      opacity: 0;
      transition-property: opacity;
      transition-timing-function: ease-in-out;
      transition-duration: 250ms;
      color: #000000;
      background-color: #f5f5f5;
      border-right: 4px;
      &:hover {
        opacity: 1;
      }
    }
    .tabs-left-controll {
      left: 0;
    }
    .tabs-right-controll {
      right: 0;
    }
    .tabs-headers-wrapper {
      overflow: hidden;
      width: 100%;
      height: 48px;
      flex: 0 1 auto;
      .tabs-headers-container {
        position: relative;
        display: flex;
        white-space: nowrap;
        transition: transform 400ms cubic-bezier(.25,.8,.5,1);
        .active-tab-indicator {
          transition-property: right, left;
          transition-timing-function: cubic-bezier(.25,.8,.5,1);
          transition-duration: 400ms;
          position: absolute;
          bottom: 0;
          border-bottom: 2px solid blue;
        }
      }
    }
  }
  .tab-content-wrapper {
    height: calc(100% - 48px);
  }
</style>
