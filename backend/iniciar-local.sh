#!/usr/bin/env bash
set -eu
cd "$(dirname "$0")"

: "${MYSQL_AURA_PASSWORD:?Define MYSQL_AURA_PASSWORD}"
: "${AURA_JWT_SECRET:?Define AURA_JWT_SECRET}"
: "${AURA_INTERNAL_KEY:?Define AURA_INTERNAL_KEY}"

modulos=(usuarios tratamientos profesionales agenda reservas gateway)
for modulo in "${modulos[@]}"; do
    if [[ ! -f "$modulo/target/$modulo-1.0.0.jar" ]]; then
        echo "Ejecuta mvn package antes de iniciar."
        exit 1
    fi
done

pids=()
detener() {
    for pid in "${pids[@]}"; do kill "$pid" 2>/dev/null || true; done
    wait 2>/dev/null || true
}
trap detener EXIT
trap 'exit 130' INT TERM

for modulo in "${modulos[@]}"; do
    echo "Iniciando $modulo"
    java -jar "$modulo/target/$modulo-1.0.0.jar" &
    pids+=("$!")
done

wait -n
