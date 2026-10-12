"""Originele muziek voor de schildpadden-video (zelf gecomponeerd en gesynthetiseerd → geen copyright).

Gebruik:  python muziek.py <uit.wav> [duur_seconden]
Vereist:  numpy  (pip install numpy)

Opbouw, gesynchroniseerd op de cuts van de video:
  0,00 – 1,45  intro: onderwater-swell + bubbels (snorkelaars springen erin)
  1,45         drop: groove start precies op de eerste schildpad
  6,07         twee schildpadden: extra melodielaag
  7,35         close-up: glockenspiel-sparkle, laatste akkoord klinkt uit tot het einde
Tempo 101,7 BPM: een tel = 0,59 s, zodat 1,45 s en 7,35 s allebei op een tel vallen.
"""
import sys
import numpy as np

SR = 48000
UIT = sys.argv[1] if len(sys.argv) > 1 else "muziek.wav"
DUUR = float(sys.argv[2]) if len(sys.argv) > 2 else 10.333
BEAT = 0.59
START = 1.45                       # drop = eerste schildpad
N = int(DUUR * SR) + SR            # +1s staart, wordt aan het eind afgeknipt
rng = np.random.default_rng(7)

BUSSEN = ["pad", "bas", "drums", "marimba", "kalimba", "glock", "intro"]
# mixniveau per bus (dB). Na meten: laag zachter, melodie naar voren.
MIX_DB = {"pad": -9, "bas": -6, "drums": -4, "marimba": 0, "kalimba": 1, "glock": -1, "intro": -2}
BUS = {b: np.zeros((2, N)) for b in BUSSEN}

def midi(m): return 440.0 * 2 ** ((m - 69) / 12)

def add(sig, t, pan=0.0, gain=1.0, bus="pad"):
    i = int(t * SR)
    if i >= N: return
    sig = sig[: N - i] * gain
    BUS[bus][0, i:i + len(sig)] += sig * np.sqrt(0.5 * (1 - pan))
    BUS[bus][1, i:i + len(sig)] += sig * np.sqrt(0.5 * (1 + pan))

def env(n, a=0.005, d=0.3, curve=1.0):
    t = np.arange(n) / SR
    e = np.minimum(t / a, 1.0) * np.exp(-t / d * curve)
    return e

def lowpass_fast(x, fc):
    # frequentiedomein-lowpass (zacht), voor lange signalen
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / np.sqrt(1 + (f / fc) ** 4)
    return np.fft.irfft(X, len(x))

# ---------- instrumenten ----------
def marimba(m, dur=0.9):
    n = int(dur * SR); t = np.arange(n) / SR; f = midi(m)
    s = (np.sin(2*np.pi*f*t) * env(n, 0.002, 0.35)
         + 0.35*np.sin(2*np.pi*f*3.99*t) * env(n, 0.001, 0.06)
         + 0.15*np.sin(2*np.pi*f*9.8*t) * env(n, 0.001, 0.02))
    return s * 0.5

def kalimba(m, dur=1.4):
    n = int(dur * SR); t = np.arange(n) / SR; f = midi(m)
    s = (np.sin(2*np.pi*f*t + 0.6*np.sin(2*np.pi*f*2*t)*env(n,0.001,0.08)) * env(n, 0.002, 0.6)
         + 0.2*np.sin(2*np.pi*f*5.4*t) * env(n, 0.001, 0.05))
    return s * 0.35

def glock(m, dur=1.8):
    n = int(dur * SR); t = np.arange(n) / SR; f = midi(m)
    s = (np.sin(2*np.pi*f*t)*env(n,0.001,0.9) + 0.4*np.sin(2*np.pi*f*2.76*t)*env(n,0.001,0.3)
         + 0.2*np.sin(2*np.pi*f*5.4*t)*env(n,0.001,0.12))
    return s * 0.22

def bass(m, dur):
    n = int(dur * SR); t = np.arange(n) / SR; f = midi(m)
    e = np.minimum(t / 0.01, 1) * np.minimum(1, (dur - t) / 0.08).clip(0) * (0.75 + 0.25*np.exp(-t/0.25))
    return (np.sin(2*np.pi*f*t) + 0.25*np.sin(2*np.pi*2*f*t)) * e * 0.55

def pad(ms, dur, att=0.6, rel=0.9):
    n = int((dur + rel) * SR); t = np.arange(n) / SR
    s = np.zeros(n)
    for m in ms:
        for det in (-0.08, 0.0, 0.08):
            f = midi(m + det)
            ph = rng.uniform(0, 2*np.pi)
            # zachte "saw": eerste 6 harmonischen
            for h in range(1, 7):
                s += np.sin(2*np.pi*f*h*t + ph*h) / h
    e = np.minimum(t / att, 1) * np.where(t < dur, 1, np.exp(-(t - dur) / (rel / 3)))
    s = lowpass_fast(s * e, 1400)
    return s / (len(ms) * 3 * 2.2) * 0.5

def kick(dur=0.35):
    n = int(dur * SR); t = np.arange(n) / SR
    f = 48 + 90*np.exp(-t/0.035)
    return np.sin(2*np.pi*np.cumsum(f)/SR) * env(n, 0.001, 0.12) * 0.7

def shaker(dur=0.09):
    n = int(dur * SR)
    x = rng.standard_normal(n)
    x = x - lowpass_fast(x, 5000)        # highpass
    return x * env(n, 0.006, 0.025) * 0.10

def rim(dur=0.12):
    n = int(dur * SR); t = np.arange(n) / SR
    x = np.sin(2*np.pi*1700*t) * env(n, 0.0005, 0.012) + 0.4*rng.standard_normal(n)*env(n,0.0005,0.006)
    return x * 0.18

def bubble(t0, f0, dur):
    n = int(dur * SR); t = np.arange(n) / SR
    f = f0 * (1 + 2.2 * t / dur)                 # opwaartse "bloop"
    s = np.sin(2*np.pi*np.cumsum(f)/SR) * np.sin(np.pi * t / dur) ** 2
    add(s * 0.10, t0, pan=rng.uniform(-0.8, 0.8), bus="intro")

# ---------- intro 0 → 1,45: onderwater-swell + bubbels ----------
n = int(START * SR) + int(0.4 * SR); t = np.arange(n) / SR
noise = lowpass_fast(rng.standard_normal(n), 500)
swell = noise * (t / START).clip(0, 1) ** 2 * np.where(t < START, 1, np.exp(-(t - START) / 0.12))
add(swell / np.abs(swell).max() * 0.22, 0.0, bus="intro")
add(pad([53, 60, 64, 69], START - 0.1, att=1.2, rel=0.4), 0.05, gain=0.7)    # F-akkoord zwelt aan
for _ in range(26):
    bubble(rng.uniform(0.0, 1.35), rng.uniform(300, 900), rng.uniform(0.04, 0.11))

# ---------- groove vanaf 1,45 ----------
# Fmaj7 | Dm7 | Bbmaj7 → C | Fmaj9 (uitklinken)
akkoorden = [([53, 57, 60, 64], 41), ([50, 57, 60, 65], 38), ([46, 57, 62, 65], 34), ([53, 57, 64, 67], 41)]
bar = 4 * BEAT
for i, (ak, wortel) in enumerate(akkoorden):
    t0 = START + i * bar
    if t0 > DUUR: break
    laatste = i == 3
    add(pad(ak, bar if not laatste else (DUUR - t0), att=0.15, rel=1.0 if not laatste else 0.6), t0, gain=0.9)
    if i == 2:   # halverwege bar 3: C-akkoord
        add(pad([48, 55, 60, 64], bar / 2, att=0.1, rel=0.6), t0 + bar / 2, gain=0.5)
    # bas: grondtoon op 1, kwint op de "en" van 3
    add(bass(wortel, BEAT * 1.8), t0, bus="bas")
    add(bass(wortel + 7 if wortel < 40 else wortel - 5, BEAT * 0.9), t0 + 2.5 * BEAT, gain=0.8, bus="bas")
    if laatste:
        add(bass(29, DUUR - t0 + 0.3), t0, gain=0.9, bus="bas")

# drums (licht): kick op 1 en 3, rim op 2 en 4, shaker in achtsten met accent
eind_drums = START + 3 * bar            # laatste maat: alleen uitklinken
k = 0; t0 = START
while t0 < eind_drums - 1e-6:
    tel = k % 4
    if tel in (0, 2): add(kick(), t0, bus="drums")
    if tel in (1, 3): add(rim(), t0, pan=0.2, bus="drums")
    for h in (0, 0.5):
        add(shaker(), t0 + h * BEAT + rng.normal(0, 0.004), pan=-0.3, gain=1.0 if h else 0.6, bus="drums")
    k += 1; t0 += BEAT
add(kick(), eind_drums, gain=0.8, bus="drums")     # laatste "landing" op het slotakkoord

# marimba-patroon (F-pentatonisch), achtsten
penta = [65, 67, 69, 72, 74, 77, 79, 81]
patroon = [0, 2, 4, 2, 3, 5, 4, 2,   1, 3, 5, 3, 4, 6, 5, 3,   0, 2, 3, 5, 4, 2, 3, 1,   2, 4, 3, 6, 5, 4, 2, 0]
for j, p in enumerate(patroon[:24]):
    tt = START + j * BEAT / 2
    if tt >= eind_drums: break
    add(marimba(penta[p] - 12 if j % 8 in (0,) else penta[p]), tt + rng.normal(0, 0.003),
        pan=0.35 * np.sin(j), gain=0.9 if j % 2 == 0 else 0.6, bus="marimba")

# 6,07: twee schildpadden → kalimba-melodie (twee stemmen die elkaar antwoorden)
for tt, m, pan in [(6.07, 81, -0.5), (6.07 + BEAT*0.5, 84, 0.5), (6.07 + BEAT, 81, -0.5), (6.07 + BEAT*1.5, 79, 0.5)]:
    add(kalimba(m), tt, pan=pan, bus="kalimba")

# 7,35: close-up → glockenspiel-sparkle op het slotakkoord
for j, m in enumerate([77, 81, 84, 89, 88, 84]):
    add(glock(m), 7.35 + j * BEAT / 2, pan=(-1) ** j * 0.4, bus="glock")
add(glock(89, 2.5), START + 3 * bar, gain=1.1, bus="glock")

# ---------- mix: eenvoudige galm, limiter, fade ----------
ir_n = int(1.6 * SR); it = np.arange(ir_n) / SR
ir = rng.standard_normal(ir_n) * np.exp(-it / 0.45); ir[0] = 0
ir = lowpass_fast(ir, 4000); ir /= np.sqrt((ir ** 2).sum())
def galm(x): return np.fft.irfft(np.fft.rfft(x, 2*N) * np.fft.rfft(ir, 2*N), 2*N)[:N]
def highpass(x, fc):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= (f / fc) ** 2 / np.sqrt(1 + (f / fc) ** 4)
    return np.fft.irfft(X, len(x))

rms = lambda x: 20 * np.log10(np.sqrt((x ** 2).mean()) + 1e-12)
mix = np.zeros((2, N))
for b in BUSSEN:
    x = BUS[b]
    if b in ("pad", "marimba", "kalimba", "glock", "intro"):   # laag eruit, ruimte voor de bas
        x = np.stack([highpass(c, 160 if b == "pad" else 120) for c in x])
    actief = np.abs(x).max(0) > 1e-3 * np.abs(x).max()          # alleen waar de bus echt klinkt
    if actief.any():
        i0, i1 = np.argmax(actief), len(actief) - np.argmax(actief[::-1])
        x = x / np.sqrt((x[:, i0:i1] ** 2).mean()) * 10 ** (-20 / 20)   # elke bus op -20 dB RMS (tijdens spelen) ...
    x *= 10 ** (MIX_DB[b] / 20)                                 # ... dan het mixniveau
    print(f"   {b:8s} {rms(x[:, i0:i1]):6.1f} dB RMS tijdens spelen ({i0/SR:.2f}–{i1/SR:.2f}s)")
    mix += x
L, R = mix
L2 = L + 0.28 * galm(L); R2 = R + 0.28 * galm(R)

n_uit = int(DUUR * SR)
stereo = np.stack([L2, R2], 1)[:n_uit]
fade = np.ones(n_uit); f_n = int(0.6 * SR); fade[-f_n:] = np.linspace(1, 0, f_n) ** 2
fade_in = np.minimum(np.arange(n_uit) / (0.02 * SR), 1)
stereo *= (fade * fade_in)[:, None]
stereo *= 0.89 / np.abs(stereo).max()                        # piek ≈ -1 dBFS (geen limiter: dynamiek blijft)

pcm = (stereo * 32767).astype("<i2")
import wave
with wave.open(UIT, "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print(f"✔ {UIT}  ({DUUR:.2f}s, {SR} Hz stereo)")
