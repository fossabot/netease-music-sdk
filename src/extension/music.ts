import { MusicClient } from '../client'

declare module '../client' {
    interface MusicClient {
        getMusicUrl(id: number | string[] | string, br?: number): Promise<any>
        doLikeMusic(id: number, like?: boolean): Promise<any>
        getSongInfo(id: number): Promise<any>
    }
}

MusicClient.prototype.getMusicUrl = async function(id: number | string[] | string, br: number = 999000) {
    if (typeof id === 'number') {
        id = id.toString()
    } else if (Array.isArray(id)) {
        id.join(',')
    }

    return await this.request(
        'music.163.com',
        '/weapi/song/enhance/player/url',
        'POST',
        {
            br,
            csrf_token: '',
            ids: [id],
        },
    )
}

MusicClient.prototype.doLikeMusic = async function(id: number, like: boolean = true) {
    await this.checkLogin()
    return await this.request(
        'music.163.com',
        `/weapi/radio/like?alg=${'itembased'}&trackId=${id}&like=${like}&time=${25}`,
        'POST',
        {
            like,
            csrf_token: '',
            trackId: id,
        },
    )
}

MusicClient.prototype.getSongInfo = async function(id: number) {
    return await this.request(
        'music.163.com',
        '/weapi/v3/song/detail',
        'POST',
        {
            c: JSON.stringify([{ id }]),
            csrf_token: '',
            ids: '[' + id + ']',
        },
    )
}
