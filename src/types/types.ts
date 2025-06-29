
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

export type {Skin}