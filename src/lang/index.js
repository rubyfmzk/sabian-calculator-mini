import en from '@/lang/main_en.yml'
import sabian_en from '@/lang/sabian_en.yml'

en.sabian = sabian_en
let data = {en: en}

//言語を追加
if(window.lang !== 'en'){
  const local  = require('@/lang/main_'+window.lang+'.yml')
  local.sabian = require('@/lang/sabian_'+window.lang+'.yml')

  data[window.lang] = local
}

export { data }