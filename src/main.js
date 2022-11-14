import './style/style.css'
import Logo from '/ceptree.svg'
import { RedBlackTree } from './core/RedBlackTree';
import { getDataObject } from './component/readcep'



const get = e => document.querySelector(e); //obtém um elemento
const gets = e => document.querySelectorAll(e); //obtém uma lista de elementos

get("#prepared").remove()
get("#app").classList.remove("hidden")

const headerElement = get('header h1:nth-child(2)')
var logoElement = document.createElement('img')
logoElement.src = Logo
headerElement.append(logoElement)

const tree = new RedBlackTree();




// console.log(tree.count)

// const homeElement = get('ul li:nth-child(1)')
// homeElement.classList.add('selected')

// const allHighlightsElements = gets('.highlight')
// allHighlightsElements.forEach(e => e.style.borderBottom = "3px solid #ffe9b1");

// var name = 'Danilo Borges da Silva'
// var pElementNew = document.createElement('p')
// pElementNew.innerHTML = `Olá, meu nome é ${name}`
// pElementNew.style.fontSize = "0.85rem"
// pElementNew.style.textAlign = "right"

// var pLastElement = get('#app p:nth-child(n)')
// pLastElement.append(pElementNew)

// function isSelectedItemMenu(element) {
//     return element.classList.contains("selected")
// }

// var ulElement = get('ul')

// ulElement.addEventListener('mouseover', (event) => {
//     let elementTarget = event.target
//     let liAllElements = gets('ul li')
//     liAllElements.forEach(e => {
//         e.classList.remove('hover')
//         if (e === elementTarget && !isSelectedItemMenu(e)) {
//             elementTarget.classList.add('hover')
//         }
//     })
// })

// ulElement.addEventListener('mouseout', (event) => {
//     let liAllElements = gets('ul li')
//     liAllElements.forEach(e => {
//         e.classList.remove('hover')
//     })
// })
import IMask from 'imask';

const cepInput = get("#cep")

const cepInputPattern = {
    mask: "00000-000",
    lazy: true
}
const cepInputMasked = IMask(cepInput, cepInputPattern)


const btnSearch = get("#btnSearch")

btnSearch.addEventListener('click', () => {
    console.log(cepInputMasked.unmaskedValue)





    if (cepInputMasked.unmaskedValue.length !== 8) {
        alert("Insira um cep válido.")
    } else {
        const keyToSearch = cepInputMasked.unmaskedValue;

        const find = tree.search(Number(keyToSearch))

        reusltP.style.display = "block"

        if (find) {
            var node = tree.getNode(Number(keyToSearch))
            node.key.print()
            reusltP.innerText = `CEP ${cepInputMasked.value} encontrado.`;
            dataResultDiv.style.display = "block";

            const cepValueCep = get("#cep .data-value")
            cepValueCep.innerText = node.key.zipCode 
           
            const cepValueBairro = get("#bairro .data-value");
            cepValueBairro.innerText = node.key.neighborhood==0? "não informado" :node.key.neighborhood;

            const cepValueRua = get("#endereco .data-value");
            cepValueRua.innerText = node.key.street;

            const cepValueCidade = get("#cidade .data-value");
            cepValueCidade.innerText = node.key.city;

            const cepValueComplemento = get("#complemento .data-value");
            cepValueComplemento.innerText = node.key.complement;


              



        } else {
            
            reusltP.innerText = `CEP ${cepInputMasked.value} não encontrado.`;
            
        }

    }
})


const mainAppSection = get("#main-app");

mainAppSection.style.display = "none";

const loaderInsideloadDiv = get("#load .loader");
loaderInsideloadDiv.style.display = "none";

const datasetButton = get("#search");


const loaderInsideForm = get("#formCEP .loader");
loaderInsideForm.style.display = "none";

const reusltP = get("#result");
reusltP.style.display = "none";

const dataResultDiv = get("#data-result");
dataResultDiv.style.display = "none";







datasetButton.addEventListener("click", (event) => {

    loaderInsideloadDiv.style.display = "block";
    datasetButton.classList.add("deactivate");
    getDataObject(tree);

    setTimeout(() => {
        alert(`Foram adicionados ${tree.count} Ceps referentes do PI, MA e CE.`);
        const datasetSection = get("#dataset");
        datasetSection.style.display = "none";
        mainAppSection.style.display = "block";
    }, 500)



})

