export interface BasePageConfig {
    type: 'about' | 'card' | 'text';
    title: string;
    description?: string;
}

export interface TextPageConfig extends BasePageConfig {
    type: 'text';
    source: string;
}

export interface CardItem {
    title: string;
    subtitle?: string;
    date?: string;
    content?: string;
    tags?: string[];
    link?: string;
    image?: string;
    /** 视频地址,设置后按 <video> 播放器渲染(优先于 image) */
    video?: string;
}

export interface CardPageConfig extends BasePageConfig {
    type: 'card';
    items: CardItem[];
}
