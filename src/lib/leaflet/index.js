import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  install:(Vue)=>{
    Vue.prototype.$L = L
  }
}