import { useEffect, useState } from "react"
import client from "../../api/api";
import type { PlayerCard } from "../../types/types";
import Loading from "../Loading/Loading";
import styled from "styled-components";
import SearchBar from "../SearchBar/SearchBar";

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

const SearchBarDiv = styled.div`
    display:flex;
    justify-content: center;
    margin-bottom: 2.5rem;
`

interface PlayerCardResponse {
    status: number;
    data: PlayerCard[]
}

const PlayerCards = () => {
    const [playerCards, setPlayerCards] = useState<PlayerCard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [cardSearch, setCardSearch] = useState<string>("");

    const filteredCards = playerCards.filter(card => {
        const name = card.displayName.trim().toLowerCase();

        const matchesSearch = name.includes(cardSearch.trim().toLowerCase());

        return matchesSearch;
    });

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
    <SearchBarDiv>
        <SearchBar type="text" onChange={(e) => setCardSearch(e.target.value)} placeholder="Search Player Card by name..."/>
    </SearchBarDiv>
    <DivPlayerCards>
        {filteredCards.map(playerCard => (
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