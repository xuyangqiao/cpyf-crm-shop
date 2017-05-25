/**
 *
 * @param {string} current 当前时间
 * @param {number} countDay 向后或者向前的天数
 */
export const handleDay = (current = null, countDay = 0) => {
  let d
  // 如果没有传入时间，则使用当前时间
  current ? d = new Date(current) : d = new Date()
  d.setDate(d.getDate() + countDay)
  let year = d.getFullYear()
  let mon = d.getMonth() + 1
  let day = d.getDate()
  let time = `${year}-${mon}-${day}`
  return time
}

export const handleOffice = (current = null) => {
  let d
  // 如果没有传入时间，则使用当前时间
  current ? d = new Date(current) : d = new Date()
  let year = d.getFullYear()
  let mon = d.getMonth() + 1
  let time = `${year}年${mon}月`
  return time
}

/**
 *
 * @param {string} start 开始时间
 * @param {string} end 结束时间
 */

Date.prototype.format = function () {
  let weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  let s = ''
  s += this.getFullYear() + '-' // 获取年份。
  s += (this.getMonth() + 1) + '-' // 获取月份。
  s += this.getDate() // 获取日。
  s += ' ' + weekArr[this.getDay()] // 获取星期几
  return (s) // 返回日期。
}

export const listTime = (begin, end) => {
  let arr = []
  let ab = begin.split('-')
  let ae = end.split('-')
  let db = new Date()
  db.setUTCFullYear(ab[0], ab[1] - 1, ab[2])
  let de = new Date()
  de.setUTCFullYear(ae[0], ae[1] - 1, ae[2])
  let unixDb = db.getTime()
  let unixDe = de.getTime()
  for (let k = unixDb; k <= unixDe;) {
    arr.push((new Date(parseInt(k))).format())
    k = k + 24 * 60 * 60 * 1000
  }
  return arr
}

/*
 *数字转成中文
*/
const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
const chnUnitSection = ['', '万', '亿', '万亿', '亿亿']
const chnUnitChar = ['', '十', '百', '千']

const SectionToChinese = (section) => {
  let strIns = ''
  let chnStr = ''
  let unitPos = 0
  let zero = true
  while (section > 0) {
    let v = section % 10
    if (v === 0) {
      if (!zero) {
        zero = true
        chnStr = chnNumChar[v] + chnStr
      }
    } else {
      zero = false
      strIns = chnNumChar[v]
      strIns += chnUnitChar[unitPos]
      chnStr = strIns + chnStr
    }
    unitPos++
    section = Math.floor(section / 10)
  }
  return chnStr
}

export const numberToChinese = (num) => {
  let unitPos = 0
  let strIns = ''
  let chnStr = ''
  let needZero = false

  if (num === 0) {
    return '首'
  }

  while (num > 0) {
    let section = num % 10000
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr
    }
    strIns = SectionToChinese(section)
    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0]
    chnStr = strIns + chnStr
    needZero = (section < 1000) && (section > 0)
    num = Math.floor(num / 10000)
    unitPos++
  }

  return chnStr
}
