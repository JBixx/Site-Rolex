/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu')
const navToggle = document.getElementById('nav-toggle')
const navClose = document.getElementById('nav-close')
const pageLoader = document.getElementById('page-loader')
const languageToggle = document.getElementById('language-toggle')

document.body.classList.add('loading')

window.addEventListener('load', () => {
  setTimeout(() => {
    if (pageLoader) pageLoader.classList.add('page-loader--hidden')
    document.body.classList.remove('loading')
  }, 900)
})

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
  })
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

/*=============== REMOVE MOBILE MENU ===============*/
const navLink = document.querySelectorAll('.nav__link')
const linkAction = () => navMenu.classList.remove('show-menu')
navLink.forEach((n) => n.addEventListener('click', linkAction))

/*=============== CHANGE HEADER STYLES ===============*/
const scrollHeader = () => {
  const header = document.getElementById('header')
  window.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== TESTIMONIAL SWIPER ===============*/
new Swiper('.testimonial-swiper', {
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})

/*=============== NEW SWIPER ===============*/
new Swiper('.new-swiper', {
  spaceBetween: 24,
  loop: true,
  breakpoints: {
    576: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  },
})

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUpEl = document.getElementById('scroll-up')
  window.scrollY >= 350 ? scrollUpEl.classList.add('show-scroll') : scrollUpEl.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
const scrollActive = () => {
  const scrollY = window.scrollY
  sections.forEach((section) => {
    const id = section.id
    const top = section.offsetTop - 50
    const height = section.offsetHeight
    const link = document.querySelector('.nav__menu a[href*=' + id + ']')
    if (!link) return
    link.classList.toggle('active-link', scrollY > top && scrollY <= top + height)
  })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW CART ===============*/
const cart = document.getElementById('cart')
const cartShop = document.getElementById('cart-shop')
const cartClose = document.getElementById('cart-close')
const cartContainer = document.getElementById('cart-container')
const cartItemsCount = document.getElementById('cart-items-count')
const cartTotal = document.getElementById('cart-total')
const cartCheckoutButton = document.getElementById('cart-checkout')
const paymentModal = document.getElementById('payment-modal')
const paymentClose = document.getElementById('payment-close')
const paymentForm = document.getElementById('payment-form')
const paymentSuccess = document.getElementById('payment-success')
const paymentSuccessClose = document.getElementById('payment-success-close')

const CART_STORAGE_KEY = 'watches-cart'
let cartItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]')
const LANGUAGE_STORAGE_KEY = 'selected-language'
let currentLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'fr'

const translations = {
  fr: {
    'meta.title': 'Brazzaville Montres - Collection Prestige',
    'loader.title': 'Brazzaville Montres',
    'loader.text': 'Chargement de la collection prestige...',
    'nav.home': 'Accueil',
    'nav.featured': 'Selection',
    'nav.products': 'Produits',
    'nav.new': 'Nouveautes',
    'section.featured': 'Selection',
    'section.products': 'Produits',
    'section.new': 'Nouveautes',
    'home.title': 'NOUVELLE COLLECTION <br> HORLOGERE B720',
    'home.description':
      'Derniere arrivee de la serie B720 importee, avec un design moderne, robuste et parfaitement adapte au style premium.',
    'home.discover': 'Decouvrir',
    'story.sectionTitle': 'Notre histoire',
    'story.title': 'La montre iconique <br> de cette annee',
    'story.description':
      "Les montres les plus recentes de l'annee sont disponibles dans notre boutique a Brazzaville. Decouvrez-les maintenant.",
    'common.promo': 'Promo',
    'featured.roseGold': 'Or rose',
    'featured.roseGold': 'Or rose',
    'common.new': 'Nouveau',
    'common.addToCart': 'AJOUTER AU PANIER',
    'products.spiritRose': 'Spirit rose',
    'products.khakiPilot': 'Khaki pilote',
    'products.jubileeBlack': 'Jubilee noir',
    'products.fossilMe3': 'Fossil me3',
    'products.duchen': 'Duchen',
    'products.prestigeBrazza': 'Prestige brazza',
    'new.longinesRose': 'Longines rose',
    'new.dreyfussGold': 'Dreyfuss gold',
    'new.portugueseRose': 'Portuguese rose',
    'testimonial.description':
      'Ce sont des montres exceptionnelles, toujours a la pointe des tendances, avec des prix competitifs et un service client tres attentif.',
    'testimonial.date': '27 mars 2021',
    'testimonial.roleDirectorF': "Directrice d'entreprise",
    'testimonial.roleDirectorM': "Directeur d'entreprise",
    'newsletter.title': 'Abonnez-vous a notre <br> Newsletter',
    'newsletter.description':
      'Ne manquez aucune remise. Inscrivez-vous pour recevoir nos meilleures offres, reductions, bons plans et cadeaux.',
    'newsletter.placeholder': 'Entrez votre email',
    'newsletter.subscribe': "S'ABONNER",
    'footer.info': 'Nos informations',
    'footer.address1': 'Avenue de la Paix, Brazzaville',
    'footer.address2': 'Republique du Congo',
    'footer.about': 'A propos',
    'footer.helpCenter': "Centre d'aide",
    'footer.support': 'Support client',
    'footer.ourHouse': 'Notre maison',
    'footer.legal': 'Mentions legales',
    'footer.collections': 'Collections',
    'collections.classique.badge': 'Classique',
    'collections.sport.badge': 'Sport',
    'collections.limited.badge': 'Edition limitee',
    'collections.accessories.badge': 'Accessoires',
    'footer.social': 'Reseaux sociaux',
    'footer.slogan': 'Horlogerie premium au coeur de Brazzaville.',
    'footer.copy': 'HIRWA Jean Baptiste. Tous droits reserves.',
    'cart.title': 'Mon panier',
    'cart.empty': 'Votre panier est vide.',
    'cart.checkout': 'Passer au paiement',
    'cart.item': 'article',
    'cart.items': 'articles',
    'payment.title': 'Paiement securise',
    'payment.description': 'Simulation de paiement local (sans API externe).',
    'payment.name': 'Nom complet',
    'payment.namePlaceholder': 'Ex: Gloire',
    'payment.card': 'Numero de carte / telephone',
    'payment.cardPlaceholder': 'Ex: 4000 1234 5678 9010',
    'payment.expiry': 'MM/AA',
    'payment.cvv': 'CVV / PIN',
    'payment.payNow': 'Payer maintenant',
    'payment.successTitle': 'Paiement valide avec succes',
    'payment.successText': 'Votre commande a ete confirmee. Merci pour votre confiance.',
    'payment.continueShopping': 'Continuer les achats',
    locale: 'fr-FR',
  },
  en: {
    'meta.title': 'Brazzaville Watches - Prestige Collection',
    'loader.title': 'Brazzaville Watches',
    'loader.text': 'Loading the prestige collection...',
    'nav.home': 'Home',
    'nav.featured': 'Featured',
    'nav.products': 'Products',
    'nav.new': 'New',
    'section.featured': 'Featured',
    'section.products': 'Products',
    'section.new': 'New Arrivals',
    'home.title': 'NEW COLLECTION <br> WATCH B720',
    'home.description':
      'Latest arrival from the imported B720 series, with a modern, robust design perfectly suited to a premium style.',
    'home.discover': 'Discover',
    'story.sectionTitle': 'Our story',
    'story.title': 'The iconic watch <br> of this year',
    'story.description':
      'The latest watches of the year are available in our Brazzaville boutique. Discover them now.',
    'common.promo': 'Sale',
    'featured.roseGold': 'Rose Gold',
    'featured.roseGold': 'Rose Gold',
    'common.new': 'New',
    'common.addToCart': 'ADD TO CART',
    'products.spiritRose': 'Spirit Rose',
    'products.khakiPilot': 'Khaki Pilot',
    'products.jubileeBlack': 'Jubilee Black',
    'products.fossilMe3': 'Fossil ME3',
    'products.duchen': 'Duchen',
    'products.prestigeBrazza': 'Prestige Brazza',
    'new.longinesRose': 'Longines Rose',
    'new.dreyfussGold': 'Dreyfuss Gold',
    'new.portugueseRose': 'Portuguese Rose',
    'testimonial.description':
      'These watches are exceptional, always aligned with the latest trends, with competitive pricing and attentive customer service.',
    'testimonial.date': 'March 27, 2021',
    'testimonial.roleDirectorF': 'Business Director',
    'testimonial.roleDirectorM': 'Business Director',
    'newsletter.title': 'Subscribe to our <br> Newsletter',
    'newsletter.description':
      'Do not miss any discount. Sign up to receive our best offers, deals, promotions, and gifts.',
    'newsletter.placeholder': 'Enter your email',
    'newsletter.subscribe': 'SUBSCRIBE',
    'footer.info': 'Our information',
    'footer.address1': 'Avenue de la Paix, Brazzaville',
    'footer.address2': 'Republic of the Congo',
    'footer.about': 'About',
    'footer.helpCenter': 'Help center',
    'footer.support': 'Customer support',
    'footer.ourHouse': 'Our house',
    'footer.legal': 'Legal notice',
    'footer.collections': 'Collections',
    'collections.classique.badge': 'Classic',
    'collections.sport.badge': 'Sport',
    'collections.limited.badge': 'Limited Edition',
    'collections.accessories.badge': 'Accessories',
    'footer.social': 'Social networks',
    'footer.slogan': 'Premium watchmaking in the heart of Brazzaville.',
    'footer.copy': 'HIRWA Jean Baptiste. All rights reserved.',
    'cart.title': 'My Cart',
    'cart.empty': 'Your cart is empty.',
    'cart.checkout': 'Proceed to Checkout',
    'cart.item': 'item',
    'cart.items': 'items',
    'payment.title': 'Secure Payment',
    'payment.description': 'Local payment simulation (no external API).',
    'payment.name': 'Full name',
    'payment.namePlaceholder': 'Ex: John Doe',
    'payment.card': 'Card or phone number',
    'payment.cardPlaceholder': 'Ex: 4000 1234 5678 9010',
    'payment.expiry': 'MM/YY',
    'payment.cvv': 'CVV / PIN',
    'payment.payNow': 'Pay now',
    'payment.successTitle': 'Payment validated successfully',
    'payment.successText': 'Your order has been confirmed. Thank you for your trust.',
    'payment.continueShopping': 'Continue shopping',
    locale: 'en-US',
  },
}

const t = (key) => translations[currentLanguage][key] || translations.fr[key] || key

const applyTranslations = () => {
  document.documentElement.lang = currentLanguage
  document.title = t('meta.title')
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n
    element.textContent = t(key)
  })
  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    const key = element.dataset.i18nHtml
    element.innerHTML = t(key)
  })
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.dataset.i18nPlaceholder
    element.setAttribute('placeholder', t(key))
  })
}

const updateLanguageButtons = () => {
  if (!languageToggle) return
  languageToggle.querySelectorAll('[data-lang]').forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === currentLanguage)
  })
}

if (cartShop) {
  cartShop.addEventListener('click', () => cart.classList.add('show-cart'))
}

if (cartClose) {
  cartClose.addEventListener('click', () => cart.classList.remove('show-cart'))
}

const parsePrice = (priceLabel) => Number(priceLabel.replace(/[^0-9.]/g, '')) || 0

const saveCart = () => localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))

const formatCurrency = (value) => `${value.toLocaleString(translations[currentLanguage].locale)} FCFA`

const getProductFromButton = (button) => {
  const card = button.closest('article') || button.closest('.home__data')
  if (!card) return null

  const titleEl =
    card.querySelector('.featured__title') ||
    card.querySelector('.products__title') ||
    card.querySelector('.new__title') ||
    card.querySelector('.home__title')
  const priceEl =
    card.querySelector('.featured__price') ||
    card.querySelector('.products__price') ||
    card.querySelector('.new__price') ||
    card.querySelector('.home__price')
  const imageEl =
    card.querySelector('.featured__img') ||
    card.querySelector('.products__img') ||
    card.querySelector('.new__img') ||
    document.querySelector('.home__img')

  if (!titleEl || !priceEl || !imageEl) return null

  return {
    id: `${titleEl.textContent.trim().toLowerCase().replace(/\s+/g, '-')}-${parsePrice(priceEl.textContent)}`,
    name: titleEl.textContent.trim(),
    price: parsePrice(priceEl.textContent),
    image: imageEl.getAttribute('src'),
    quantity: 1,
  }
}

const addToCart = (product) => {
  const existing = cartItems.find((item) => item.id === product.id)
  if (existing) existing.quantity += 1
  else cartItems.push(product)
  saveCart()
  renderCart()
  cart.classList.add('show-cart')
}

const updateItemQuantity = (id, delta) => {
  cartItems = cartItems
    .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
    .filter((item) => item.quantity > 0)
  saveCart()
  renderCart()
}

const removeItem = (id) => {
  cartItems = cartItems.filter((item) => item.id !== id)
  saveCart()
  renderCart()
}

const renderCart = () => {
  if (!cartContainer || !cartItemsCount || !cartTotal) return

  if (!cartItems.length) {
    cartContainer.innerHTML = `<p class="cart__empty">${t('cart.empty')}</p>`
    cartItemsCount.textContent = `0 ${t('cart.item')}`
    cartTotal.textContent = '0 FCFA'
    if (cartCheckoutButton) cartCheckoutButton.disabled = true
    return
  }

  cartContainer.innerHTML = cartItems
    .map(
      (item) => `
      <article class="cart__card" data-cart-id="${item.id}">
        <div class="cart__box">
          <img src="${item.image}" alt="${item.name}" class="cart__img">
        </div>
        <div class="cart__details">
          <h3 class="cart__title">${item.name}</h3>
          <span class="cart__price">${formatCurrency(item.price)}</span>
          <div class="cart__amount">
            <div class="cart__amount-content">
              <span class="cart__amount-box" data-action="decrease">
                <i class='bx bx-minus'></i>
              </span>
              <span class="cart__amount-number">${item.quantity}</span>
              <span class="cart__amount-box" data-action="increase">
                <i class='bx bx-plus'></i>
              </span>
            </div>
            <i class='bx bx-trash-alt cart__amount-trash' data-action="remove"></i>
          </div>
        </div>
      </article>
    `
    )
    .join('')

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  cartItemsCount.textContent = `${itemCount} ${itemCount > 1 ? t('cart.items') : t('cart.item')}`
  cartTotal.textContent = formatCurrency(total)
  if (cartCheckoutButton) cartCheckoutButton.disabled = false
}

document.querySelectorAll('[data-add-to-cart]').forEach((button) => {
  button.addEventListener('click', () => {
    const product = getProductFromButton(button)
    if (product) addToCart(product)
  })
})

if (cartContainer) {
  cartContainer.addEventListener('click', (event) => {
    const actionElement = event.target.closest('[data-action]')
    const card = event.target.closest('.cart__card')
    if (!actionElement || !card) return
    const id = card.dataset.cartId
    const action = actionElement.dataset.action
    if (action === 'increase') updateItemQuantity(id, 1)
    if (action === 'decrease') updateItemQuantity(id, -1)
    if (action === 'remove') removeItem(id)
  })
}

if (cartCheckoutButton) {
  cartCheckoutButton.addEventListener('click', () => {
    if (!cartItems.length) return
    paymentModal.classList.add('show-payment')
  })
}

if (paymentClose) {
  paymentClose.addEventListener('click', () => paymentModal.classList.remove('show-payment'))
}

if (paymentForm) {
  paymentForm.addEventListener('submit', (event) => {
    event.preventDefault()
    cartItems = []
    saveCart()
    renderCart()
    paymentModal.classList.remove('show-payment')
    if (paymentSuccess) paymentSuccess.classList.add('show-payment-success')
    paymentForm.reset()
  })
}

if (paymentSuccessClose) {
  paymentSuccessClose.addEventListener('click', () => {
    paymentSuccess.classList.remove('show-payment-success')
  })
}

if (languageToggle) {
  languageToggle.addEventListener('click', (event) => {
    const target = event.target.closest('[data-lang]')
    if (!target) return
    currentLanguage = target.dataset.lang
    localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage)
    applyTranslations()
    updateLanguageButtons()
    renderCart()
  })
}

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconThemeSun = 'bx-sun'
const iconThemeMoon = 'bx-moon'
const selectedTheme = localStorage.getItem('selected-theme')
const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? 'dark' : 'light')

const applyThemeState = (isDark) => {
  document.body.classList.toggle(darkTheme, isDark)
  themeButton.classList.toggle(iconThemeSun, isDark)
  themeButton.classList.toggle(iconThemeMoon, !isDark)
}

const initialIsDark = selectedTheme ? selectedTheme === 'dark' : true
applyThemeState(initialIsDark)

themeButton.addEventListener('click', () => {
  const nextIsDark = !document.body.classList.contains(darkTheme)
  applyThemeState(nextIsDark)
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.removeItem('selected-icon')
})

renderCart()
applyTranslations()
updateLanguageButtons()
