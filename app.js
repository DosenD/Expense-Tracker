const form = document.querySelector('form');
const submit = document.querySelector('.submit');
const placeIn = document.querySelector('.name input');
const dateIn = document.querySelector('.date input');
const amountIn = document.querySelector('.amount input');
const table = document.querySelector('tbody');
const sumBut = document.querySelector('.sumBut');


submit.addEventListener('click', e => {
  e.preventDefault();

  const placeInput = placeIn.value.trim();
  const dateInput = () => {
  return dateIn.value.split('-').reverse().join('.')
  }
  const revDate = dateInput()
  const amountInput = amountIn.value.trim();
  
  
  const html = `
   <tr>
    <td>${placeInput}</td>
    <td>${revDate}</td>
    <td class="money">${amountInput} RSD</td>
    <td><button class="delete">Delete</button></td>
   </tr>
   
   `;

  if(placeInput.length && revDate.length && amountInput.length){
    table.innerHTML += html;
    form.reset()
    
  }else(alert('Please fill out all the input fields!'))

  summ();

});

table.addEventListener('click', e => {
  if(e.target.classList.contains('delete')){
    e.target.parentElement.parentElement.remove()
  }
  summ()
});


const summ = () => {

  let sumVal = 0;
  for(i = 0; i < table.rows.length; i++){
    sumVal = sumVal + parseInt(table.rows[i].cells[2].innerHTML)
  }
  
  let html = `${sumVal}`
  sumBut.innerHTML = html
};

window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  if(table.innerHTML.length){
    localStorage.setItem('savedTable', table.innerHTML)
  }
  localStorage.setItem('total', sumBut.innerHTML)
  
});


window.addEventListener('load', (e) => {
  e.preventDefault();
  const data = localStorage.getItem('savedTable')
  table.innerHTML += data

  const data1 = localStorage.getItem('total');
  sumBut.innerHTML = data1
});

