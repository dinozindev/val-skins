import { useEffect, useState } from "react";
import client from "../../api/api";
import Loading from "../Loading/Loading";
import type { PlayerTitle } from "../../types/types";
import styled from "styled-components";

const PlayerTitlesTitle = styled.h2`
    margin: 3rem 0;
    font-size: 48px;
    text-align: center;
`

const DivPlayerTitles = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    h3 {
        width: 30%;
        background-color: #682A36;
        padding: 0.5rem 0;
        text-align: center;
    }

    @media only screen and (max-width: 768px) {
        h3 {
            width: 90%;
        }
    }

    @media (min-width: 769px) and (max-width: 1279px) {
        h3 {
            width: 45%;
        }
    }
`

interface PlayerTitlesResponse {
    status: string;
    data: PlayerTitle[];
}

const PlayerTitles = () => {
    const [playerTitles, setPlayerTitles] = useState<PlayerTitle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPlayerTitles = async () => {
        try {
            const { data } = await client.get<PlayerTitlesResponse>("/playertitles");
            setPlayerTitles(data.data);
            console.log(data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPlayerTitles();
    }, [])

    if (loading) return <Loading />

  return (
    <>
    <PlayerTitlesTitle>Player Titles</PlayerTitlesTitle>
    <DivPlayerTitles>
        {playerTitles.map(playerTitle => (
            <h3>{playerTitle.titleText}</h3>
        ))}
    </DivPlayerTitles>
    </>
  )
}

export default PlayerTitles