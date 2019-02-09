function sortBy(array, orderBy, asc) {
  asc = asc || false
  const isDate = orderBy === 'date'

  if (!orderBy || !orderBy.trim()) {
    return array
  }

  return array.sort((item1, item2) => {
    let comparator
    if (isDate) {
      comparator = orderByDate
    } else {
      comparator = defaultComparator
    }

    let items
    if (asc) {
      items = [item1[orderBy], item2[orderBy]]
    } else {
      items = [item2[orderBy], item1[orderBy]]
    }

    return comparator.apply(null, items)
  })
}

function defaultComparator(a, b) {
  if (isNaN(parseFloat(a)) || !isFinite(a) || (isNaN(parseFloat(b)) || !isFinite(b))) {
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1
    }
    if (a.toLowerCase() > b.toLowerCase()) {
      return 1
    }
  } else {
    if (parseFloat(a) < parseFloat(b)) {
      return -1
    }
    if (parseFloat(a) > parseFloat(b)) {
      return 1
    }
  }

  return 0
}

function orderByDate(a, b) {
  const date1 = new Date(a)
  const date2 = new Date(b)

  if (date1 < date2) {
    return -1
  }
  if (date1 > date2) {
    return 1
  }

  return 0
}

module.exports = sortBy
