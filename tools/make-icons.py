#!/usr/bin/env python3
"""生成 PWA 图标：深色底 + 金色王冠（呼应「深渊王座」）
无第三方依赖，直接运行即可。
"""
import math
import os
import struct
import zlib

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets', 'icons')
BG = (20, 20, 20)
GOLD = (217, 164, 65)
GOLD_LIGHT = (240, 201, 125)

CROWN = [
    (96, 384), (96, 196), (176, 276), (256, 152),
    (336, 276), (416, 196), (416, 384)
]


def blank(w, h):
    return [[(0, 0, 0, 0) for _ in range(w)] for _ in range(h)]


def fill_poly(px, poly, color, w, h):
    ys = [p[1] for p in poly]
    y0 = max(0, int(min(ys)))
    y1 = min(h, int(math.ceil(max(ys))))
    n = len(poly)
    for y in range(y0, y1):
        yc = y + 0.5
        xs = []
        for i in range(n):
            x1, yy1 = poly[i]
            x2, yy2 = poly[(i + 1) % n]
            if (yy1 <= yc < yy2) or (yy2 <= yc < yy1):
                t = (yc - yy1) / (yy2 - yy1)
                xs.append(x1 + t * (x2 - x1))
        xs.sort()
        for i in range(0, len(xs) - 1, 2):
            for x in range(int(math.ceil(xs[i])), int(xs[i + 1]) + 1):
                if 0 <= x < w:
                    px[y][x] = color


def fill_round(px, color, w, h, r):
    for y in range(h):
        for x in range(w):
            cx = min(max(x + 0.5, r), w - r)
            cy = min(max(y + 0.5, r), h - r)
            if (x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2 <= r * r:
                px[y][x] = color


def fill_rect(px, x0, y0, x1, y1, color, w, h):
    for y in range(max(0, int(y0)), min(h, int(y1))):
        for x in range(max(0, int(x0)), min(w, int(x1))):
            px[y][x] = color


def scale(poly, k, ox, oy):
    return [(ox + p[0] * k, oy + p[1] * k) for p in poly]


def make(size, maskable=False):
    px = blank(size, size)
    if maskable:
        fill_rect(px, 0, 0, size, size, BG + (255,), size, size)
        k = size / 512 * 0.62
        ox = (size - 512 * k) / 2
        oy = (size - 512 * k) / 2
    else:
        r = size * 0.22
        fill_round(px, BG + (255,), size, size, r)
        k = size / 512 * 0.82
        ox = (size - 512 * k) / 2
        oy = (size - 512 * k) / 2
    fill_poly(px, scale(CROWN, k, ox, oy), GOLD + (255,), size, size)
    return px


def write_png(path, w, h, px):
    raw = bytearray()
    for y in range(h):
        raw.append(0)
        for x in range(w):
            raw.extend(px[y][x])
    def chunk(tag, data):
        return (struct.pack('>I', len(data)) + tag + data +
                struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff))
    ihdr = struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0)
    blob = (b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr) +
            chunk(b'IDAT', zlib.compress(bytes(raw), 9)) + chunk(b'IEND', b''))
    with open(path, 'wb') as f:
        f.write(blob)


def main():
    os.makedirs(OUT, exist_ok=True)
    for size in (512, 192, 180, 32):
        write_png(os.path.join(OUT, 'icon-%d.png' % size), size, size, make(size))
        write_png(os.path.join(OUT, 'maskable-%d.png' % size), size, size,
                  make(size, maskable=True))
    print('图标已生成到:', os.path.abspath(OUT))
    for f in sorted(os.listdir(OUT)):
        print('  ', f, os.path.getsize(os.path.join(OUT, f)), 'B')


if __name__ == '__main__':
    main()
