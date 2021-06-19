export enum AnalizeTypeEnum {
    BASE = 'BASE',
    DRUGS = 'DRUGS',
    EXAMS = 'EXAMS',
    STANDARD = 'STANDARD',
}

export interface AnalizeItem {
    text: string;
    checked: boolean;
}

export interface AnalizeData {
    type: AnalizeTypeEnum,
    title: string;
    text: string;
    items: AnalizeItem[];
}

export interface AnalizeResponse {
    status: 'ok' | 'error';
    data: AnalizeData[] | string;
}
