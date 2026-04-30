#!/usr/bin/env bash
# Fetch reference images for each UI theme via Bing Images.
# Outputs into refs/themes/<theme>/<NN>.<ext> + sources.txt
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/refs/themes"
mkdir -p "$DEST"

UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Firefox/120.0'
N_PER_THEME=6

fetch_theme() {
  local slug="$1"; shift
  local query="$1"; shift
  local out="$DEST/$slug"
  mkdir -p "$out"
  : > "$out/sources.txt"

  local q_enc
  q_enc=$(printf '%s' "$query" | sed 's/ /+/g')
  local html
  html=$(curl -sL -A "$UA" "https://www.bing.com/images/search?q=${q_enc}&form=HDRSC2")

  mapfile -t urls < <(printf '%s' "$html" \
    | grep -oE 'murl&quot;:&quot;[^&]+' \
    | sed 's/murl&quot;:&quot;//' \
    | grep -E '\.(jpe?g|png|webp)([?#]|$)' \
    | head -n $((N_PER_THEME * 3)))

  local i=0
  for url in "${urls[@]}"; do
    [[ $i -ge $N_PER_THEME ]] && break
    local ext
    ext=$(printf '%s' "$url" | grep -oE '\.(jpe?g|png|webp)' | head -1 | tr -d '.')
    [[ -z $ext ]] && ext=jpg
    local idx
    idx=$(printf '%02d' $((i + 1)))
    local target="$out/${idx}.${ext}"
    if curl -sL --max-time 25 -A "$UA" -o "$target" "$url" 2>/dev/null; then
      if [[ -s "$target" ]] && file "$target" | grep -qE 'image|JPEG|PNG|Web'; then
        printf '%s\t%s\n' "$idx.$ext" "$url" >> "$out/sources.txt"
        i=$((i + 1))
      else
        rm -f "$target"
      fi
    fi
  done
  printf '[%-14s] %2d images  query=%s\n' "$slug" "$i" "$query"
}

# slug | bing query
THEMES=(
  "terminal|terminal tui dashboard ascii"
  "terminal2|linux terminal hacker ui"
  "glass|glassmorphism ui design"
  "neobrutalism|neobrutalism web design"
  "cyberpunk|cyberpunk neon ui interface"
  "pastel|pastel soft ui design"
  "y2k|y2k web design aesthetic"
  "swiss|swiss international typography poster"
  "catppuccin|catppuccin desktop rice"
  "retroos|windows 95 desktop ui"
  "neobrutalism2|brutalist editorial magazine layout"
  "productivity|linear notion productivity dashboard"
  "ios|ios app design"
  "musicplayer|music player app ui"
  "claymorphism|claymorphism 3d ui"
  "vaporwave|vaporwave aesthetic"
  "neumorphism|neumorphism soft ui"
  "shadcndark|shadcn dark dashboard"
  "modernretro|windows xp retro ui"
  "hermes|teal cream agent landing page"
  "engpro|vs code engineering metrics dashboard"
  "dockpack|ide pdf preview claude code editor"
)

for entry in "${THEMES[@]}"; do
  slug="${entry%%|*}"
  query="${entry#*|}"
  fetch_theme "$slug" "$query"
done

echo
echo "Done. Output: $DEST"
