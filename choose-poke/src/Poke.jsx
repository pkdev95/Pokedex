import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faSquareCaretLeft } from '@fortawesome/free-solid-svg-icons';
import CardBS from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import "./assets/Poke.css";


export const Poke = () => {

   document.body.style.backgroundImage = "url('https://gizmodo.uol.com.br/wp-content/blogs.dir/8/files/2022/12/pokemon-encerra-a-historia-de-ash-e-pikachu-apos-25-anos-e-introduz-novos-protagonistas.jpg')"

    const [poke, setPoke] = useState(null);
    const [cont, setCont] = useState(1);
    const [isLoading, setIsLoading] = useState(false);



    const getApiData = async () => {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${cont}/`)
            .then((res) => setPoke(res.data))
            .catch((err) => console.log(err));

    }


    useEffect(() => {

        getApiData();



    }, [cont])


    const sleep = async (time) => (

        new Promise(resolve => {
            setTimeout(resolve, time);
        })
    );





    const handleClickNext = async () => {
        setCont(cont + 1);
        setIsLoading(true);
        await sleep(1000);
        setIsLoading(false);
    }

    const handleClickPrev = async () => {
        if (cont <= 1) {
            setCont(1);
        } else {
            setCont(cont - 1);
            setIsLoading(true);
            await sleep(1000);
            setIsLoading(false);
        }

    }

    return (
        <div>
            {isLoading ? <div className="pokeOut">
                {poke && (
                    <div className="princ">
                        <CardBS >
                            <CardBS.Img width={300} height={300} className="cj" src="https://img.quizur.com/f/img5ecdad76f16749.58160519.png?lastEdited=1590537594" alt="CardBS image" />
                            <CardBS.Body className='cb'>
                                <CardBS.Title><h4 className="rj">Loading...</h4><>
                                </></CardBS.Title>
                                <CardBS.Subtitle className="sbt" >tipo: ...</CardBS.Subtitle>
                                <Spinner className="spin" animation="border" role="status">
                                </Spinner>
                            </CardBS.Body>
                        </CardBS>
                    </div>
                )}
            </div> : <div className="pokeOut">
                {poke && (
                    <div className="princ">
                        <CardBS >
                            <CardBS.Img width={300} height={300} className="ci" src={poke.sprites?.front_default} alt="CardBS image" />
                            <CardBS.Body className='cb'>
                                <CardBS.Title><h4 className="rj">{poke.name}</h4><>
                                </></CardBS.Title>
                                <CardBS.Subtitle className="sbt">tipo: {poke.types[0]?.type?.name}</CardBS.Subtitle>
                                <FontAwesomeIcon onClick={handleClickPrev} className="lb" icon={faSquareCaretLeft} size="2x" />
                                <FontAwesomeIcon onClick={handleClickNext} className="lb" icon={faSquareCaretRight} size="2x" />
                            </CardBS.Body>
                        </CardBS>
                    </div>
                )}
            </div>}
        </div>
    )
}