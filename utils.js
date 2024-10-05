export const getCompleteImgUrl = (imgPath) => {
  return `https://cdn.sanity.io/images/o31q1udi/production/${imgPath}`
}

export const updateBodyClass = (className) => {
  document.body.classList.add(className)
  return () => {
    document.body.classList.remove(className)
  }
}
