// FILE: /lib/sounds.ts

class SoundManager {
  private enabled: boolean = true;
  private audioContext: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  private playTone(
    frequency: number,
    duration: number,
    type: OscillatorType = "sine",
    gain: number = 0.3
  ) {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        frequency * 0.8,
        ctx.currentTime + duration
      );

      gainNode.gain.setValueAtTime(gain, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch {
      // Silently fail if audio not available
    }
  }

  playPeel() {
    // Sticky peel sound: quick rising tone
    this.playTone(600, 0.08, "sine", 0.2);
    setTimeout(() => this.playTone(800, 0.06, "sine", 0.15), 60);
  }

  playDrop() {
    // Satisfying drop/place sound
    this.playTone(400, 0.15, "sine", 0.25);
    setTimeout(() => this.playTone(300, 0.1, "sine", 0.15), 80);
  }

  playSelect() {
    this.playTone(700, 0.06, "sine", 0.15);
  }

  playDelete() {
    this.playTone(200, 0.2, "sawtooth", 0.15);
  }

  playSave() {
    this.playTone(523, 0.1, "sine", 0.2);
    setTimeout(() => this.playTone(659, 0.1, "sine", 0.2), 100);
    setTimeout(() => this.playTone(784, 0.15, "sine", 0.2), 200);
  }

  playUndo() {
    this.playTone(500, 0.08, "sine", 0.15);
    setTimeout(() => this.playTone(400, 0.08, "sine", 0.15), 80);
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

export const soundManager = new SoundManager();
