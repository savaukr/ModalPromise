let fruits = [
{id:1, title:'Гранат', price:50, img:'./img/granat.jpg'},
{id:2, title:'Спарки', price:12, img:'./img/sparkie.jpg'},
{id:3, title:'Апельсин', price:30, img:'./img/orange.jpg'},
{id:1, title:'Гранат', price:50, img:'./img/granat.jpg'}
]

const toHTML = fruit => `
      <div class="col">
        <div class="card">
          <img class="card-img-top" src=".${fruit.img}" alt="${fruit.title}" >
          <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Дивитись ціну</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Видалити</a>
          </div>
        </div>
      </div>
    `

function render() {
  const html = fruits.map((fruit)=>toHTML(fruit)).join('')
  document.querySelector('#fruits').innerHTML = html
}

const priceModal = $.modal({
  title: "Ціна товару:",
  content: ``,
  closable: true,
  width: '400px',
  footerButtons: [
  	{text:'Закрити', type:'primary', handler: ()=>{
  		console.log('Primary btn clicked')
  		priceModal.close()
  	}}
  ]
});

render()

document.addEventListener('click', (event) => {
  event.preventDefault()
  const btnType = event.target.dataset.btn 
  const id = +event.target.dataset.id
  const fruit = fruits.find(f=>f.id === id)

  if (btnType == 'price') {
    priceModal.setContent(
      `<p>ціна за ${fruit.title}: <strong>${fruit.price} грн/кг</strong></p>`
    )
    priceModal.open()
  } else if (btnType == 'remove') {
    $.confirm({
      title:'Ви впевнені?',
      content: `
        <p>Ви видаляєте фрукт: <strong>${fruit.title}</strong></p>
      `
    }).then(() => {
      fruits = fruits.filter((f) => f.id !== id)
      render()
      console.log('remove')
    }).catch(() => {
      console.log('cancle')
    })
  }
})
