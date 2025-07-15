import { useEffect, useState } from "react"
import client from "../../api/api";
import type { PlayerCard } from "../../types/types";
import Loading from "../Loading/Loading";
import styled from "styled-components";

const TitlePlayerCards = styled.h2`
    font-size: 48px;
    margin: 3rem 0;
    text-align: center;
`

const DivPlayerCards = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
`

const PlayerCardCard = styled.div`
    width: 20%;
    display:flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    gap: 1rem;
    img {
        width: 75%;
        height: 100%;
    }
    
    @media only screen and (max-width: 480px) {
        width: 90%;
    }

    @media (min-width: 481px) and (max-width: 768px) {
        width: 45%;
    }
`

interface PlayerCardResponse {
    status: number;
    data: PlayerCard[]
}

const PlayerCards = () => {
    const [playerCards, setPlayerCards] = useState<PlayerCard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPlayerCards = async () => {
        try {
            const { data } = await client.get<PlayerCardResponse>("/playercards")
            setPlayerCards(data.data);
            console.log(data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPlayerCards();
    }, [])

    if (loading) return <Loading />

  return (
    <>
    <TitlePlayerCards>Player Cards</TitlePlayerCards>
    <DivPlayerCards>
        {playerCards.map(playerCard => (
            <PlayerCardCard key={playerCard.uuid}>
            <h3>{playerCard.displayName}</h3>
            <img src={playerCard.largeArt} alt={playerCard.displayName}/>
            </PlayerCardCard>
        ))}
    </DivPlayerCards>
    </>
  )
}

export default PlayerCards