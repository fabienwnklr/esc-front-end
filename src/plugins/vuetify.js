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
        primary: colors.indigo.base,
        accent: colors.shades.white,
        secondary: colors.indigo.lighten2,
        error: colors.red.accent3
      },
      dark: {
        primary: colors.indigo.base,
        secondary: colors.indigo.lighten2,
        accent: colors.shades.black,
        error: colors.red.accent3
      }
    }
  }
})
