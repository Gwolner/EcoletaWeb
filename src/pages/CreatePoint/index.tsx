import React, {useEffect, useState } from 'react';
import { Map, TileLayer, Marker} from 'react-leaflet';

import './styles.css';
import logo from '../../assets/logo.svg';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';




 //Tipo da variável: Para informar o tipo retornado do useState quando este retorna um objeto ou array!!
 interface Item {
    id: number,
    title: string,
    image_url: string
 }


const CreatePoint = () =>{

    //Estados
    const [items, setItems] = useState<Item[]>([]); 

    useEffect(()=> {
        api.get('items').then(response =>{ //Usa .then() por que é uma promise. o useEffect não permite usar async.
            setItems(response.data);
        });
    }, []) /*QUAL função eu quero executar e QUANDO eu quero. Este quando é baseado 
    em "Quando tal informação mudar"!! Executa a função sempre que variavel muda, 
    em vazio, executa apenas uma vez, quando o componente aparecer em tela. */


    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to="/">
                    <FiArrowLeft/>
                    Voltar para Home
                </Link>
            </header>

            <form>
                <h1>Cadastro do <br/> ponto de coleta</h1>
                
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field"> 
                        <label htmlFor="name">Nome da entidade</label> 
                        <input type="text" name="name" id="name"/>
                    </div>

                    <div className="field-group">
                        <div className="field"> 
                            <label htmlFor="email">E-mail</label> 
                            <input type="email" name="email" id="email"/>
                        </div>
                        <div className="field"> 
                            <label htmlFor="whatsapp">Whatsapp</label> 
                            <input type="text" name="whatsapp" id="whatsapp"/>
                        </div>
                    </div>
                </fieldset>
        
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={[-8.0555717, -34.8787303]} zoom={15}>
                        <TileLayer //Copiado e colado do site do Leaftlet
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-8.0555717, -34.8787303]}/>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select name="uf" id="uf">
                                <option value="0">Selecione uma UF</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma cidade</option>
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
                        {items.map(item => (
                            <li>
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