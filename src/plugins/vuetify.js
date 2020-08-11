import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
import DatetimePicker from 'vuetify-datetime-picker'
// (Optional) import 'vuetify-datetime-picker/src/stylus/main.styl'

Vue.use(Vuetify)
Vue.use(DatetimePicker)
// custom theme
export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.blue.accent2,
        secondary: colors.blue.base,
        accent: colors.shades.black,
        error: colors.red.accent3
      }
    }
  }
})
