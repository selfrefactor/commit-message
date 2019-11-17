export const MISSING = 'MISSING'

export const ADDRESS_SAMOSTOYATELEN_REGEX = /Адрес на имота:.{1,250}/g
export const ADDRESS_SAMOSTOYATELEN_REMOVE = 'Адрес на имота:'

export const TEXT_SAMOSTOYATELEN_REGEX = /Самостоятелният обект се намира(.|\n){100,750}Посочена в документа/gm
export const TEXT_SAMOSTOYATELEN_REMOVE = 'Посочена в документа'

export const ADDRESS_REGEX = /Адрес на поземления имот:(.|\n){1,60}Площ:/gmu
export const ADDRESS_REMOVE_FIRST = 'Адрес на поземления имот:'
export const ADDRESS_REMOVE_SECOND = 'Площ:'

export const ACREAGE_REGEX = /Площ:(.|\n){1,60}Трайно предназначение на територията:/gmu
export const ACREAGE_REMOVE_FIRST = 'Площ:'
export const ACREAGE_REMOVE_SECOND = 'Трайно предназначение на територията:'

export const ACREAGE_SAMOSTOYATELEN_REGEX = /Посочена в документа площ:.{1,60}/gmu
export const ACREAGE_SAMOSTOYATELEN_REMOVE = 'Посочена в документа площ:'

export const ZAPOVED_SAMOSTOYATELEN_REGEX = /одобрени със Заповед .{1,60}/gmu
export const ZAPOVED_SAMOSTOYATELEN_REMOVE = 'одобрени със Заповед '

export const SAME_FLOOR_SAMOSTOYATELEN_REGEX = /На същия етаж:.{1,60}/gmu
export const SAME_FLOOR_SAMOSTOYATELEN_REMOVE = 'На същия етаж:'

export const BELOW_FLOOR_SAMOSTOYATELEN_REGEX = /Под обекта:.{1,60}/gmu
export const BELOW_FLOOR_SAMOSTOYATELEN_REMOVE = 'Под обекта:'

export const ABOVE_FLOOR_SAMOSTOYATELEN_REGEX = /Над обекта:.{1,60}/gmu
export const ABOVE_FLOOR_SAMOSTOYATELEN_REMOVE = 'Над обекта:'

export const ATTACHMENTS_SAMOSTOYATELEN_REGEX = /Прилежащи части:(.|\n){10,500}Ниво:/gmu
export const ATTACHMENTS_SAMOSTOYATELEN_REMOVE_FIRST = 'Посочена в документа площ:'
export const ATTACHMENTS_SAMOSTOYATELEN_REMOVE_SECOND = 'Ниво:'

export const ZAPOVED_REGEX = /одобрени със Заповед.{1,40}г./gmu
export const ZAPOVED_REMOVE = 'одобрени със Заповед'

export const SKITSA_REGEX = /Скица\s№\s[0-9\-\.]{5,33}/gmu
export const SKITSA_REMOVE = 'Скица №'

export const SHEMA_REGEX = /СХЕМА\s№\s[0-9\-\.]{5,33}/gmu
export const SHEMA_REMOVE = 'СХЕМА №'

export const PURPOSE_REGEX = /предназначение\sна\sтериторията:.{5,33}/gmu
export const PURPOSE_REMOVE = 'предназначение на територията:'

export const PERMANENT_PURPOSE_REGEX = /Начин на трайно ползване:.{3,100}\n/gmu
export const PERMANENT_PURPOSE_REMOVE = 'Начин на трайно ползване:'

export const OLD_ID_REGEX = /Стар идентификатор:.{3,100}\n/gmu
export const OLD_ID_REMOVE = 'Стар идентификатор:'

export const NEIGHBOURS_REGEX = /Съседи:[\s0-9\.,]{0,100}/gmu
export const NEIGHBOURS_REMOVE = 'Съседи:'

export const PREVIOUS_NUMBER_REGEX = /Номер по предходен план:.{3,100}\n/gmu
export const PREVIOUS_NUMBER_REMOVE = 'Номер по предходен план:'

export const IDENTIFIKATOR_REGEX = /идентификатор [0-9\.]{10,27}/gmu
export const IDENTIFIKATOR_REMOVE = 'идентификатор'

export const LOCATION_REGISTER_REGEX = /И КАДАСТЪР - ГР.[\sА-Яа-я]+/gmu
export const LOCATION_REGISTER_REMOVE = 'И КАДАСТЪР - ГР'
