import {MusicClient} from '../client'

declare module '../client' {
    interface MusicClient {
        musicUrl(id: number | string[] | string, br?: number): Promise<any>,
    }
}

MusicClient.prototype.musicUrl = async function(id: number | string[] | string, br: number = 999000) {
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
