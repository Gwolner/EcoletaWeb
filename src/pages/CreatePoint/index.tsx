import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';

import logo from '../../assets/logo.svg';
import './styles.css'
import api from '../../services/api';


//Tipo da variável: Para informar o tipo retornado do useState quando este retorna um objeto ou array!!

//Interfaces

interface Item {
    id: number,
    title: string,
    image_url: string
}

interface IBGEUFResponse {
    sigla: string
}

interface IBGECityResponse {
    nome: string;
}

const CreatePoint = () =>{

    //Estados do React
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUF, setselectedUF] = useState('0'); //0 porq o primeiro option começa com zero.
    const [selectedCity, setSelectedCity] = useState('0');
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
	const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    });
	const history = useHistory();


	
    //Requisições assíncronas

    // Carregada quando a tela é iniciada - Localização atual no mapa
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position =>{
            const { latitude, longitude } = position.coords;

            setInitialPosition([latitude, longitude]);
        })
        
    }, []);

    //Imagens de itens de coleta - API Node
    useEffect(()=> {
        api.get('items').then(response =>{ //Usa .then() por que é uma promise. o useEffect não permite usar async.
            setItems(response.data);
        });
    }, []) /*QUAL função eu quero executar e QUANDO eu quero. Este quando é baseado 
    em "Quando tal informação mudar"!! Executa a função sempre que variavel muda, 
    em vazio, executa apenas uma vez, quando o componente aparecer em tela. */

    //Unidades Federativas - API IBGE
    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response =>{
            const ufInitials = response.data.map(uf => uf.sigla);
            
            setUfs(ufInitials);
        });
    }, []);

    //Cidades - API IBGE
    useEffect(() => {
        if(selectedUF === '0'){
            return;
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
        .then(response =>{
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        });
    }, [selectedUF]); //Carregar as cidades sempre que a UF mudar.


    //Funções
    function handleselectedUF(event: ChangeEvent<HTMLSelectElement>){
        const uf = event.target.value;

        setselectedUF(uf);
    };

    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>){
        const city = event.target.value;

        setSelectedCity(city);
    }; 

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target;
        setFormData({...formData, [name]: value}); 
        //[name] corresponde a qualquer propriedade (nome, email, whatsapp) que estiver com seu value sendo passado.
    };
	
	function handleSelectedPosition(event: LeafletMouseEvent){
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
    }

    function handleSelectedItem(id: number){
        const alreadySelected = selectedItems.findIndex(item => item === id);
        /* Verificar s o usuario clicou em um item que ele ja clicou antes.
        O findIndex retorna um numero >= 0  se o item selecionado ja tiver dentro do array.
        Caso contrário, retorna -1.*/
        if(alreadySelected >= 0){
            //Remove o item
            const filteredItems = selectedItems.filter(item => item !== id);
            //filteredItems vai conter todos os items, menos o que precisa remover.
            setSelectedItems(filteredItems);
        } else {
            //Adiciona item
            setSelectedItems([...selectedItems, id]);
        }
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const { name, email, whatsapp } = formData;
        const [latitude, longitude] = selectedPosition;
        const uf = selectedUF;
        const city = selectedCity;
        const items = selectedItems;

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
            latitude,
            longitude,
            items
        }

        await api.post('points', data);

        alert('Ponto cadastrado');

        history.push('/');
    }

    //Página criada
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to="/">
                    <FiArrowLeft/>
                    Voltar para Home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br/> ponto de coleta</h1>
                
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field"> 
                        <label htmlFor="name">Nome da entidade</label> 
                        <input type="text" name="name" id="name" onChange={handleInputChange}/>
                    </div>

                    <div className="field-group">
                        <div className="field"> 
                            <label htmlFor="email">E-mail</label> 
                            <input type="email" name="email" id="email" onChange={handleInputChange}/>
                        </div>
                        <div className="field"> 
                            <label htmlFor="whatsapp">Whatsapp</label> 
                            <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange}/>
                        </div>
                    </div>
                </fieldset>
        
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onclick={handleSelectedPosition}>
                        <TileLayer //Copiado e colado do site do Leaftlet
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition}/>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedUF} onChange={handleselectedUF}>
                                <option value="0" >Selecione uma UF</option>
                                {ufs.map(uf =>(
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={selectedCity} onChange={handleSelectedCity}>
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city =>(
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>                       
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => ( /* Sempre que percorremos um array pra retornar alguma coisa, 
                        o primeiro elemento dentro deste retorno precisa ter uma propriedade obrigatória 
                        chamada "key". Isto serve para o React conseguir encontrar  este elemento de uma 
                        forma mais rápida na hora de atualzia-lo.*/
                            <li key={item.id} 
                                onClick={() => handleSelectedItem(item.id)} 
                                className={selectedItems.includes(item.id) ? 'selected' : ''}
                            >
                                <img src={item.image_url} alt={item.title}/>
                                <span>{item.title}</span>
                            </li>
                        ))}                                                
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    );
};

export default CreatePoint;