//Variables
const shoppingCart = document.querySelector('#carrito')
const shoppingCartContainer = document.querySelector('#lista-carrito tbody')
const clearShoppingCartBtn = document.querySelector('#vaciar-carrito')
const courseList = document.querySelector('#lista-cursos')
let courseShoppingCart = []

loadEventListeners()
function loadEventListeners() {
  courseList.addEventListener('click', addCourse)
  shoppingCart.addEventListener('click', deleteCourse)
  clearShoppingCartBtn.addEventListener('click', clearShoppingCart)
}

function addCourse(e) {
  e.preventDefault()

  if (e.target.classList.contains('agregar-carrito')) {
    const selecctionatedCourse = e.target.parentElement.parentElement

    readCourseData(selecctionatedCourse)

    clearHtmlShoppingCart()
    htmlShoppingCart()
  }
}

function deleteCourse(e) {
  if (e.target.classList.contains('borrar-curso')) {
    const courseId = e.target.getAttribute('data-id')

    courseShoppingCart = courseShoppingCart.filter(course => course.id !== courseId)

    clearHtmlShoppingCart()
    htmlShoppingCart()
  }
}

function clearShoppingCart() {
  courseShoppingCart = []

  clearHtmlShoppingCart()
}

function readCourseData(course) {
  const courseInfo = {
    image: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.precio span').textContent,
    id: course.querySelector('a').getAttribute('data-id'),
    quantity: 1
  }

  updateQuantity(courseInfo)
}

function updateQuantity(objectInfo) {
  const existElement = courseShoppingCart.some(course => course.id === objectInfo.id)

  if (existElement) {
    const courses = courseShoppingCart.map(course => {
      if (course.id === objectInfo.id) {
        course.quantity++

        return course //return the element from 'courseShoppingCart' updated
      } else {
        return course //return elements that aren't duplicated.
      }
    })

    courseShoppingCart = [...courses]
  } else {
    courseShoppingCart = [...courseShoppingCart, objectInfo]
  }
}

function htmlShoppingCart() {
  courseShoppingCart.forEach(course => {
    const { id, title, image, price, quantity } = course

    const row = document.createElement('tr')

    row.innerHTML = `
      <td>
        <img src='${image}' alt='${title}_image' >
      </td>
      <td>${title}</td>
      <td>${price}</td>
      <td>${quantity}</td>
      <td>
        <a href='#' class='borrar-curso' data-id='${id}'> X </a>
      </td>
    `

    shoppingCartContainer.appendChild(row)
  })
}

function clearHtmlShoppingCart() {
  while (shoppingCartContainer.firstChild) {
    shoppingCartContainer.removeChild(shoppingCartContainer.firstChild)
  }
}
