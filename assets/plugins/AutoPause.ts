import MediaPlayer from '../MediaPlayer'

class AutoPause {
    private threshold: number
    player: MediaPlayer

    constructor() {
        this.threshold = 0.5

        this.handleIntersection = this.handleIntersection.bind(this)
        this.visibilityChange = this.visibilityChange.bind(this)
    }

    run(player) {
        this.player = player

        const observer = new IntersectionObserver(this.handleIntersection, {
            threshold: this.threshold,
        })

        observer.observe(this.player.media)

        document.addEventListener('visibilitychange', this.visibilityChange)
    }

    private handleIntersection(entries: Array<IntersectionObserverEntry>) {
        const entry = entries[0]

        if (entry.isIntersecting) {
            this.player.play()
        } else {
            this.player.pause()
        }
    }

    private visibilityChange() {
        const isVisibible = document.visibilityState === 'visible'

        isVisibible ? this.player.play() : this.player.pause()
    }
}

export default AutoPause
