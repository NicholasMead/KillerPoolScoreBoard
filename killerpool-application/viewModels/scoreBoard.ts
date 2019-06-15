export type ScoreBoard = ScoreBoardItem[];

export type ScoreBoardItem = {
    player: string,
    lives: number,
    nextToPlay: boolean,
}