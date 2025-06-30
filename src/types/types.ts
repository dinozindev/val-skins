
type Skin = {
    uuid: string;
    displayName: string;
    contentTierUuid: string;
    chromas: Chroma[];
    displayIcon: string;
}

type Chroma = {
    uuid: string;
    displayName: string;
    fullRender: string;
}

type Bundle = {
    uuid: string;
    displayName: string;
    displayIcon: string;
    verticalPromoImage: string;
}

type Buddy = {
    uuid: string;
    displayName: string;
    displayIcon: string;
}

type PlayerCard = {
    uuid: string;
    displayName: string;
    largeArt: string;
    smallArt: string;
    wideArt: string;
}

export type {Skin, Bundle, Buddy, PlayerCard}