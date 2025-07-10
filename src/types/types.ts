
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
    streamedVideo?: string;
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

type PlayerTitle = {
    uuid: string;
    titleText: string;
}

type Spray = {
    uuid: string;
    displayName: string;
    displayIcon: string;
    fullIcon: string;
    fullTransparentIcon: string;
}

export type {Skin, Bundle, Buddy, PlayerCard, PlayerTitle, Spray}