import { useEffect, useState } from "react";
import client from "../../api/api"
import type { Bundle } from "../../types/types";
import Loading from "../Loading/Loading";
import styled from "styled-components";
import SearchBar from "../SearchBar/SearchBar";

const TitleBundle = styled.h2`
    text-align: center;
    font-size: 48px;
    margin: 3rem 0;
`

const DivBundles = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    h3 {
        font-size: 24px;
    }
`

const BundleCard = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #682A36;
    padding: 1.25rem 0;
    gap: 1rem;
    img {
        width: 90%;
        height: 90%;
    }

    @media only screen and (max-width: 768px) {
        width: 90%;  
    }
`

const SearchBarDiv = styled.div`
    display:flex;
    justify-content: center;
    margin-bottom: 2.5rem;
`

interface BundleResponse {
    status: number;
    data: Bundle[];
}

const Bundles = () => {
    const [bundles, setBundles] = useState<Bundle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [bundleSearch, setBundleSearch] = useState<string>("");

    const filterBundles = bundles.filter(bundle => {
        const name = bundle.displayName.trim().toLowerCase();

        const matchesSearch = name.includes(bundleSearch.trim().toLowerCase());

        return matchesSearch;
    })

    const fetchBundles = async () => {
        try {
            const { data } = await client.get<BundleResponse>("/bundles");
            setBundles(data.data)
            console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBundles();
    }, [])

    if (loading) return <Loading />;

    return (
        <>
            <TitleBundle>Bundles</TitleBundle>
            <SearchBarDiv>
                <SearchBar type="text" onChange={(e) => setBundleSearch(e.target.value)} placeholder="Search a bundle by name..." />
            </SearchBarDiv>
            <DivBundles>
                {filterBundles.map(bundle => (
                    <BundleCard key={bundle.uuid}>
                        <h3>{bundle.displayName}</h3>
                        <img src={bundle.displayIcon} alt={bundle.displayName} loading="lazy" />
                    </BundleCard>
                ))}
            </DivBundles>
        </>
    )
}

export default Bundles