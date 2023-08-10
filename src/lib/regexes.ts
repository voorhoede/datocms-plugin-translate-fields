const newLine = '\n'
export const markdownHeader = new RegExp(`${newLine}(#+)(.*)`, 'g')
export const markdownH1 = /^# (.*$)/gim
export const markdownH2 = /^## (.*$)/gim
export const markdownH3 = /^### (.*$)/gim
export const markdownH4 = /^#### (.*$)/gim
export const markdownH5 = /^##### (.*$)/gim
export const markdownH6 = /^###### (.*$)/gim
export const markdownImage = /!\[([^[]+)\]\(([^)]+)\)/g
export const markdownLink = /\[([^[]+)\]\(([^)]+)\)/g
export const markdownStrong = /(\*\*|__)(.*?)(\*?)\1/g
export const markdownDex = /~~(.*?)~~/g
export const markdownQ = /:"(.*?)":/g
export const markdownCode = /`(.*?)`/g
export const markdownBlockquote = new RegExp(`${newLine}(&gt;|\\>)(.*)`, 'g')
export const markdownHr = new RegExp(`${newLine}-{5,}`, 'g')
export const markdownparagraph = new RegExp(`${newLine}(.+?)${newLine}`, 'g')
export const markdownBr = new RegExp(`((${newLine}){2,})`, 'g')
export const markdownEm = /(\s|>)(\*|_)(.*?)\2(\s|<)/g
export const markdownUlList = new RegExp(
  `${newLine}(((\\s{4})?\\*(.*?)${newLine}){1,})`,
  'g',
)
export const markdownOlList = new RegExp(`${newLine}[0-9]+\\.(.*)`, 'g')

export const markdownRegexesArray = [
  markdownH1,
  markdownH2,
  markdownH3,
  markdownH4,
  markdownH5,
  markdownH6,
  markdownImage,
  markdownLink,
  markdownStrong,
  markdownDex,
  markdownQ,
  markdownCode,
  markdownBlockquote,
  markdownHr,
  markdownparagraph,
  markdownBr,
  markdownEm,
  markdownUlList,
  markdownOlList,
]

export const htmlRegex =
  /<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i
